//const { response } = require('express');
const express = require('express');
const router = express.Router();
const clientManaging = require('../utils/clients.managing')
const userRepo = require("../utils/users.repository");
const auth = require("../utils/users.auth");
const userf = require("../utils/user_functions");
const petsManaging = require('../utils/pets.managing')
const sheltrep = require("../utils/shelters.managing")

router.get('/', auth.checkAuthenticationClient(), Userpage);
router.get('/takeback/:pet_id', auth.checkAuthenticationClient(), TakeBack)
router.get('/addpet', AddPet)

async function Userpage(request, response) {
    console.log(request.user.client_id);
    pets = await userf.Get_Pets_of_Client(request.user.client_id);

    response.render('user_page_view', { 'pets': pets});
}

async function TakeBack(request, response) {

    await petsManaging.DelPet(request.params.pet_id)
    response.render('user_takeback_confirm')

}

async function AddPet(request, response) {
    var sh = new Array();
    //shelters = await sheltrep.GetAllShelter();
    for (let index = 0; index < 4; index++) {
        sh[index] = await userf.TEST(index+1);
    }
    console.log(sh);
    
    response.render('user_addpet_view', { });
}


module.exports = router;