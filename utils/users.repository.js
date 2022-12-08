pool = require("../utils/db.js");

module.exports = {
  /*async getOneUser(username) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT user_id,user_name,user_email,user_role FROM users WHERE user_name = ? "; 
      // must leave out the password+hash
      const [rows, fields] = await conn.execute(sql, [ username ]);
      conn.release();

      if (rows.length == 1) {
        return rows[0];
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },*/
  
  async areValidCredentialsClient(username, password) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM client WHERE client_email = ? and client_password = ? "; 
      // TODO: better salt+pw hash - COLLATE usually not needed
      const [rows, fields] = await conn.execute(sql, [username, password]);
      conn.release();

      if (rows.length == 1 && rows[0].client_email === username) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  },

  async areValidCredentialsStaff(username, password) {
    try {
      let conn = await pool.getConnection();
      let sql = "SELECT * FROM staff WHERE staff_email = ? and staff_password = ? "; 
      // TODO: better salt+pw hash - COLLATE usually not needed
      const [rows, fields] = await conn.execute(sql, [username, password]);
      conn.release();
      console.log('MAIL '+ username);
      console.log('PSW '+ password);

      if (rows.length == 1) {
        console.log('TRUE');
        return true;
      } else {
        console.log('FALSE');
        return false;
      }
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}; 