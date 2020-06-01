const db = require("../db/database.js");

const users = {
    fetchUser: function(res, req) {
        const email = req.email
        if (!email) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/user",
                    title: "Email missing in request.",
                    detail: err.message
                }
            })
        };
        db.get("SELECT email, balance FROM users WHERE email = ?", email,function (err, row) {
            if (err) {
                return res.status(400).json({
                    errors: {
                        status: 400,
                        source: "/user",
                        title:  "Database error",
                        detail: err.message
                    }
                })
            }
            return res.status(200).json({
                data: row
            })
        })
    },
    addBalance: function(res, body) {
        const email = body.email
        const balance = body.balance

        if(!email && !balance) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/balance",
                    title: "Email/funds missing in request.",
                    detail: err.message
                }
            })
        };

        db.run("UPDATE users SET balance=? WHERE email=?", balance, email, function (err, row) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/balance",
                        title: "Database error.",
                        detail: err.message
                    }
                })
            }
            return res.status(200).json({
                response: {
                    message: balance + " funds have been added to your account."
                }
            })
        })
    },
}

module.exports = users;
