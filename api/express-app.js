const express = require('express');
const cors = require('cors');



module.exports = async (app) => {

    app.use((err, req, res, next) => {
        const statusCode = err.statusCode || 500;
        const message = err.message || 'Internal Server Error';
        return res.status(statusCode).json({
            success: false,
            statusCode,
            message,
        });
    });

    app.use(express.json({ limit: '1mb' }));
    app.use(express.urlencoded({ extended: true, limit: '1mb' }));
    app.use(cors());
    // app.use(express.static(__dirname + '/public'))
}