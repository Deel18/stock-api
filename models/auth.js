const db = require("../db/database.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const jwtSecret = process.env.JWT_SECRET;

const auth = {
    login: function(res, body) {
        const email = body.email;
        const password = body.password;

        let data = {
            response: {
                source: "/login",
                msg: "User successfully logged in."
            }
        };

        if (!email || !password) {
            data.response.msg = "E-mail or password missing."
            return res.status(401).json(data)
        }

        db.all("SELECT password from users WHERE email = ? LIMIT 1", email, function (err, row) {
            if ((err) || (row[0] === undefined)) {
                data.response.msg = "Invalid e-mail."
                return res.status(400).json(data);
            } else {
                bcrypt.compare(password, row[0].password, function (err, bRes) {
                    if ((err) || (!bRes)) {
                        data.response.msg = "Invalid password.";
                        data.response.error = row[0];
                        return res.status(400).json(data);
                    } else {
                        const payload = { email: body.email }
                        data.response.token = jwt.sign(payload, jwtSecret, { expiresIn: "1h"});
                        return res.status(200).json(data);
                    };
                });
            };
        });
    },

    register: function(res, body) {
        const saltRounds = 10;
        const email = body.email;
        const password = body.password;
        const balance = body.balance;
        //const dob = body.dob;

        let data = {
            response: {
                source: "/register",
                msg: "E-mail has been registered."
            }
        };

        bcrypt.hash(password, saltRounds, function(err, hash) {
            if (err) {
                data.response.msg = "Hash error."
                return res.status(400).json(data);
            } else {
                db.run("INSERT INTO users (email, password, balance) VALUES (?, ?, ?)", email, hash, balance, (err) => {
                    if (err) {
                        data.response.msg = "E-mail already registered.";
                        return res.status(400).json(data);
                    } else {
                        return res.status(201).json(data);
                    }
                })
            }
        })
    }
};

module.exports = auth;
