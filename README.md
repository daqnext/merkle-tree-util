# merkle-tree-util

### how to use 

### ``` npm install merkle-tree-util ```
### ``` npm install ethers ```
### ``` npm install ethers ```
```
const {MTree} =require('merkle-tree-util');
const {ethers}= require('ethers')

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
 
let mtree=new MTree();
var x0=mtree.addLeaf(ethers.Wallet.createRandom().address,500);
var x1=mtree.addLeaf(ethers.Wallet.createRandom().address,1500);
mtree.build();
console.log(mtree.get_all_proof())

```