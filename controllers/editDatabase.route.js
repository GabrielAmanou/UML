// controllers/editDatabase.route.js
const express = require('express');
const router = express.Router();
const clientedit = require ('../utils/clients.managing');
const petedit = require ('../utils/pets.managing');
const sheltedit = require('../utils/shelters.managing')

// http://localhost:9000/edit
router.get('/', (req, res) => res.render('edit_view'));
router.get('/client', (req, res) => res.render('edit_client_view'));
router.get('/pet', (req, res) => res.render('edit_pet_view'));

router.get('/client/list', clientListAction);
router.get('/client/add', ClientAdd)
router.post('/client/finishadd', ClientFinishAdd)
router.get('/client/del', ClientDel)
router.post('/client/finishdel',ClientFinishDel)
router.get('/client/update', ClientUpdate)
router.post("/client/finishupdate", ClientFinishUpdate)

router.get('/pet/list', petListeAction)
router.get('/pet/add', PetAdd)
router.post('/pet/finishadd', PetFinishAdd)
router.get('/pet/Assign', PetAssignAction)
router.post('/pet/AssignFinish', PetAssignFinish)
router.get('/pet/update', PetUpdate)
router.post('/pet/finishupdate', Petfinishupdate)
router.get('/pet/del', Petdelete)
router.post('/pet/delfinish', Petdelfinish)
router.get('/pet/delass', Petdelass)
router.post('/pet/delassfinish', Petdelassfinish)



async function clientListAction(request, response){
    var clients = await clientedit.GetAllclients();

    
    response.render("client_list_view", { "clients": clients });
}

async function petListeAction(request, response){
    var pets = await petedit.GetAllpets();

    response.render("pet_list_view", {"pets": pets});
}

async function ClientAdd(request, response){

    response.render("client_create_view", {})
}

async function ClientFinishAdd(request, response){

    await clientedit.CreateClient(request.body.client_name, request.body.client_email, request.body.client_password)
    response.redirect("/edit/client/list");
}

async function ClientDel(request, response){

    response.render('client_delete_view')
}

async function ClientFinishDel(request, response){

    await clientedit.DelClient(request.body.client_id)
    response.redirect('/edit/client/list')
}

async function ClientUpdate(request, response){
    response.render('client_update_view')
}

async function ClientFinishUpdate(request, response){
    
    await clientedit.UpdateClient(request.body.client_id,request.body.client_name, request.body.client_email, request.body.client_password)
    response.redirect('/edit/client/list')
}

async function PetAdd(request, response){

    response.render('pet_create_view')
}

async function PetFinishAdd(request, response){

    await petedit.CreatePet(request.body.pet_owner_id, request.body.pet_name, request.body.pet_specie, request.body.pet_age, request.body.pet_diet, request.body.shelter_id)
    response.redirect('/edit/pet/assign')
}

async function PetAssignAction(request, response){

    pet_whithout_shelter = await petedit.Get_pet_without_shelter();
    shelter = await sheltedit.GetAllShelter();
    if (pet_whithout_shelter){
        response.render ('edit_pet_assign', {'pet': pet_whithout_shelter, 'shelter': shelter})
    }
}

async function PetAssignFinish(request, response){

    await petedit.Assign(request.body.pet_id, request.body.shelter_id);
    response.redirect('/edit/pet/list')
}

async function PetUpdate(request, response){
    response.render ('pet_update_view')
}

async function Petfinishupdate(request, response){

    await petedit.UpdatePet(request.body.pet_id, request.body.pet_specie, request.body.pet_age, request.body.pet_diet);
    response.redirect('/edit/pet/list');
}

async function Petdelete(request, response){

    response.render('pet_delete_view');

}

async function Petdelfinish(request, response){

    await petedit.DelPet(request.body.pet_id);
    response.redirect('/edit/pet/list');
}

async function Petdelass(request, response){

    pets = await petedit.GetAllpets();

    response.render('edit_pet_delass', {"pets": pets})
}

async function Petdelassfinish(request, reponse){

    await petedit.Del_Assign_pet(request.body.pet_id);
    reponse.redirect('/edit/pet/list')
}





module.exports = router;