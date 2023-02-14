const fs = require('fs');
const path = require('path');

const p = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'products.json'
);

const getProductsFromFile = cb => {
  fs.readFile(p,'utf8', (err, fileContent) => {
    if (fileContent==='') {
      cb([]); 
    } else {
      cb(JSON.parse(fileContent));
    }
  });
};

module.exports = class Product {
  constructor(title, imageUrl, description, price) {
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }
  save() {
    this.id=Math.random().toString();
    getProductsFromFile(products => {
      products.push(this);
      fs.writeFile(p, JSON.stringify(products), err =>console.log(err));
    });
  }
  update(id){
    this.id=id;
    getProductsFromFile(products => {
      let pro=products.filter(e=>e.id!=id)
      pro.push(this);
      console.log('update pro',pro)
      fs.writeFile(p, JSON.stringify(pro), err =>console.log(err));
    });
  }
 
  static fetchAll(cb) {
    getProductsFromFile(cb);
  }
  static findById(id,ch){
    getProductsFromFile(products=>{
    const product=products.find(p=>p.id===id);
    ch(product)
  })
}
  
};
 