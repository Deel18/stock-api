const db = require("../db/database.js");

const stocks = {
    fetchStocks: function(res, req) {
        const email = req.email;

        db.get("SELECT stock1, stock2, stock3, stock4, stock5, stock6, stock7, stock8, stock9, stock10 FROM users WHERE email = ?", email, function (err, row) {
            if (err) {
                return res.status(500).json({
                    errors: {
                        status: 500,
                        source: "/stocks",
                        title: "Database error.",
                        detail: err.message
                    }
                })
            }
            return res.status(200).json({
                response: {
                    message: "Stock retrieved successfully.",
                    data: row
                }
            })
        })
    },
    BuyStocks: function(res, body) {
        const email = body.email;
        const balance = body.balance;
        const stock1 = body.stock1;
        const stock2 = body.stock2;
        const stock3 = body.stock3;
        const stock4 = body.stock4;
        const stock5 = body.stock5;
        const stock6 = body.stock6;
        const stock7 = body.stock7;
        const stock8 = body.stock8;
        const stock9 = body.stock9;
        const stock10 = body.stock10;

        if (!email) {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/stock",
                    title: "Email missing in request.",
                    detail: err.message
                }
            })
        };
        //add stocks to the users depot
        db.run("UPDATE users SET balance = ?, stock1 = ?, stock2 = ?, stock3 = ?, stock4 = ?, stock5 = ?, stock6 =?, stock7 = ?, stock8 = ?, stock9 = ?, stock10 = ? WHERE email = ?", balance, stock1, stock2, stock3, stock4, stock5, stock6, stock7, stock8, stock9, stock10, email, function(err) {
            if (err) {
                return res.status(500).json({
                    error: {
                        status: 500,
                        source: "/stocks",
                        title: "database error",
                        detail: err.message
                    }
                })
            }
            return res.status(200).json({
                response: {
                    message: "Stocks bought successfully."
                }
            })
        })
    }
}

module.exports = stocks;
