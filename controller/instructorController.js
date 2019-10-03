const db = require("../models");
const bcrypt = require("bcryptjs");
const Op = require('sequelize').Op;
const moment = require("moment");
const axios = require("axios")

// Using moment we get our values for the current date
let currentDate = moment().format('YYYY-MM-DD');
// let currentYear = parseInt(currentDate.slice(0, 4));
let currentYear = moment(currentDate).year();
let currentMonth = moment(currentDate).month();
let currentWeek = moment(currentDate).week();
let currentDay = moment(currentDate).date();

let colors = ['#61dafb', '#f04747', '#ece913']


module.exports = {

    getCohorts: (req, res) => {
        console.log(req.params.id)
        db.Cohort.findAll({
            where: {
                InstructorId: req.params.id
            }
        }).then(dbCohort => {
            console.log("\nCohorts Recieved")
            console.log(dbCohort)
            res.json(dbCohort)
        })
    },

    createCohort: (req, res) => {
        console.log("\nCreate Cohort")
        console.log(req.body)
        db.Cohort.create({
            name: req.body.name,
            numberStudents: req.body.numberStudents,
            InstructorId: req.body.InstructorId
        })
            .then(dbCohort => {
                console.log("\nCohort Created")
                res.json(dbCohort)
            })
    },

    // Get the students from the cohort
    getStudents: (req, res) => {
        console.log("\nGet Students")
        console.log(req.params.id)
        db.CohortStudent.findAll({
            where: {
                cohortID: req.params.id
            }
        }).then(dbCohortStudent => {
            // console.log(dbCohortStudent)
            console.log("\nRow Datavalues")
            let studentID = []
            for (let i = 0; i < dbCohortStudent.length; i++) {
                // console.log(dbCohortStudent[i].dataValues)
                studentID.push(dbCohortStudent[i].dataValues.studentID)
            }
            console.log(studentID)
            if (studentID.length === 0) {
                res.json(studentID)
            } else {
                db.Student.findAll({
                    where: {
                        id: {
                            [Op.or]: studentID
                        }
                    }
                }).then(dbStudentList => {
                    console.log(dbStudentList)
                    res.json(dbStudentList)
                })
            }

        })
    },

    // When we create a student we also want to add their ID and the cohort ID to the Student-Cohort Table for the relation
    createStudent: (req, res) => {
        console.log(req.body)
        let passwordHash = bcrypt.hashSync(req.body.firstName, bcrypt.genSaltSync(8));

        db.Student.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: passwordHash,
            userType: 'student'
        }).then(dbStudent => {
            console.log("\nNew Student")
            console.log(dbStudent)

            db.CohortStudent.create({
                cohortID: req.body.cohortID,
                studentID: dbStudent.dataValues.id
            }).then(dbCS => {
                console.log("\nNew Cohort-Student Entry")
                console.log(dbCS)
                res.json(dbStudent)
            })
        })

    },

    getGraph: (req, res) => {
        console.log("\nGet Graph")
        let studentList = req.body.students
        let studentData = [];
        for (let i = 0; i < studentList.length; i++) {
            if (studentList[i].githubUsername) {

                axios.get(`https://github-contributions-api.now.sh/v1/${studentList[i].githubUsername}`)
                    .then(student => {
                        // Format Data to day count
                        let weeklyContributions = [];
                        let monthlyContributions = [];
                        let yearlyContributions = [];
                        let thisMonth = currentDate.slice(0, 7);

                        let monthNow = 0;
                        let monthSum = 0;
                        // let endOfMonth = moment(userDate)
                        // Iterate through list of contributions
                        for (let i = 0; i < student.data.contributions.length; i++) {
                            let studentDate = student.data.contributions[i].date
                            let monthDate = studentDate.slice(0, 7);

                            // WEEKLY FILTER
                            // This will get all the days from this week
                            if (moment(studentDate).week() === currentWeek && moment(studentDate).weekYear() === currentYear && moment(studentDate).month() === currentMonth) {
                                let thisDate = {
                                    date: parseInt(moment(student.data.contributions[i].date).date()),
                                    count: parseInt(student.data.contributions[i].count)
                                }
                                weeklyContributions.push(thisDate)
                            }

                            // MONTHLY FILTER
                            // If the month is equal to this month of this year
                            if (monthDate == thisMonth) {
                                let thisDate = {
                                    date: parseInt(moment(student.data.contributions[i].date).date()),
                                    count: parseInt(student.data.contributions[i].count)
                                }
                                // console.log(thisDate)
                                monthlyContributions.push(thisDate)
                            }

                            // YEARLY FILTER
                            // Lets have a for loop to count the number of commits per week
                            if (moment(studentDate).weekYear() === currentYear) {

                                monthSum += student.data.contributions[i].count

                                let thisDate = {
                                    date: parseInt(moment(student.data.contributions[i].date).dayOfYear()),
                                    count: parseInt(student.data.contributions[i].count)
                                }
                                yearlyContributions.push(thisDate)
                            }
                        }

                        // This is our user, we want to push this formatted version of the data recieved to our userData array
                        let newStudent = {
                            author: studentList[i],
                            color: colors[i],
                            weekly: weeklyContributions,
                            monthly: monthlyContributions,
                            yearly: yearlyContributions
                        }

                        console.log("\nNew Student")
                        console.log(newStudent)

                        // console.log("\n", newUser)

                        studentData.push(newStudent)

                        // At the end of the loop. Scaled to include more users
                        if (studentData.length === studentList.length) {
                            let returnData = {
                                students: studentData
                            }

                            console.log("\nReturn Data")
                            res.json(returnData)
                        }
                    })

            } else {
                console.log("\nNo Github Username")
                console.log(studentList[i])
            }
        }

    }

}