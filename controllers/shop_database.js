const Product = require('../models/product_sequelize');
const Cart = require('../models/Cart_database');
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

  let fetchedcart;
  let qty=1
  req.user.getCart().then(cart=>{
    fetchedcart=cart;
    return cart.getProducts({where:{id:proid}})
  }).then(products=>{
    let product;
    if(products.length>0){
      product=products[0]
    }
    if(product){
      let q=product.cartItem.quantity;
      qty=q+1;
      console.log('qty*********************=',qty)
      return product
    }
    return Product.findByPk(proid) 
  }).then(product=>{
    console.log('qty adding to cart*********************=',qty)
   return fetchedcart.addProducts(product,{through :{quantity:qty}})
  }).then(()=>res.redirect('/cart') )
  .catch(e=>console.log(e))
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

  const ch=req.body.deleteid
  fs.readFile(cartPath,'utf8',(err,data)=>{
    const f=JSON.parse(data)
    const d=f.filter(e=>e.id!=ch)
    fs.writeFile(cartPath,JSON.stringify(d),e=>console.log(e))
    res.redirect('/cart')
  })
 
    
}