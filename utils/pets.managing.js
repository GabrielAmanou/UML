pool = require("../utils/db.js");

module.exports = {

    async GetAllpets(){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT pets.pet_id, pet_owner_id, pet_name, pet_specie, pet_diet, shelter_location FROM pets INNER JOIN stays_in ON pets.pet_id = stays_in.pet_id INNER JOIN shelter ON stays_in.shelter_id = shelter.shelter_id'
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            console.log("Pets FETCHED: "+rows.length);
            return rows;
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },

    async GetOnePet(pet_id){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT pet_id, pet_owner_id, pet_name, pet_specie, pet_diet, shelter_location FROM pets INNER JOIN stays_in ON pets.pet_id = stays_in.pet_id INNER JOIN shelter ON stays_in.shelter_id = shelter.shelter_id  where pet_id = ?'
            const [rows, fields] = await conn.execute(sql, [ pet_id ]);
            conn.release();
            console.log("Pets FETCHED: "+rows.length);
            if (rows.length == 1) {
                return rows[0];
            } else {
                return false;
            }
        }
        catch (err) {
            // TODO: log/send error ... 
            console.log(err);
            throw err; // return false ???
        }
    },

    async DelPet(pet_id){
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM pets WHERE pet_id = ?";
            const [okPacket, fields] = await conn.execute(sql, [ pet_id ]);  // affectedRows, insertId
            conn.release();
            console.log("DELETE "+JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },


    async CreatePet(pet_owner_id, pet_name, pet_specie, pet_age, pet_diet){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT MAX(pet_id) FROM pets'
            const [maxid, fields1] = await conn.execute(sql);
            let pet_id = parseInt(maxid[0] + 1);
            conn.release();
            console.log("Get Max ID : "+ pet_id);

            conn = await pool.getConnection();
            sql = 'INSERT into pets VALUES (?, ?, ?, ?, ?, ?)';
            const [okPacket, fields3] = await conn.execute(sql, [pet_id, pet_owner_id, pet_name, pet_specie, pet_age, pet_diet]);
            conn.release();
            console.log("INSERT "+JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async UpdatePet(pet_id, pet_specie, pet_age, pet_diet){
        try{
            let conn = await pool.getConnection();
            sql = 'UPDATE pets SET pet_specie = ?, pet_age = ?, pet_diet = ? where pet_id = ?';
            const [okPacket, fields] = await conn.execute(sql, [ pet_specie, pet_age, pet_diet, pet_id ]);
            conn.release();
            console.log("UPDATE "+JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async Assign(pet_id, shelter_id){
        try{
            conn = await pool.getConnection();
            sql = 'INSERT INTO stays_in VALUES (?, ?)';
            const [okPacket, fields3] = await conn.execute(sql, [ pet_id, shelter_id ]);
            conn.release;
            console.log('INSERT'+JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async Assignpet(pet_name, shelter_location){
        try{
            let conn = await pool.getConnection();
            sql = 'SELECT pet_id FROM pets where pet_name=?'
            const [p_id, fields1] = await conn.execute(sql, [ pet_name ]);
            conn.release();
            let pet_id = parseInt(p_id[0]);
            console.log("Get ID pet" + p_id[0]);

            conn = await pool.getConnection();
            sql = 'SELECT shelter_id FROM shelter where shelter_name';
            const [s_id, fields2] = await conn.execute(sql, [ shelter_location ]);
            let shelter_id = parseInt(s_id[0]);
            console.log('Get ID shelter' + s_id[0]);

            conn = await pool.getConnection();
            sql = 'INSERT INTO stays_in VALUES (?, ?)';
            const [okPacket, fields3] = await conn.execute(sql, [ pet_id, shelter_id ]);
            conn.release;
            console.log('INSERT'+JSON.stringify(okPacket));
            return okPacket.insertId;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async Del_Assign_pet(pet_id){
        try{
            let conn = await pool.getConnection();
            let sql = 'DELETE FROM stays_in where pet_id = ?';
            const [okPacket, fields2] = await conn.execute(sql, [ pet_id ]);
            conn.release();
            console.log();
            return okPacket.affectedRows;

        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async Get_pet_without_shelter(){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT * FROM pets where pet_id NOT IN (SELECT pet_id FROM stays_in);'
            const [rows, fields] = await conn.execute(sql);
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

