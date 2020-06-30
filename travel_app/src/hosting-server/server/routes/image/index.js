const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { imageServices } = param;

    service.get('/images/location/:address/:top', async(req, res, next) => {
        try {
            const images = await imageServices.getImages(req.params.address);
            const data = [];
            for (let i = 0; i < req.params.top; i++) {
                data.push(images[i]);
            }
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    return router;
};