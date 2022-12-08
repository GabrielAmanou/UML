// controllers/editDatabase.route.js
const express = require('express');
const router = express.Router();
const clientedit = require ('../utils/clients.managing');
const petedit = require ('../utils/pets.managing');
const sheltedit = require('../utils/shelters.managing')
const staffedit = require('../utils/staff.managing')
const auth = require("../utils/users.auth");

// http://localhost:9000/edit
router.get('/', auth.checkAuthenticationStaff(), AuthAction);
router.get('/client', (req, res) => res.render('edit_client_view'));
router.get('/pet', (req, res) => res.render('edit_pet_view'));
router.get('/staff', (req, res) => res.render('edit_staff_view'));
router.get('/shelter', (req, res) => res.render('edit_shelter_view'))

async function AuthAction(request, response){
    response.render('edit_view');
}

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

router.get('/staff/list', staffListAction)
router.get('/staff/add', StaffAdd)
router.post('/staff/finishadd', StaffFinishAdd)
router.get('/staff/del', StaffDel)
router.post('/staff/finishdel', StaffFinishDel)
router.get('/staff/update', StaffUpdate)
router.post('/staff/finishupdate', StaffFinishUpdate)

router.get('/shelter/list', shelterListeAction)
router.get('/shelter/add', ShelterAdd)
router.post('/shelter/finishadd', ShelterFinishAdd)
router.get('/shelter/del', ShelterDel)
router.post('/shelter/finishdel', ShelterFinishDel)
router.get('/shelter/update', ShelterUpdate)
router.post('/shelter/finishupdate', ShelterFinishUpdate)



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

async function staffListAction(request, response){
    var staff = await staffedit.GetAllstaff();    
    response.render("staff_list_view", { "staff": staff });

}

async function StaffAdd(request, response){

    shelter = await sheltedit.GetAllShelter();
    response.render('staff_create_view', {'shelter': shelter});
}

async function StaffFinishAdd(request, response){

    await staffedit.CreateStaff(request.body.staff_name, request.body.staff_email, request.body.staff_working_hours, request.body.staff_task, request.body.staff_shelter, request.body.staff_password)
    response.redirect('/edit/staff/list');
}

async function StaffDel(request, response) {
    response.render('staff_delete_view');
    
}

async function StaffFinishDel(request, response){
    await staffedit.DelStaff(request.body.staff_id)
    response.redirect('/edit/staff/list')
}

async function StaffUpdate(request, response){

    shelter = await sheltedit.GetAllShelter();

    response.render('staff_update_view', {'shelter': shelter})
}

async function StaffFinishUpdate (request, response) {
    await staffedit.UpdateStaff(request.body.staff_id, request.body.staff_email, request.body.staff_working_hours, request.body.staff_task, request.body.staff_shelter, request.body.staff_password);
    response.redirect('/edit/staff/list')
}

async function shelterListeAction(request,response){
    shelter = await sheltedit.GetAllShelter();
    response.render('shelter_list_view', { "shelter": shelter});
}

async function ShelterAdd(request,response){
    
    response.render('shelter_create_view', {})
}

async function ShelterFinishAdd(request,response) {
    
    await sheltedit.CreateShelter(request.body.shelter_grade,request.body.shelter_equipment, request.body.shelter_nbr_max_of_pets, request.body.shelter_size, request.body.shelter_location)
    response.redirect('/edit/shelter/list');
    
}

async function ShelterDel(request,response){

    response.render('shelter_delete_view')
}

async function ShelterFinishDel(request, response){
    await sheltedit.DelShelter(request.body.shelter_id)
    response.redirect('/edit/shelter/list')
}

async function ShelterUpdate(request, response) {
    
    response.render('shelter_update_view')
    
}

async function ShelterFinishUpdate(request, response) {
    
    await sheltedit.UpdateShelter(request.body.shelter_id, request.body.shelter_grade,request.body.shelter_equipment, request.body.shelter_nbr_max_of_pets, request.body.shelter_size)
    response.redirect('/edit/shelter/list')
}


module.exports = router;