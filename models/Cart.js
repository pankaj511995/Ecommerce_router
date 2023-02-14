const fs=require('fs')
const path=require('path')
const pa=require('../util/path')
const p=path.join(pa,'data','cart.json')
const newp=path.join(pa,'data','cartnew.json')
   
module.exports=class Cart{

    // by udamy
    // static totalprice;
    // static addProduct(id,price){
    //     let cart={products: [],totalprice:0}
    //     fs.readFile(p,'utf8',(err,data)=>{
    //         if(data!=''){
    //             cart=JSON.parse(data);
    //         }
    //         const index=cart.products.findIndex(p=>p.id===id)
    //         const existing=cart.products[index]
    //         let update;
    //         if(existing){
    //             update={...existing};
    //             update.qty++
    //             cart.products=[...cart.products]
    //             cart.products[index]=update;
    //         }
    //         else{
    //             update={id:id,qty:1}
    //             cart.products=[...cart.products,update]
    //         }
    //        cart.totalprice=cart.totalprice+ +price
    //        Cart.totalprice=cart.totalprice;
    //         fs.writeFile(p,JSON.stringify(cart),err=>console.log(err))
    //     })
    // } /
   
// by mysself
  static addProduct1(id1){
    
    fs.readFile(newp,'utf8',(err,data)=>{
        let pro=[]
        if(data!='')pro=JSON.parse(data)
        if(pro.length===0) pro.push({id:id1,qty:1})
        else {
            const p=pro.findIndex(e=>e.id===id1)
            if(p!=-1){
               const q= pro[p].qty+1
                pro[p]=({id:id1,qty:q})
            }
            else pro.push({id:id1,qty:1})
            }
        fs.writeFile(newp,JSON.stringify(pro),e=>console.log(e))
          
    })
    
  } 
  static getCart(cb){
    fs.readFile(newp,'utf8',(e,d)=>{
        if(d===''){
            cb(null)
        }else{
            cb(JSON.parse(d))
        }
    })
  }
}

