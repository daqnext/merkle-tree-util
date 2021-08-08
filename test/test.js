const {assert} = require('chai');
const {MTree} =require('../dist/src/index');
const util = require('util')

describe('MTree', function() {


  it('add_leave', function() {
    
      let mtree=new MTree();
      var x0=mtree.addLeaf('asdfadf',500);
      var x1=mtree.addLeaf('asdfadf2',500);
      assert.equal(x0,0);
      assert.equal(x1,1);
      assert.equal(mtree.leaves_count(),2);
  
  });

  it('build', function() {
      
      let mtree=new MTree();
      var x0=mtree.addLeaf('asdfadf',500);
      var x1=mtree.addLeaf('asdfadf2',500);
      mtree.build();
      var xx=mtree.addLeaf('xxx',510);
      assert.equal(xx,-1);
      assert.equal(mtree.get_root(),'0xac047937fd755f0b35036238644bead785a6ffd54ad798799c55f426068365ab');
      assert.equal(mtree.leaves_count(),2);
  });

  it('proof', function() { 
      let mtree=new MTree();
      var x0=mtree.addLeaf('asdfadf',500);
      var x1=mtree.addLeaf('asdfadf2',500);
      mtree.build();
      console.log(util.inspect(mtree.get_all_proof(), {showHidden: false, depth: null}));
  });


  
});
