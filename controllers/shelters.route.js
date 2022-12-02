// controllers/shelters.route.js
const express = require('express');
const router = express.Router();

// http://localhost:9000/shelters
router.get('/', (req, res) => res.render('shelters_view'));


module.exports = router;