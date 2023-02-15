const Product = require('../models/product_database');
const Cart = require('../models/Cart_database');

exports.getProducts = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products'
    });
  }).catch(e=>console.log(e))
};
exports.getProduct=(req,res,next)=>{
  const pid=req.params.productid;
  Product.findById(pid).then(([product])=>{
    res.render('shop/product-detail', {
      product: product[0],  //finding first element(ie id) from product 
      pageTitle : product.title,
      path:'/products'
    })
  }).catch(e=>console.log(e))
}
exports.getIndex = (req, res, next) => {
  Product.fetchAll().then(([products]) => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    });
  }).catch(e=>console.log(e))
};

exports.getCart = (req, res, next) => {
 Cart.getCart(item=>{ 
  let disp=[]
  Product.fetchAll(pro=>{
      for(p of pro){
        const index=item.find(e=>e.id===p.id)
        if(index){
         disp.push({pr:p,qty:index.qty})
        }
      }
      res.render('shop/cart', {
        path: '/cart',
        prods: disp,
        pageTitle: 'Your Cart' 
      });
  })
  
 })
 

  
};
exports.cartPost=(req,res)=>{
  const proid=req.body.productid;
  Product.findById(proid,pro=>{
    // cart.addProduct(proid,pro.price)
    cart.addProduct1(proid)
    res.redirect('/cart')
  })
}
exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};

exports.getCheckout = (req, res, next) => {
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