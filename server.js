/*
cd WEBAPP
mkdir controllers models views
npm init -y
npm install mariadb express express-session body-parser passport dotenv ejs mysql2
>> https://www.npmjs.com/package/body-parser
edit/copy files, then ... node server.js 
*/

/*
const mariadb = require("mariadb");
const pool = mariadb.createPool({
    host: "localhost", user: "root", password: "", database: "carsdb"
});
pool.getConnection().then(function(conn){
    conn.query("SELECT * FROM users").then(function(rows){ delete rows.meta; console.log(rows); });
    conn.query("SELECT * FROM cars").then(function(rows){ delete rows.meta; console.log(rows); process.exit(); });
});
return;
*/
/*
const mysql = require('mysql2/promise');
const conn = mysql.createConnection({
    host:'localhost', user: 'root', database: 'carsdb', password: '', debug: false
});
conn.then(function(conn) {
    conn.execute('SELECT * FROM users').then(function(result){ const [rows, fields]=result; console.log(rows); });
    conn.execute('SELECT * FROM cars').then(function(result){ const [rows, fields]=result; console.log(rows); process.exit(); });
});    
return;
*/

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.listen(process.env.WEB_PORT, '0.0.0.0',
    function() { console.log("Listening on "+process.env.WEB_PORT); }
);

app.get('/', require("./controllers/site.route"))




// MIDDLEWARE REGISTRATIONS
// app.use(callback1, callback2, callback3)
const bodyParser = require("body-parser");
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: true }));

const session = require("express-session");
app.use(session({
    secret: "SecretRandomStringDskghadslkghdlkghdghaksdghdksh",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 }, // 1 day in msec
    resave: false
}));

//const auth = require("./utils/users.auth");
//auth.initialization(app);

// app.use(routeBase, callback);
app.use("/static", express.static(__dirname + '/static'));
app.use("/about", require("./controllers/about.route"));
app.use("/meet_staff", require("./controllers/meet_staff.route"));
app.use("/shelters", require("./controllers/shelters.route"));
app.use("/auth", require("./controllers/auth.route"));
app.use("/edit", require(".controllers/editDatabase.route"))


