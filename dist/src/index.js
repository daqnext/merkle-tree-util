"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const merkleTree_1 = require("./merkleTree");
const web3_utils_1 = require("web3-utils");
const ethers_1 = require("ethers");
const abiCoder = new ethers_1.ethers.utils.AbiCoder();
class Leaf {
    constructor(address, _amount, _index) {
        this.addr = address;
        this.amount = _amount;
        this.index = _index;
        this.buff = Buffer.concat([
            MTree.hex2buf(abiCoder.encode(['uint256'], [_index])),
            MTree.hex2buf(address),
            MTree.hex2buf(abiCoder.encode(['uint256'], [_amount])),
        ]);
    }
}
class MTree {
    constructor() {
        this.is_built = false;
        this.leaves = [];
        this.leaves_hex = [];
        this.tree = null;
    }
    static buf2hex(b) {
        return '0x' + b.toString('hex');
    }
    static hex2buf(h) {
        return Buffer.from(h.replace(/^0x/i, ''), 'hex');
    }
    // return -1 for error
    addLeaf(addr, amount) {
        if (!this.is_built) {
            const index = this.leaves.length;
            this.leaves.push(new Leaf(addr, amount, index));
            return index;
        }
        else {
            return -1;
        }
    }
    leaves_count() {
        return this.leaves.length;
    }
    build() {
        if (!this.is_built) {
            this.leaves_hex = this.leaves.map((l) => MTree.buf2hex(l.buff));
            this.tree = new merkleTree_1.MerkleTree(this.leaves_hex, web3_utils_1.soliditySha3);
            this.is_built = true;
        }
    }
    get_root() {
        if (this.is_built) {
            return this.tree.root;
        }
        else {
            return null;
        }
    }
    gen_proof(index) {
        if (this.is_built) {
            return {
                index: this.leaves[index].index,
                addr: this.leaves[index].addr,
                amount: this.leaves[index].amount,
                proof: this.tree.generateProof(MTree.buf2hex(this.leaves[index].buff))
            };
        }
        else {
            return null;
        }
    }
    get_all_proof() {
        if (this.is_built) {
            return {
                roothash: this.tree.root,
                proof: this.leaves.map((l) => this.gen_proof(l.index))
            };
        }
        else {
            return null;
        }
    }
}
module.exports = { MTree, Leaf };
