const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const index = require("./routes/index");
const login = require('./routes/login');
const register = require("./routes/register");
const users = require("./routes/users");
const stocks = require("./routes/stocks");

//Dev port
const app = express();
const port = 8421;



app.use(cors());

app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "test") {
    app.use(morgan("combined")); //combined outputs the Apache style logs
}

// This is middleware called for all routes.
// Middleware takes three parameters.
app.use((req, res, next) => {
    console.log(req.method);
    console.log(req.path);
    next();
});



//External routes
app.get('/', index);
app.post("/login", login);
app.post("/register", register);
app.get("/users/:email", users);
app.post("/balance/:email", users)
app.get("/stocks/:email", stocks)
app.post("/stocks/:email", stocks)






// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }

    res.status(err.status || 500).json({
        "errors": [
            {
                "status": err.status,
                "title":  err.message,
                "detail": err.message
            }
        ]
    });
});



// Start up server
const server = app.listen(port, () => console.log(`Stock API listening on port ${port}!`));

module.exports = server;
