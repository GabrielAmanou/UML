pool = require("../utils/db.js");


module.exports = {

    async GetAllstaff(){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT * FROM staff'
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
            let conn = await pool.getConnection();
            let sql = 'SELECT MAX(staff_id) FROM staff'
            const [maxid, fiels] = await conn.execute(sql);
            let staff_id = parseInt(maxid[0]) + 1;
            conn.release();
            /*console.log(staff_name);
            console.log(staff_email);
            console.log(staff_working_hours);
            console.log(staff_task);
            console.log(staff_shelter);
            console.log(staff_password);*/
            console.log("Get Max ID : "+ maxid[0]);
            
            conn = await pool.getConnection();
            sql = 'INSERT into staff VALUES (NULL, ?, ?, ?, ?, ?, ?)';
            const [okPacket, fields] = await conn.execute(sql, [staff_name, staff_email, staff_working_hours, staff_task, staff_shelter, staff_password ]);
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