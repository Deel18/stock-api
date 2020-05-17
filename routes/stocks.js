const express = require("express");
const router = express.Router();
const stocks = require("../models/stocks");
const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
    const token = req.headers["x-access-token"];

    jwt.verify(token, process.env.JWT_SECRET, function(err) {
        if (err) {
            return res.status(500).json( {
                error: {
                    message: "Invalid Token.",
                    details: err.message,

                }
            })
        }
        next();
    })
}

router.get("/stocks/:email",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => stocks.fetchStocks(res, req.params));

router.post("/stocks/:email",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => stocks.BuyStocks(res, req.body));

module.exports = router;
