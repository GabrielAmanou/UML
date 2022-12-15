pool = require("../utils/db.js");

module.exports = {

    async Get_Pets_of_Client(pet_owner_id){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT pets.pet_id, pet_name, pet_specie, pet_age, pet_diet, shelter_location FROM pets INNER JOIN stays_in ON pets.pet_id = stays_in.pet_id INNER JOIN shelter ON stays_in.shelter_id = shelter.shelter_id where pet_owner_id = ?'
            const [rows, fields] = await conn.execute(sql, [ pet_owner_id ]);
            conn.release();
            console.log("Pets FETCHED: "+rows.length);
            console.log(rows)
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }

    },

    async TEST(shelter_id){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT shelter_location, shelter.shelter_id, shelter_nbr_max_of_pets, shelter_equipment, shelter_size, shelter_grade, count(stays_in.shelter_id) as nbr FROM shelter INNER JOIN stays_in ON stays_in.shelter_id=shelter.shelter_id where stays_in.shelter_id = ?'
            const [rows, fields] = await conn.execute(sql, [ shelter_id ]);
            conn.release();
            console.log("Pets FETCHED: "+rows.length);
            return rows[0];
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }

    },

    async countshelter(){

        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT COUNT(*) as c FROM shelter'
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            console.log("Pets FETCHED: "+rows.length);
            return rows[0];
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }

    }



}