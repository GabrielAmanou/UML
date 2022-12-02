// controllers/auth.route.js
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
router.get('/log_in', (req, res) => res.render('log_in_view'));
router.get('/sign_up', (req, res) => res.render('sign_up'));





module.exports = router;