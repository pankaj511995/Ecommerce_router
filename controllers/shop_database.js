const Product = require('../models/product_sequelize');
const cartItme = require('../models/cartitem');
const user=require('../models/user')

exports.getProducts = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(e=>console.log(e))
};
exports.getDetails=(req,res,next)=>{
  const pid=req.params.productid;
  // Product.findAll({where : {id :pid}}).then((product)=>{
  //   res.render('shop/product-detail', {
  //     product: product[0],  //finding first element(ie id) from product 
  //     pageTitle : product[0].title,
  //     path:'/products/:pid'
  //   })
  // }).catch(e=>console.log(e))


  Product.findByPk(pid).then((product)=>{// Pk define finding peimary key ..find by index is not working
    res.render('shop/product-detail', {
      product: product,  //showing error 
      pageTitle : product.title,
      path:'/products/:pid'
    })
  }).catch(e=>console.log(e))
}
exports.getIndex = (req, res, next) => {
  Product.findAll().then(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(e=>console.log(e))
};

exports.getCart = (req, res, next) => {///////////////////////////////
  req.user.getCart().then(cart=>{
    return cart.getProducts()
  }).then(products=>{
    res.render('shop/cart', {
        path: '/cart',
        prods: products,
        pageTitle: 'Your Cart'  
      })
   
  })
       

};
exports.cartPost=(req,res)=>{////////////////////////////
  const proid=req.body.productid;
  let qty=1;
  let car;
  req.user.getCart().then(cart=>{
    car=cart
   return cart.getProducts({where :{id:proid}})})
  .then(product=>{
   if(product.length>0){
    qty=product[0].cartItme.quantity+1
   }
   return Product.findByPk(proid)
  })
  .then(e=>{
    car.addProduct(e,{through :{quantity:qty}})
  }).then(g=>res.redirect('/cart'))
  .catch(e=>console.log('error found in post editing',e))
  
}

exports.getOrders = (req, res, next) => {/////////////////////////
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {//////////////////////
  const ch=req.params.total
  res.send(`<h1>${ch}</h1>`)
  // res.render('shop/checkout', {
  //   path: '/checkout',
  //   pageTitle: 'Checkout'
  // });
};
exports.deleteCart=(req,res)=>{
  const ch=req.params.deleteid
 cartItme.destroy({where:{id:ch}}).then(e=>console.log(e))
    res.redirect('/cart')
//  req.user.getCart().then(cart=>cart.getProducts({where:{id:ch}})).then(product=>{
//   console.log(product)
//  })
      
}