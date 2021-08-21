const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'Abijot',
    });
});

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'Abijot post',
    });
});

router.get('/:productId', (req, res, next) => {
    const id = req.params.productId;
    if(id === 'special') {
        res.status(200).json({
            message: 'ProductId',
            id: id,
        });
    } else {
        res.status(200).json({
            message: 'ProductId not found',
        });
    }
});

router.patch('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Updated Product',
    });
});

router.delete('/:productId', (req, res, next) => {
    res.status(200).json({
        message: 'Delete Product',
    });
});

module.exports = router;