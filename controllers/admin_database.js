const Product = require('../models/product_database');
const db=require('../util/database')

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
product.save().then(()=>res.redirect('/admin/products')).catch(e=>console.log(e));
  
};
exports.editProduct=(req,res)=>{
  const editMode=req.query.edit
  const id=req.params.productId;
  console.log(id,editMode)
  if(editMode){
  Product.findById(id).then(e=>{
    let f=e[0]
    console.log(f[0].id)
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editing: editMode ,
       product :e[0][0]
    })
  }).catch(e=>console.log(e))
}
}
exports.postEditProduct=(req,res)=>{
  const id=req.params.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  const product = new Product(title, imageUrl, description, price);
  product.update(id).then(()=>res.redirect('/admin/products'))
  .catch(e=>console.log(e))
}
exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(e=>console.log(e))
};
exports.deleteProduct=(req,res)=>{
  const delid=req.params.productId
    db.execute('DELETE FROM products where products.id=?',[delid])
    .then(()=>res.redirect('/admin/products') )
    .catch(e=>console.log(e))
}
