const Product = require('../models/product');
const fs=require('fs')
const path=require('path')
const pa=require('../util/path')
const p=path.join(pa,'data','products.json')
const pcart=path.join(pa,'data','products.json')

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing:false,
    formsCSS: true,
    productCSS: true,
    activeAddProduct: true
  });
};

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.save();
  res.redirect('/'); 
};
exports.editProduct=(req,res)=>{
  const editMode=req.query.edit
  const id=req.params.productId;
  console.log(id,editMode)
  if(editMode){
  Product.findById(id,product=>{
    console.log(product)
      res.render('admin/edit-product', {
      pageTitle: 'Add Product',
      path: '/admin/edit-product',
      editing: editMode ,
     product :product
    });
  
    
  })
}
}
exports.postEditProduct=(req,res)=>{
  const id=req.params.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.update(id);
  res.redirect('/'); 
  console.log('edited form',id)
}
exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  });
};
exports.deleteProduct=(req,res)=>{
  const delid=req.params.productId
  console.log('delete id --controller-admin.js' ,delid)
    fs.readFile(p,'utf8',(e,data)=>{
      if(data!=''){
        const d=JSON.parse(data)
        let f=d.filter(e => e.id!=delid);
        fs.writeFile(p, JSON.stringify(f), err =>console.log(err));
      }
    })
    fs.readFile(pcart,'utf8',(e,data)=>{
      if(data!=''){
        const d=JSON.parse(data)
        let f=d.filter(e => e.id!=delid);
        fs.writeFile(pcart, JSON.stringify(f), err =>console.log(err));       
      }
    })
  res.redirect('/admin/products') 
}
