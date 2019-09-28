// Allows us to place keys and sensitive info in hidden .env file
require("dotenv").config();

// Require Packages
const express = require("express");
const app = express();
const db = require("./models");
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session")
const MySQLStore = require("express-mysql-session")(session);

require("./config/passport")(passport)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
let options = {};
if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
    options = {
        host: process.env.HOST,
        port: 3306,
        user: process.env.USER,
        password: process.env.PASSWORD,
        database: process.env.DB
    }
} else {
    options = {
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: process.env.DB_PASSWORD,
        database: 'tracker'
    }
}


// Options for mysql session store

let sessionStore = new MySQLStore(options);

// Pass in mysql session store
app.use(session({
    key: 'surfing_dogs',
    secret: 'surfing_dogs',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());


app.use(routes)

db.sequelize.sync({ force: false }).then(() => {
    let server = app.listen(process.env.PORT || 5000, function () {
        let port = server.address().port;
        console.log(`Server is listening on PORT ${port}`)
    })
})
