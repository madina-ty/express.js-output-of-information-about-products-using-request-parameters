const express = require('express');
const app = express();
const fs = require('fs/promises');

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 },
  { id: 2, name: 'Phone', category: 'Electronics', price: 500 },
  { id: 3, name: 'Shirt', category: 'Clothing', price: 20 },
  { id: 4, name: 'Jacket', category: 'Clothing', price: 50 },
  { id: 5, name: 'Watch', category: 'Accessories', price: 150 },
];

app.get('/products', async (req, res) => {
    let filteredProducts = [...products];

    const { category, maxPrice, minPrice, name } = req.query;

    if (category) {
        filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === category.toLowerCase());
    }

    if (maxPrice) {
        filteredProducts = filteredProducts.filter(product => product.price <= parseFloat(maxPrice));
    }

    if (minPrice) {
        filteredProducts = filteredProducts.filter(product => product.price >= parseFloat(minPrice));
    }

    if (name) {
        filteredProducts = filteredProducts.filter(product => product.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (filteredProducts.length > 0) {
        return res.json(filteredProducts);
    }

    
    const message = `No products found matching your criteria: category: ${category}, maxPrice: ${maxPrice}, minPrice: ${minPrice}, name: ${name}\n`;
    await fs.appendFile('products.txt', message);

    res.status(404).json({ message: 'No products found matching your criteria' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
