
process.env.NODE_ENV = "test";
process.env.JWT_SECRET = "UnSafeKey";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../app.js");
var token;
//const db = require("../../db/database.js");


chai.should();

chai.use(chaiHttp);


describe("Get /", () => {
    it("Test get index", (done) => {
        chai.request(server)
        .get("/")
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an("object");
            done();
        });
    });
});


describe("Register", () => {
    describe("POST /register", () => {
        it("Test registration for user", (done) => {
            const body = {
                email: "test@testsson.se",
                password: "password",
            };

            chai.request(server)
            .post("/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.be.an("object");
                done();
            });
        });

        it("Test faulty registration for user", (done) => {
            const body = {
                email: "x@x.1"
            };

            chai.request(server)
            .post("/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });

        it("Test if user exists", (done) => {
            const body = {
                email: "test@testsson.se",
                password: "password",
            };

            chai.request(server)
            .post("/register")
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);

                done();
            });
        });
    });
});

describe("Login", () => {
    describe("Post /login", () => {
        it("Test user login", (done) => {
            const body = {
                email: "test@testsson.se",
                password: "password",
            };

            chai.request(server)
            .post("/login")
            .send(body)
            .end((err, res) => {
                res.should.have.status(200);
                token = res.body.response.token;
                done();
            });
        });

        it("Test user login failure", (done) => {
            const body = {
                email: "not@registered.com",
                password: "drivel11",
            };

            chai.request(server)
            .post("/login")
            .send(body)
            .end((err, res) => {
                res.should.have.status(400);
                done();
            });
        });

        it("Test get User", (done) => {
            const body = {
                email: "test@testsson.se",
            };

            chai.request(server)
            .get("/users/test@testsson.se")
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200)
                done();
            });
        });

        it("Test get stocks of user", (done) => {
            chai.request(server)
            .get("/stocks/test@testsson.se").
            set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it("Test fail get stocks of user", (done) => {
            chai.request(server)
            .get("/stocks/test@testsson.se").
            set("x-access-token", null)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
        it("Test to buy stocks", (done) => {
            const body = {
                email: "test@testsson.se",
                balance: 20,
                stock: "stock1",
                amount: 5

            }
            chai.request(server)
            .post("/stocks/test@testsson.se")
            .send(body)
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            });
        });

        it("Test fail to buy stocks", (done) => {
            const body = {
                email: "test@testsson.se",
                balance: 20,
                stock: "stock1",
                amount: 5

            }
            chai.request(server)
            .post("/stocks/test@testsson.se")
            .send(body)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
        });
        it("Test to update balance", (done) => {
            const body = {
                email: "test@testsson.se",
                balance: 20,
            }
            chai.request(server)
            .post("/balance/test@testsson.se")
            .send(body)
            .set("x-access-token", token)
            .end((err, res) => {
                res.should.have.status(200);
                done();
            })
        })
    });
});
