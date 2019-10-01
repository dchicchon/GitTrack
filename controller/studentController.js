const db = require("../models");
module.exports = {
    editGithubUsername: (req, res) => {
        console.log(req.body)
        db.Student.update(
            { githubUsername: req.body.githubUsername },
            {
                where: {
                    id: req.body.id
                }

            }).then(dbStudent => {
                console.log(dbStudent)
                let returnData = {}
                if (dbStudent) {
                    returnData = {
                        message: 'Success',
                        color: 'green'
                    }
                    res.json(returnData)
                } else {
                    returnData = {
                        message: 'Unable to update Github Username',
                        color: 'red'
                    }
                    res.json(returnData)
                }
            })
    }
}