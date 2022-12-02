// controllers/site.route.js
const express = require('express');
const router = express.Router();

// http://localhost:9000/auth
router.get('/', (req, res) => res.render('site_view'));

module.exports = router;