// const db = require('../util/database');

// const Cart = require('./cart');



// module.exports = class Product {
//   constructor(id, title, imageUrl, description, price) {
//     this.id = id;
//     this.title = title;
//     this.imageUrl = imageUrl;
//     this.description = description;
//     this.price = price;
//   }

//   save() {
//     return db.execute(
//       'INSERT INTO products (title, description, price, imageUrl) VALUES (?, ?, ?, ?)', 
//        [this.title, this.description, this.price, this.imageUrl]
//     )
//   }

//   static deleteById(id) {
//     db.execute('')
//   }

//   static fetchAll() {
//    return db.execute('SELECT * FROM products');
//   }

//   static findById(id, ) {
//     return db.execute('SELECT * FROM products WHERE id = ?', [id])
//   }
// };


const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Product = sequelize.define('products', {
  id:{
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull:false,
    primaryKey: true

  },
  title:Sequelize.STRING, 
  price: {
    type:Sequelize.DOUBLE,
    allowNull:false
  },
  description:{
    type:Sequelize.STRING,
    allowNull:false,
  },
  imageUrl:{
    type:Sequelize.STRING,
    allowNull:false,
  }

   
});

module.exports = Product;