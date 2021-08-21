const express = require('express');
const morgan = require('morgan');

const app = express();

const productRoutes = require('./api/routes/product');
const orderRoutes = require('./api/routes/orders');

app.use(morgan('dev'));

//Routes which should handle request
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

app.use((res, req, next) => {
    const error = new Error('Not Found');
    error.status = 400;
    next(error);
});

app.use((error, res, req, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
