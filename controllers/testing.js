const path=require('path')
const pa=require('../util/path')
const cartPath=path.join(pa,'data','cart.json')
const productPath=path.join(pa,'data','products.json')
const fs=require('fs')
fs.readFile(cartPath,'utf8',(err,data)=>{
    console.log(err)
    console.log(data)
})