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
router.post('/signupfinish', SignUpFinish)
router.post('/login', loginPostAction)



async function SignUpFinish(request, response){
  await clientManaging.CreateClient(request.body.client_name, request.body.client_email, request.body.client_password);
  response.redirect('/auth');
}



async function loginPostAction(request, response) {

  if (request.body.admin){
    console.log ('checked');
    console.log(request.body.psw);
    areValid = await userRepo.areValidCredentialsStaff(request.body.uname, request.body.psw);
    if (areValid){
      user = await staffManaging.GetOnestaff(request.body.uname);
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
    console.log(request.body.uname);
    console.log(request.body.psw);
    areValid = await userRepo.areValidCredentialsClient(request.body.uname, request.body.psw);
    console.log('pass 1')
    if (areValid){
      user = await clientManaging.GetOneClient(request.body.uname);
      console.log(user);
      request.login(user, function (err){
        if (err) { console.log("ERROR here"); console.log(err); return next(err); }
        return response.redirect('/User')
      })
    }
    else{
      response.send("Invalid Username or Password")
    }
  }
}



module.exports = router;