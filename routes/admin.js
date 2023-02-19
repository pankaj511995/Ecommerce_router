const path = require('path');
 
const express = require('express');

const adminController = require('../controllers/admin_mysql');
 
const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', adminController.getAddProduct);

// /admin/products => GET 
router.get('/products', adminController.getProducts);

// /admin/add-product => POST 

router.get('/edit-product/:productId',adminController.editProduct)
router.use('/edit-product/:productId',adminController.postEditProduct)
router.post('/add-product', adminController.postAddProduct);
router.post('/delete-product/:productId',adminController.deleteProduct)

module.exports = router;
  