const express = require('express');
const router = express.Router();

router.get('/add-prod', (req, res, next) => {
    console.log('In the Add Product middleware');
    res.send(`<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button</form>`);
});

router.post('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

module.exports = router;