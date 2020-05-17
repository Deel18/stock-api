DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    balance INT DEFAULT 0,
    stock1 INT DEFAULT 0,
    stock2 INT DEFAULT 0,
    stock3 INT DEFAULT 0,
    stock4 INT DEFAULT 0,
    stock5 INT DEFAULT 0,
    stock6 INT DEFAULT 0,
    stock7 INT DEFAULT 0,
    stock8 INT DEFAULT 0,
    stock9 INT DEFAULT 0,
    stock10 INT DEFAULT 0,
    UNIQUE(email)
);
