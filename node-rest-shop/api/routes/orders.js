const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All Yours Orders',
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Your Order Created',
    });
});


router.get('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Details',
        orderId: req.params.orderId,
    });
});

router.delete('/:orderId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Deleted',
        orderId: req.params.orderId,
    });
});

module.exports = router;