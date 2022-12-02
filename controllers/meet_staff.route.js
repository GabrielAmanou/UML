// controllers/meet_staff.route.js
const express = require('express');
const router = express.Router();

// http://localhost:9000/meet_staff
router.get('/', (req, res) => res.render('meet_staff_view'));

module.exports = router;