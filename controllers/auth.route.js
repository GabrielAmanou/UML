// controllers/auth.route.js
const { response } = require('express');
const express = require('express');
const router = express.Router();
//const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");

// http://localhost:9000/auth
router.get('/', (req, res) => res.render('auth_view'));
router.get('/sign_up', (req, res) => res.render('sign_up_view'));
router.get('/login', loginPostAction)



async function loginPostAction(request, response) {
    if (body.admin){
        areValid = await userRepo.areValidCredentialsStaff(request.body.username, request.body.userpass);
    }else{
        areValid = await userRepo.areValidCredentialsClient(request.body.username, request.body.userpass);
    }
    
  
    if (areValid) { return response.redirect("/about")
      /*user = await userRepo.getOneUser(request.body.username);
      request.login(user, function (err) { 
          if (err) { console.log("ERROR"); console.log(err); return next(err); }
  
          if (request.user.user_role === "ADMIN") {
              return response.redirect("/auth/admin");
          } else {
              return response.redirect("/auth/user");
          }
      });*/
    } else { return response.redirect("/meet_staff")
      /*response.send("Invalid credentials provided");*/
      // TODO redirect/normal error message
    }
  }


module.exports = router;