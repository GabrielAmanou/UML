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
router.get('/client',auth.checkAuthenticationStaff(), (req, res) => res.render('edit_client_view'));
router.get('/pet', auth.checkAuthenticationStaff(), (req, res) => res.render('edit_pet_view'));
router.get('/staff', auth.checkAuthenticationStaff(), (req, res) => res.render('edit_staff_view'));
router.get('/shelter', auth.checkAuthenticationStaff(), (req, res) => res.render('edit_shelter_view'))

async function AuthAction(request, response){
    response.render('edit_view');
}

router.get('/client/list', auth.checkAuthenticationStaff(), clientListAction);
router.get('/client/add', auth.checkAuthenticationStaff(), ClientAdd)
router.post('/client/finishadd', auth.checkAuthenticationStaff(), ClientFinishAdd)
router.get('/client/del', auth.checkAuthenticationStaff(), ClientDel)
router.post('/client/finishdel', auth.checkAuthenticationStaff(), ClientFinishDel)
router.get('/client/update', auth.checkAuthenticationStaff(), ClientUpdate)
router.post("/client/finishupdate", auth.checkAuthenticationStaff(), ClientFinishUpdate)

router.get('/pet/list', auth.checkAuthenticationStaff(), petListeAction)
router.get('/pet/add', auth.checkAuthenticationStaff(), PetAdd)
router.post('/pet/finishadd', auth.checkAuthenticationStaff(), PetFinishAdd)
router.get('/pet/Assign', auth.checkAuthenticationStaff(), PetAssignAction)
router.post('/pet/AssignFinish', auth.checkAuthenticationStaff(), PetAssignFinish)
router.get('/pet/update', auth.checkAuthenticationStaff(), PetUpdate)
router.post('/pet/finishupdate', auth.checkAuthenticationStaff(), Petfinishupdate)
router.get('/pet/del', auth.checkAuthenticationStaff(), Petdelete)
router.post('/pet/delfinish', auth.checkAuthenticationStaff(), Petdelfinish)
router.get('/pet/delass', auth.checkAuthenticationStaff(), Petdelass)
router.post('/pet/delassfinish', auth.checkAuthenticationStaff(), Petdelassfinish)

router.get('/staff/list', auth.checkAuthenticationStaff(), staffListAction)
router.get('/staff/add', auth.checkAuthenticationStaff(), StaffAdd)
router.post('/staff/finishadd', auth.checkAuthenticationStaff(), StaffFinishAdd)
router.get('/staff/del', auth.checkAuthenticationStaff(), StaffDel)
router.post('/staff/finishdel', auth.checkAuthenticationStaff(), StaffFinishDel)
router.get('/staff/update', auth.checkAuthenticationStaff(), StaffUpdate)
router.post('/staff/finishupdate', auth.checkAuthenticationStaff(), StaffFinishUpdate)

router.get('/shelter/list', auth.checkAuthenticationStaff(), shelterListeAction)
router.get('/shelter/add', auth.checkAuthenticationStaff(), ShelterAdd)
router.post('/shelter/finishadd', auth.checkAuthenticationStaff(), ShelterFinishAdd)
router.get('/shelter/del', auth.checkAuthenticationStaff(), ShelterDel)
router.post('/shelter/finishdel', auth.checkAuthenticationStaff(), ShelterFinishDel)
router.get('/shelter/update', auth.checkAuthenticationStaff(), ShelterUpdate)
router.post('/shelter/finishupdate', auth.checkAuthenticationStaff(), ShelterFinishUpdate)



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

    await clientedit.CreateClient(request.body.client_name, request.body.client_email, request.body.client_password);
    response.redirect("/Admin/client/list");
}

async function ClientDel(request, response){

    response.render('client_delete_view')
}

async function ClientFinishDel(request, response){

    await clientedit.DelClient(request.body.client_id)
    response.redirect('/Admin/client/list')
}

async function ClientUpdate(request, response){
    response.render('client_update_view')
}

async function ClientFinishUpdate(request, response){
    
    await clientedit.UpdateClient(request.body.client_id,request.body.client_name, request.body.client_email, request.body.client_password)
    response.redirect('/Admin/client/list')
}

async function PetAdd(request, response){

    response.render('pet_create_view')
}

async function PetFinishAdd(request, response){

    await petedit.CreatePet(request.body.pet_owner_id, request.body.pet_name, request.body.pet_specie, request.body.pet_age, request.body.pet_diet, request.body.shelter_id)
    response.redirect('/Admin/pet/assign')
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
    response.redirect('/Admin/pet/list')
}

async function PetUpdate(request, response){
    response.render ('pet_update_view')
}

async function Petfinishupdate(request, response){

    await petedit.UpdatePet(request.body.pet_id, request.body.pet_specie, request.body.pet_age, request.body.pet_diet);
    response.redirect('/Admin/pet/list');
}

async function Petdelete(request, response){

    response.render('pet_delete_view');

}

async function Petdelfinish(request, response){

    await petedit.DelPet(request.body.pet_id);
    response.redirect('/Admin/pet/list');
}

async function Petdelass(request, response){

    pets = await petedit.GetAllpets();

    response.render('edit_pet_delass', {"pets": pets})
}

async function Petdelassfinish(request, reponse){

    await petedit.Del_Assign_pet(request.body.pet_id);
    reponse.redirect('/Admin/pet/list')
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
    response.redirect('/Admin/staff/list');
}

async function StaffDel(request, response) {
    response.render('staff_delete_view');
    
}

async function StaffFinishDel(request, response){
    await staffedit.DelStaff(request.body.staff_id)
    response.redirect('/Admin/staff/list')
}

async function StaffUpdate(request, response){

    shelter = await sheltedit.GetAllShelter();

    response.render('staff_update_view', {'shelter': shelter})
}

async function StaffFinishUpdate (request, response) {
    await staffedit.UpdateStaff(request.body.staff_id, request.body.staff_email, request.body.staff_working_hours, request.body.staff_task, request.body.staff_shelter, request.body.staff_password);
    response.redirect('/Admin/staff/list')
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
    response.redirect('/Admin/shelter/list');
    
}

async function ShelterDel(request,response){

    response.render('shelter_delete_view')
}

async function ShelterFinishDel(request, response){
    await sheltedit.DelShelter(request.body.shelter_id)
    response.redirect('/Admin/shelter/list')
}

async function ShelterUpdate(request, response) {
    
    response.render('shelter_update_view')
    
}

async function ShelterFinishUpdate(request, response) {
    
    await sheltedit.UpdateShelter(request.body.shelter_id, request.body.shelter_grade,request.body.shelter_equipment, request.body.shelter_nbr_max_of_pets, request.body.shelter_size)
    response.redirect('/Admin/shelter/list')
}


module.exports = router;