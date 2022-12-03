// controllers/editDatabase.route.js
const express = require('express');
const router = express.Router();
const clientedit = require ('../utils/clients.managing')
const petedit = require ('../utils/pets.managing')

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



async function clientListAction(request, response){
    var clients = await clientedit.GetAllclients();

    
    response.render("edit_client_list", { "clients": clients });
}

async function petListeAction(request, response){
    var pets = await petedit.GetAllpets();

    response.render("edit_pet_list", {"pets": pets});
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
    response.render('client_update')
}

async function ClientFinishUpdate(request, response){
    
    await clientedit.UpdateClient(request.body.client_id,request.body.client_name, request.body.client_email, request.body.client_password)
    response.redirect('/edit/client/list')
}

async function PetAdd(request, response){

    response.render('pet_add_view')
}

async function PetFinishAdd(request, response){

    await petedit.CreatePet(request.body.owner_name, request.body.pet_name, request.body.pet_specie, request.body.pet_age, request.body.pet_diet)
    response.redirect('/edit/pet/list')
}



module.exports = router;