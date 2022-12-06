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

    },

    async DelShelter(shelter_id){
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM shelter WHERE shelter_id = ?";
            const [okPacket, fields] = await conn.execute(sql, [ shelter_id ]);  // affectedRows, insertId
            conn.release();
            console.log("DELETE "+JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async CreateShelter(shelter_grade, shelter_equipment, shelter_nbr_max_of_pets, shelter_size, shelter_location){
        try{
            conn = await pool.getConnection();
            sql = 'INSERT into shelter VALUES (NULL, ?, ?, ?, ?, ?)';
            const [okPacket, fields] = await conn.execute(sql, [shelter_grade, shelter_equipment, shelter_nbr_max_of_pets, shelter_size, shelter_location ]);
            conn.release();
            console.log("INSERT "+JSON.stringify(okPacket));
            return 0;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async UpdateShelter(shelter_id,shelter_grade, shelter_equipment, shelter_nbr_max_of_pets, shelter_size,){
        try{
            let conn = await pool.getConnection();
            sql = 'UPDATE shelter SET shelter_grade = ?, shelter_equipment = ?, shelter_nbr_max_of_pets = ?, shelter_size = ? where shelter_id = ?';
            const [okPacket, fields] = await conn.execute(sql, [ shelter_grade, shelter_equipment, shelter_nbr_max_of_pets, shelter_size, shelter_id ]);
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