pool = require("../utils/db.js");


module.exports = {

    async GetAllstaff(){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT staff_id, staff_name, staff_email, staff_working_hours, staff_task, staff_password, shelter_location FROM staff INNER JOIN shelter ON staff_shelter=shelter_id'
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            console.log("Client FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },

    async GetOnestaff(staff_email){
        try {
            let conn = await pool.getConnection();
            let sql = 'SELECT * FROM staff WHERE staff_email = ?';
            const [rows, fields] = await conn.execute(sql, [ staff_email ]);
            conn.release();
            console.log('client fetched: '+ rows.length);
            return rows[0];
        }
        catch (err){
            console.log(err);
            throw err;
        }
        
    },

    async DelStaff(staff_id){
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM staff WHERE staff_id = ?";
            const [okPacket, fields] = await conn.execute(sql, [ staff_id ]);  // affectedRows, insertId
            conn.release();
            console.log("DELETE "+JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },
    
    async CreateStaff(staff_name, staff_email, staff_working_hours, staff_task, staff_shelter, staff_password){
        try{
            conn = await pool.getConnection();
            sql = 'INSERT into staff VALUES (NULL, ?, ?, ?, ?, ?, ?, ?)';
            const [okPacket, fields] = await conn.execute(sql, [staff_name, staff_email, staff_working_hours, staff_task, staff_shelter, staff_password, 'ADMIN' ]);
            conn.release();
            console.log("INSERT "+JSON.stringify(okPacket));
            return 0;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    
    async UpdateStaff(staff_id, staff_email, staff_working_hours, staff_task, staff_shelter, staff_password){
        try{
            let conn = await pool.getConnection();
            let sql = 'UPDATE staff SET staff_email = ?, staff_working_hours = ?, staff_task = ?, staff_shelter = ?, staff_password = ? where staff_id = ?';
            const [okPacket, fields] = await conn.execute(sql, [ staff_email, staff_working_hours, staff_task, staff_shelter, staff_password, staff_id ]);
            conn.release();
            console.log("UPDATE "+JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }

}