"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var merkleTree_1 = require("./merkleTree");
var web3_utils_1 = require("web3-utils");
var ethers_1 = require("ethers");
var abiCoder = new ethers_1.ethers.utils.AbiCoder();
var Leaf = /** @class */ (function () {
    function Leaf(address, _amount, _index) {
        this.addr = address;
        this.amount = _amount;
        this.index = _index;
        this.buff = Buffer.concat([
            MTree.hex2buf(abiCoder.encode(['uint256'], [_index])),
            MTree.hex2buf(address),
            MTree.hex2buf(abiCoder.encode(['uint256'], [_amount])),
        ]);
    }
    return Leaf;
}());
var MTree = /** @class */ (function () {
    function MTree() {
        this.is_built = false;
        this.leaves = [];
        this.leaves_hex = [];
        this.tree = null;
    }
    MTree.buf2hex = function (b) {
        return '0x' + b.toString('hex');
    };
    MTree.hex2buf = function (h) {
        return Buffer.from(h.replace(/^0x/i, ''), 'hex');
    };
    // return -1 for error
    MTree.prototype.addLeaf = function (addr, amount) {
        if (!this.is_built) {
            var index = this.leaves.length;
            this.leaves.push(new Leaf(addr, amount, index));
            return index;
        }
        else {
            return -1;
        }
    };
    MTree.prototype.leaves_count = function () {
        return this.leaves.length;
    };
    MTree.prototype.build = function () {
        if (!this.is_built) {
            this.leaves_hex = this.leaves.map(function (l) { return MTree.buf2hex(l.buff); });
            this.tree = new merkleTree_1.MerkleTree(this.leaves_hex, web3_utils_1.soliditySha3);
            this.is_built = true;
        }
    };
    MTree.prototype.get_root = function () {
        if (this.is_built) {
            return this.tree.root;
        }
        else {
            return null;
        }
    };
    MTree.prototype.gen_proof = function (index) {
        if (this.is_built) {
            return {
                index: this.leaves[index].index,
                addr: this.leaves[index].addr,
                amount: this.leaves[index].amount,
                buff: this.leaves[index].buff,
                proof: this.tree.generateProof(MTree.buf2hex(this.leaves[index].buff))
            };
        }
        else {
            return null;
        }
    };
    MTree.prototype.get_all_proof = function () {
        var _this = this;
        if (this.is_built) {
            return {
                roothash: this.tree.root,
                proofs: this.leaves.map(function (l) { return _this.gen_proof(l.index); })
            };
        }
        else {
            return null;
        }
    };
    MTree.prototype.verifyProof = function (target, proof) {
        if (this.is_built) {
            return this.tree.verifyProof(proof, target);
        }
        else {
            return false;
        }
    };
    return MTree;
}());
module.exports = { MTree: MTree, Leaf: Leaf };
