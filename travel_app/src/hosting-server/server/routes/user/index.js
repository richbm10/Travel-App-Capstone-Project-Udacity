const express = require('express');

const router = express.Router();

module.exports = (param) => {

    const { userServices } = param;

    router.get('/:username', async(req, res, next) => {
        try {
            const data = await userServices.getUser(req.params.username);
            return res.send(data);
        } catch (err) {
            return next(err);
        }
    });

    router.put('/trip/:userId', async(req, res, next) => {
        try {
            const message = await userServices.createTrip(req.params.userId, req.body);
            return res.send(message);
        } catch (err) {
            return next(err);
        }
    });

    router.post('/trip/:userId', async(req, res, next) => {
        try {
            const message = await userServices.updateTrip(req.params.userId, req.body);
            return res.send(message);
        } catch (err) {
            return next(err);
        }
    });

    router.delete('/trip/:userId/:tripId', async(req, res, next) => {
        try {
            const message = await userServices.deleteTrip(req.params.userId, req.params.tripId);
            return res.send(message);
        } catch (err) {
            return next(err);
        }
    });

    return router;
};