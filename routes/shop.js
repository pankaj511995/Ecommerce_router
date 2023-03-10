const path = require('path');

const express = require('express');

const shopController = require('../controllers/shop_database');

const router = express.Router();

router.get('/', shopController.getIndex);

router.get('/products', shopController.getProducts);
router.get('/products/:productid',shopController.getDetails)

router.get('/cart', shopController.getCart);
router.post('/cart',shopController.cartPost)
  
router.get('/orders', shopController.getOrders);
router.post('/cart/delete-cart/:deleteid',shopController.deleteCart)

router.get('/checkout/:total', shopController.getCheckout);

module.exports = router;
