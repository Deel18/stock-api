const express = require("express");
const router = express.Router();
const users = require("../models/users");
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

router.get("/users/:email",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => users.fetchUser(res, req.params));


router.post("/balance/:email",
    (req, res, next) => checkToken(req, res, next),
    (req, res) => users.addBalance(res, req.body));

module.exports = router;
