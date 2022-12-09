pool = require("../utils/db.js");

module.exports = {

    async Get_Pets_of_Client(pet_owner_id){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT pet_name, pet_specie, pet_age, pet_diet, shelter_location FROM pets INNER JOIN stays_in ON pets.pet_id = stays_in.pet_id INNER JOIN shelter ON stays_in.shelter_id = shelter.shelter_id where pet_owner_id = ?'
            const [rows, fields] = await conn.execute(sql, [ pet_owner_id ]);
            conn.release();
            console.log("Pets FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }

    }



}