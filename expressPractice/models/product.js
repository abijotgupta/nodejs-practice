const fs = require('fs');
const path = require('path');

const local_path = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'products.json'
);
const getProductsFromFile = (callback) => {
    
    fs.readFile(local_path, (err, fileContent) => {
        if(err) {
            callback([]);
        } else {
            callback(JSON.parse(fileContent));
        }
        
    });
}

module.exports = class Product {
    constructor(title) {
        this.title = title;
    }

    save() {
        // const local_path = path.join(
        //     path.dirname(process.mainModule.filename),
        //     'data',
        //     'products.json'
        // );
        getProductsFromFile(products => {
            products.push(this);
            fs.writeFile(local_path, JSON.stringify(products), (err) => {
                console.log(err);
            });
        });
    }

    static fetchAll(callback) {
        getProductsFromFile(callback);
    }
}