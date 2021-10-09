"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MerkleTree = void 0;
var MerkleTree = /** @class */ (function () {
    function MerkleTree(leaves, algorithm) {
        this.leaves = leaves;
        this.algorithm = algorithm;
        this.layers = [];
        this.build(this.leaves);
    }
    MerkleTree.prototype.hash = function (x) {
        return this.algorithm(x);
    };
    MerkleTree.prototype.combine_hash = function (x, y) {
        if (x && !y)
            return x.toString();
        else if (!x && y)
            return y.toString();
        else if (x && y)
            return x < y ? this.algorithm(x, y) : this.algorithm(y, x);
        else
            throw new Error('Failed to generate hash without any inputs.');
    };
    Object.defineProperty(MerkleTree.prototype, "root", {
        /**
         * Get the merkle root
         */
        get: function () {
            var topLayer = this.layers[this.layers.length - 1];
            if (!topLayer)
                throw new Error('Cannot get root without building a tree.');
            if (topLayer.length !== 1)
                throw new Error('Invalid tree.');
            return topLayer[0];
        },
        enumerable: false,
        configurable: true
    });
    /**
     * Build a new merkle tree with given leaves
     * @param leaves
     */
    MerkleTree.prototype.build = function (leaves) {
        var _this = this;
        // delete previous tree
        this.layers.length = 0;
        // build the new tree
        this.layers[0] = leaves.map(this.hash.bind(this));
        for (var layer = 0; this.layers[layer].length > 1; layer += 1) {
            this.layers[layer + 1] = this.layers[layer]
                .map(function (x, i, array) {
                if (i % 2 == 0)
                    return _this.combine_hash(x, array[i + 1]);
                return '';
            })
                .filter(Boolean);
        }
    };
    MerkleTree.prototype.getNeighbor = function (index, layer) {
        return layer[index % 2 === 0 ? index + 1 : index - 1];
    };
    MerkleTree.prototype.generateProof = function (x) {
        var _this = this;
        var index = this.layers[0].indexOf(this.hash(x));
        if (index === -1)
            throw new Error("Failed to generate proof for " + x);
        return this.layers.slice(0, this.layers.length - 1).reduce(function (accumulator, layer) {
            var neighbor = _this.getNeighbor(index, layer);
            index = ~~(index / 2);
            if (!neighbor)
                return __spreadArrays(accumulator);
            return __spreadArrays(accumulator, [neighbor]);
        }, []);
    };
    MerkleTree.prototype.verifyProof = function (proof, target) {
        var computed_hash = this.hash(target);
        for (var i = 0; i < proof.length; i++) {
            if (computed_hash <= proof[i])
                computed_hash = this.combine_hash(computed_hash, proof[i]);
            else
                computed_hash = this.combine_hash(proof[i], computed_hash);
        }
        return computed_hash === this.root;
    };
    return MerkleTree;
}());
exports.MerkleTree = MerkleTree;
