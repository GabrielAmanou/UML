const passport = require("passport");
const usersRepo = require("../utils/users.repository.js");

module.exports = {
  initialization(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    passport.serializeUser(function (user, done) {
      done(null, user.user_name);
    });
    passport.deserializeUser(async function (username, done) {
      let user = await usersRepo.getOneUser(username);
      done(null, user);
    });
  },

  checkAuthenticationStaff() {
    return function (request, response, next) {
      if (request.isAuthenticated()) {
        
        if (request.user.staff_task === 'Administration' || 'Pets care ') { 
          return next();
        } else {
          return response.end("401 Unautorized (bad user level)"); // TODO: Hierarchy
        }
        } else { // No special role needed for page -> next middleware
          return response.redirect("/auth");
        }
      
    
    }
  }
};