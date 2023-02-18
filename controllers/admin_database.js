const Product = require('../models/product_sequelize');
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
  req.user.createProduct({
    title:title,
    imageUrl:imageUrl,
    price:price,
    description:description
   
  }).then(()=>res.redirect('/admin/products'))
  .catch(e=>console.log(e))
  
};
exports.editProduct=(req,res)=>{
  const editMode=req.query.edit
  const eid=req.params.productId;
  if(editMode){
  req.user.getProducts({where :{ id:eid}}).then(e=>{ ///find by id is not a function in swqualize DOC
    res.render('admin/edit-product', {
        pageTitle: 'Add Product',
        path: '/admin/edit-product',
        editing: editMode ,
       product :e[0]
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
  req.user.getProducts().then(products=> {
    res.render('admin/products', {
      prods: products,
      pageTitle: 'Admin Products',
      path: '/admin/products'
    });
  }).catch(e=>console.log(e))
};
exports.deleteProduct=(req,res)=>{
  const delid=req.params.productId
   Product.destroy({where :{id:delid}}).then(()=>res.redirect('/admin/products')).catch(e=>console.log(e))

  //  Product.findByPk(delid).then((pro)=>{
  //   pro.destroy();
  //   res.redirect('/admin/products')
  //  }).catch(e=>console.log(e))
}
