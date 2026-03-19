const fs = require('fs');
const path = require('path');

const p = path.join(
    process.cwd(),
    'data',
    'cart.json'
);

module.exports = class Cart {
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart =
            {
                products: [],
                totalPrice: 0
            };
            if (!err) {
                //If no error => cart exists => parse it
                cart = JSON.parse(fileContent);
            }
            //Analyze the cart => Find if we add the existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;
            //If exist => increase qty and update it
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            }
            //If not exist => add new product with qty 1
            else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct];
            }
            //Increase the total price. Note: productPrice is a string => convert it to number using + operator
            cart.totalPrice = cart.totalPrice + +productPrice;
            //Save the updated cart back to the file data/cart.json
            fs.writeFile(p, JSON.stringify(cart), (err) => {
                console.log(err);
            });
        });
    }
}