// controllers/auth.route.js
const { response } = require('express');
const express = require('express');
const router = express.Router();
//const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");
const staffManaging = require('../utils/staff.managing');
const clientManaging = require('../utils/clients.managing')


// http://localhost:9000/auth
router.get('/', (req, res) => res.render('auth_view'));
router.get('/sign_up', (req, res) => res.render('sign_up_view'));
router.post('/login', loginPostAction)



async function loginPostAction(request, response) {

  if (request.body.admin){
    console.log ('checked');
    areValid = await userRepo.areValidCredentialsStaff(request.body.uname, request.body.psw);
    if (areValid){
      user = staffManaging.GetOnestaff(request.body.uname);
      console.log(user);
      request.login(user, function (err){
        if (err) { console.log("ERROR IN request.login"); console.log(err); return next(err); }
        return response.redirect('/Admin')
      })
      
    }
    else {
      response.send("Invalid Username or Password")
    }
  }
  else {
    console.log('not checked');
    areValid = await userRepo.areValidCredentialsClient(request.body.uname, request.body.psw);
    if (areValid){
      user = clientManaging.GetOneClient(request.body.uname);
      request.login(user, function (err){
        if (err) { console.log("ERROR"); console.log(err); return next(err); }
        return response.redirect('/User')
      })
    }
    else{
      response.send("Invalid Username or Password")
    }
  }
}



module.exports = router;