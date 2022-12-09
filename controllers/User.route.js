//const { response } = require('express');
const express = require('express');
const router = express.Router();
const clientManaging = require('../utils/clients.managing')
const userRepo = require("../utils/users.repository");
const auth = require("../utils/users.auth");
const userf = require("../utils/user_functions")

router.get('/', auth.checkAuthenticationClient(), Userpage);

async function Userpage(request, response) {
    console.log(request.user)
    pets = await userf.Get_Pets_of_Client(request.user.client_id);

    response.render('user_page_view', { 'pets': pets});
}


module.exports = router;