let db = require("../models")
let bcrypt = require('bcryptjs')
module.exports = {

    // Here I want to have a switch case depending on the type of account
    // I also need to bring in bcrypt to allow the changing of passwords
    editAccount: (req, res) => {
        console.log("\nRequest Body")
        console.log(req.body)
        let passwordHash = ''


        let query = {}
        console.log("\nObject Loop")
        for (let i in req.body.editUser) {
            console.log(i)
            if (req.body.editUser[i] !== '') {
                if (i === 'password') {
                    passwordHash = bcrypt.hashSync(req.body.editUser[i], bcrypt.genSaltSync(8));
                    query[i] = passwordHash

                }
                else {
                    query[i] = req.body.editUser[i]
                }
            }
        }
        console.log("\nQuery")
        console.log(query)

        switch (req.body.userType) {
            case "administrator":
                db.Administrator.update(
                    query,
                    {
                        where: {
                            id: req.body.id
                        }
                    }
                ).then(dbAdmin => {
                    console.log(dbAdmin)
                    res.json(dbAdmin)
                })
                break;
            case "instructor":
                db.Instructor.update(
                    query,
                    {
                        where: {
                            id: req.body.id
                        }
                    }
                ).then(dbInstructor => {
                    console.log(dbInstructor);
                    res.json(dbInstructor)
                })
                break;
            case "student":
                db.Student.update(
                    query,
                    {
                        where: {
                            id: req.body.id
                        }
                    }
                ).then(dbStudent => {
                    console.log(dbStudent)
                    res.json(dbStudent)
                })
                break
        }
    }

}
