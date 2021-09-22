const fs = require('fs');
const path = require('path');
const products = [];
const p = path.join(path.dirname(process.mainModule.filename), 'data', 'products.json');

module.exports = class Product {
    
    constructor(t) {
        this.title = t;
    }

    save() { 
        fs.readFile(p,'utf8', (err,data)=>{
            console.log(data);

            if (!err) {
              return  products = JSON.parse(data);
            }
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err)=>{
                console.log(err);
            })
        })
    }

    static fetchAll(cb){
        fs.readFile(p, (err,data)=> {
            if(err){
                cb([])
            }
            return cb(JSON.parse(data));
        });
      


    }
}