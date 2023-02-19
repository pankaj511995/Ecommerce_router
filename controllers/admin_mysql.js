const Product = require('../models/product_sequelize');
const db=require('../util/mysql')

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
  console.log(req.user.id)
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description; 
  db.execute(`INSERT INTO product (title,imageUrl,price,description) VALUES(?,?,?,?)`,[title,imageUrl,price,description])
  .then(()=>res.redirect('/admin/products')) 
  .catch(e=>console.log(e))
  
};
exports.editProduct=(req,res)=>{
  const editMode=req.query.edit
  const eid=req.params.productId;
  if(editMode){
  db.execute('SELECT * FROM product utf8 WHERE id=?',[eid]).then(e=>{ 
    console.log(e)
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editing: editMode ,
       product :e[0].toString()    
    })
  }).catch(e=>console.log(e))
}
}  
exports.postEditProduct=(req,res)=>{
  const eid=req.params.productId;
  const title = req.body.title; 
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  Product.update({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description},{
    where :{id:eid}
  }).then(()=>res.redirect('/admin/products'))
  .catch(e=>console.log(e))
}
exports.getProducts = (req, res, next) => {
      db.execute('SELECT *FROM Product').then(products=> {
      res.render('admin/products', {
      prods: products[0],
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
    }).catch(e=>console.log(e))     
  }; 
exports.deleteProduct=(req,res)=>{
  const delid=req.params.productId
   db.execute(`DELETE FROM product WHERE id=?`,[delid])
   .then(()=>res.redirect('/admin/products')).catch(e=>console.log(e))
}
