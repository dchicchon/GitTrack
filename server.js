const express = require("express");
const app = express();
const db = require("./models");
const routes = require("./routes");

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json({}))

app.use(routes)

db.sequelize.sync({ force: false }).then(() => {
    let server = app.listen(process.env.PORT || 5000, function () {
        let port = server.address().port;
        console.log(`Server is listening on PORT ${port}`)
    })
})
