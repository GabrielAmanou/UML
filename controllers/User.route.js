//const { response } = require('express');
const express = require('express');
const router = express.Router();
const clientManaging = require('../utils/clients.managing')

router.get('/', (req, res) => res.render('site_view'));
router.post('/signup', SignUpFinish)

async function SignUpFinish(request, response){
    console.log(request.body.client_name);
    console.log(request.body.client_email);
    console.log(request.body.client_password);
    await clientManaging.CreateClient(request.body.client_name, request.body.client_email, request.body.client_password);
    response.redirect('/auth');
  }

module.exports = router;