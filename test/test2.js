const {assert} = require('chai');
require('../pkg/merkle-tree-util-min.js');
const util = require('util')
const {ethers}= require('ethers')


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  
describe('MTree', function() {

//   it('add_leave', function() {
    
//       let mtree=new MTree();
//       var x0=mtree.addLeaf(ethers.Wallet.createRandom().address,500);
//       var x1=mtree.addLeaf(ethers.Wallet.createRandom().address,1500);

//       assert.equal(x0,0);
//       assert.equal(x1,1);
//       assert.equal(mtree.leaves_count(),2);
  
//   });

//   it('build', function() {
      
      let mtree=NewMTree();
      var x0=mtree.addLeaf('asdfadf',500);
      var x1=mtree.addLeaf('asdfadf2',500);
      mtree.build();
      var xx=mtree.addLeaf('xxx',510);
      console.log(mtree.get_root())
      assert.equal(xx,-1);
      assert.equal(mtree.get_root(),'0xac047937fd755f0b35036238644bead785a6ffd54ad798799c55f426068365ab');
      assert.equal(mtree.leaves_count(),2);
//   });

//   it('all proof', function() { 
//       //let mtree=new MTree();

//       for(var i=0;i<5;i++){
//         let raddr=ethers.Wallet.createRandom().address;
//         mtree.addLeaf(raddr,+getRandomInt(1,999999999)+'000000000000000000');
//       }

//       mtree.build();
//       console.log("############################## example of all the proof #######################################");
//       console.log("########################### proof Array  type is a string[] ###################################");
//       console.log(mtree.get_all_proof());
//       console.log("############################## end of the example #############################################");
//   });

//   it('verify proof', function() { 
//     //let mtree=new MTree();

//     for(var i=0;i<5;i++){
//       let raddr=ethers.Wallet.createRandom().address;
//       mtree.addLeaf(raddr,+getRandomInt(1,999999999)+'000000000000000000');
//     }

//     mtree.build();
//     let proof_0=mtree.gen_proof(0);
//     let vresult=mtree.verifyProof(MTree.buf2hex(proof_0.buff),proof_0.proof);
//     assert.equal(vresult,true);
 
//   });




  
});