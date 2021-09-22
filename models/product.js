const products = [];

module.exports = class Product {

    constructor(t) {
        this.tile = t;
    }

    save() { 
         products.push(this);
    }

    static fetchAll(){
      return products;
    }
}