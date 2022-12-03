// controllers/editDatabase.route.js
const express = require('express');
const router = express.Router();
const clientedit = require ('../utils/clients.managing')

// http://localhost:9000/edit
router.get('/', (req, res) => res.render('edit_view'));
router.get('/client', (req, res) => res.render('edit_client_view'));
router.get('/pet', (req, res) => res.render('edit_pet_view'));
router.get('/client/list', clientListAction);


async function clientListAction(request, response){
    var clients = await clientedit.GetAllclients();

    
    response.render("edit_client_list", { "clients": clients });
}


module.exports = router;