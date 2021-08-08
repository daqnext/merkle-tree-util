# merkle-tree-util

### how to use 

#### ``` npm install merkle-tree-util ```
#### ``` npm install ethers ```
#### Example :

```
 
const {MTree} =require('merkle-tree-util');
const {ethers}= require('ethers')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
let mtree=new MTree();
let x0=mtree.addLeaf(ethers.Wallet.createRandom().address,500);
let x1=mtree.addLeaf(ethers.Wallet.createRandom().address,1500);
mtree.build();
console.log(mtree.get_all_proof());

console.log("###### root hash  is : ########");
console.log(mtree.get_root());

let proof_0=mtree.gen_proof(0);
console.log("###### proof 0 is : ########");
console.log(proof_0);

let vresult_0=mtree.verifyProof(proof_0.buff,proof_0.proof);
console.log("###### verify proof 0 is : ########");
console.log(vresult_0);

```