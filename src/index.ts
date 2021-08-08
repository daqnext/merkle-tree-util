import {MerkleTree} from './merkleTree'
import { soliditySha3 } from 'web3-utils'
import { ethers } from 'ethers'
const abiCoder = new ethers.utils.AbiCoder()


class Leaf{
    public addr:string;
    public amount:string;
    public index:number;
    public buff:Buffer;

    constructor(address:string,_amount:string,_index:number){
        this.addr=address;
        this.amount=_amount;
        this.index=_index
        this.buff= Buffer.concat([
            MTree.hex2buf(abiCoder.encode(['uint256'], [_index])),
            MTree.hex2buf(address),
            MTree.hex2buf(abiCoder.encode(['uint256'], [_amount])),
        ]); 

    }
}


class MTree{


    public static buf2hex(b: Buffer) {
        return '0x' + b.toString('hex')
    }
      
    public static hex2buf(h: string) {
        return Buffer.from(h.replace(/^0x/i, ''), 'hex')
    }

    leaves:Leaf[];
    
    // return -1 for error
    public addLeaf(addr:string ,amount:string):number{
        if(!this.is_built){
            const index=this.leaves.length
            this.leaves.push(new Leaf(addr,amount,index));
            return index;
        }else{
            return -1;
        }
    }

    leaves_count(){
        return this.leaves.length;
    }

 
    tree:MerkleTree;
    public leaves_hex:string[];
    is_built:boolean=false;

    constructor(){
        this.leaves=[];
        this.leaves_hex=[];
        this.tree=(null as any)
    }

    public build(){
        if(!this.is_built){
            this.leaves_hex= this.leaves.map((l) =>MTree.buf2hex(l.buff));
            this.tree = new MerkleTree(this.leaves_hex,(soliditySha3 as unknown) as (...str: string[]) => string);
            this.is_built=true;
        } 
    }


    public get_root(){
        if(this.is_built){
            return this.tree.root;
        }else{
            return null;
        }
    }

    public gen_proof(index:number){

        if(this.is_built){
            return {
                index:this.leaves[index].index,
                addr:this.leaves[index].addr,
                amount:this.leaves[index].amount,
                proof:this.tree.generateProof(MTree.buf2hex(this.leaves[index].buff))
            };
        }else{
            return null;
        }
    }

    get_all_proof() {
        if (this.is_built) {
            return {
                roothash:this.tree.root,
                proof:this.leaves.map((l) => this.gen_proof(l.index))
            };
        }else{
            return null;
        }
    }

}



module.exports={MTree,Leaf}