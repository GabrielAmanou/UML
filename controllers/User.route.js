//const { response } = require('express');
const express = require('express');
const router = express.Router();
const clientManaging = require('../utils/clients.managing')
const userRepo = require("../utils/users.repository");
const auth = require("../utils/users.auth");
const userf = require("../utils/user_functions");
const petsManaging = require('../utils/pets.managing')
const sheltrep = require("../utils/shelters.managing");
const { response } = require('express');

router.get('/', auth.checkAuthenticationClient(), Userpage);
router.get('/takeback/:pet_id', auth.checkAuthenticationClient(), TakeBack)
router.get('/addpet',auth.checkAuthenticationClient(), AddPet)
router.post('/addpetfinish', auth.checkAuthenticationClient(), AddPetFinish)

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
    console.log('test')
    var nbsh = await userf.countshelter(); 
    console.log(nbsh);
    for (let index = 0; index < nbsh.c; index++) {
        sh[index] = await userf.TEST(index+1);
    }
    //console.log(sh);
    //console.log(sh[0].shelter_location);

    var sh_dispo = new Array();

    for (const c of sh) {
        console.log(c.shelter_nbr_max_of_pets);
        console.log(c.nbr);
        if(c.shelter_nbr_max_of_pets > c.nbr){
            console.log('append');
            sh_dispo.push(c);
        }
    }

    console.log(sh_dispo)
    
    response.render('user_addpet_view', { 'shelter': sh, 'dispo': sh_dispo });
}

async function AddPetFinish(request, response){

    id = await petsManaging.CreatePet(request.user.client_id, request.body.pet_name, request.body.pet_specie, request.body.pet_age, request.body.pet_diet);
    await petsManaging.Assign(id, request.body.shelter_id);

    response.render('user_petadd_success')

}


module.exports = router;