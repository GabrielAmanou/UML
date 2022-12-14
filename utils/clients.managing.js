pool = require("../utils/db.js");

module.exports = {

    async GetAllclients(){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT * FROM client'
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

    async GetOneClient(client_email){
        try{
            let conn = await pool.getConnection();
            let sql = 'SELECT * FROM client where client_email = ?'
            const [rows, fields] = await conn.execute(sql, [ client_email ]);
            conn.release();
            console.log("Client FETCHED: "+rows.length);
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

    async DelClient(client_id){
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM client WHERE client_id = ?";
            const [okPacket, fields] = await conn.execute(sql, [ client_id ]);  // affectedRows, insertId
            conn.release();
            console.log("DELETE "+JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async CreateClient(client_name, client_email, client_password){
        try{
            conn = await pool.getConnection();
            sql = 'INSERT into client VALUES (NULL, ?, ?, ?, ?)';
            const [okPacket, fields] = await conn.execute(sql, [client_name, client_email, client_password, 'CLIENT']);
            conn.release();
            console.log("INSERT "+JSON.stringify(okPacket));
            return 0;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    },

    async UpdateClient(client_id,client_name, client_email, client_password){
        try{
            let conn = await pool.getConnection();
            sql = 'UPDATE client SET client_name = ?, client_email = ?, client_password = ? where client_id = ?';
            const [okPacket, fields] = await conn.execute(sql, [client_name, client_email, client_password, client_id]);
            conn.release();
            console.log("UPDATE "+JSON.stringify(okPacket));
            return okPacket.affectedRows;
        }
        catch (err) {
            console.log(err);
            throw err; 
        }
    }

};

