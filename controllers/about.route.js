// controllers/about.route.js
const express = require('express');
const router = express.Router();

// http://localhost:9000/about
router.get('/', (req, res) => res.render('about_view'));


module.exports = router;