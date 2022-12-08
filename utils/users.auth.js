const passport = require("passport");
const usersRepo = require("../utils/users.repository.js");
const staffrep = require('../utils/staff.managing');
const clientrep = require("../utils/clients.managing")

module.exports = {
  initialization(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
      if (user.role == 'ADMIN'){
        done(null, user.staff_email);
      }else{
        done(null, user.client_email);
      }
      
    });
    passport.deserializeUser(async function (useremail, done) {
      if (useremail.includes('@pet.com')){
        let user = await staffrep.GetOnestaff(useremail);
        done(null, user)
      }
      else{
        let user = await clientrep.GetOneClient(useremail);
        done(null, user);
      }
    });
  },

  checkAuthenticationStaff() {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        
        if (request.user.staff_role === 'ADMIN') { 
          return next();
        } else {
          return response.end("401 Unautorized (bad user level)"); // TODO: Hierarchy
        }
        } else { // No special role needed for page -> next middleware
          return response.redirect("/auth");
        }
    }
  },


  checkAuthenticationClient(){
    return function (request, response, next){
      if (request.isAuthenticated()){
        if (request.user.client_role = 'CLIENT'){
          return next();
        }else{
          return response.end("YOU ARE AN ADMIN NO USE OF USER PAGE");
        }
      }else{
        return response.redirect('/auth');
      }
    }
  },
};