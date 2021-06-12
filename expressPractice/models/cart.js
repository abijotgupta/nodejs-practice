const fs = require('fs');
const path = require('path');

const local_path = path.join(
    path.dirname(process.mainModule.filename),
    'data',
    'cart.json'
);

module.exports = class Cart { 
    static addProduct(id, productPrice) {
        //Fetch the previous cart
        fs.readFile(local_path, (err, fileContent) => {
            let cart = {
                products: [],
                totalPrice: 0
            };
            if(!err) {
                cart = JSON.parse(fileContent);
            }

            //Analyze the cart => Find existing products
            const existingProductIndex = cart.products.findIndex(
                prod => prod.id === id
            );
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //Add new Product to increase qty
            if(existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1};
                cart.products = [...cart.products, updatedProduct];
            }
            cart.totalPrice = cart.totalPrice + +productPrice;  
            fs.writeFile(local_path, JSON.stringify(cart), (err) => {
                console.log(err);
            });    
        });    
    }
}