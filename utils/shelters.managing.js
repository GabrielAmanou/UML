pool = require("../utils/db.js");

module.exports = {

    async GetAllShelter(){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT * FROM shelter'
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

    }



}