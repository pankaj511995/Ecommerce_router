const fs = require('fs');
const path = require('path');
const db=require('../util/database')

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price; 
  }
  save() {
  return db.execute('INSERT INTO products (price,title,imageUrl,description) VALUES (?,?,?,?)',[this.price,this.title,this.imageUrl,this.description])
  }
  update(id){
    return db.execute(`UPDATE products SET id="${id}",price="${this.price}",title="${this.title}",imageUrl="${this.imageUrl}",description="${this.description}"  WHERE products.id="${id}"`)
  }
  
  static fetchAll(cb) {
   return db.execute('SELECT*FROM products')
  }
  static findById(id){
    return db.execute('SELECT * FROM products where products.id=?',[id])
}
  
};
 