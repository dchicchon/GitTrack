// Allows us to place keys and sensitive info in hidden .env file
require("dotenv").config();

// Require Packages
const express = require("express");
const app = express();
const db = require("./models");
const routes = require("./routes");
const passport = require("passport");
const session = require("express-session")

require("./config/passport")(passport)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
}

app.use(session({
    secret: 'surfing dogs',
    resave: true,
    saveUninitialized: true
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
