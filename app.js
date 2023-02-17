const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const sequelize=require('./util/database');// not working you have to take where you have construct table discription
const product=require('./models/product_sequelize');
const cart=require('./models/cart_sequlize')
const cartitem=require('./models/cartitem')
const user=require('./models/user')//this is working fine because in this file i has constructed table structure
const errorController = require('./controllers/error');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop'); 
const app = express(); 
app.use((req,res,next)=>{
    user.findByPk(1).then(user=>{
        req.user=user;
        next();
    }).catch(e=>console.log(e))
}) 
app.set('view engine', 'ejs');  
app.set('views', 'views');  
   
  
 
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); 
// console.log('i am product and user details',product,user) 
app.use('/admin', adminRoutes);  
app.use(shopRoutes);

app.use(errorController.get404); 
    user.hasOne(cart)
cart.belongsTo(user ) 
user.hasMany(product)
product.belongsTo(user ,{onDelete:'CASCADE'})
cart.belongsToMany(product , {through :cartitem}) 
product.belongsToMany(cart,{ through:cartitem})  
 
  sequelize.sync({force:false}).then(()=> user.findByPk(1)).then(users=>{
    if(users===null){
      console.log('i am creating user ')
      return user.create({Name:'pankaj',email:'p@gmail.com'}).then((users)=>users.createCart())
     
    }
    return users
  })
.then(()=> app.listen(3000)  )
 .catch(r=>console.log('gating error while creating table',r));    