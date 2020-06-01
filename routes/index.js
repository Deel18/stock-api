const express = require('express');
const router = express.Router();


router.get('/', function(req, res) {
    const data = {
        data: {
            message: `Welcome to Stock Trading Inc's website, a fake stock trading website used as a final project in the course JS-Frameworks. Please have a look around.`
        }
    };
    res.json(data);
});


module.exports = router;
