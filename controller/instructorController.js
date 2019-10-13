const db = require("../models");
const bcrypt = require("bcryptjs");
const Op = require('sequelize').Op;
const moment = require("moment");
const axios = require("axios")




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

    // Get individual student for inspection
    // TO DO: Add filter for yearly
    getStudent: (req, res) => {
        console.log(req.params.id)
        db.Student.findAll({
            where: {
                id: req.params.id
            }
        }).then(dbStudent => {
            console.log("\nStudent")
            console.log("\nDataValues")
            let userName = (dbStudent[0].dataValues.githubUsername)

            // This uses the nested format which segments all dates into objects rather than contributions in an array
            axios.get(`https://github-contributions-api.now.sh/v1/${userName}?format=nested`)
                .then(res2 => {
                    let thisYear = (res2.data.contributions.contributions['2019'])

                    let currentDate = moment().format('YYYY-MM-DD');

                    // Moment gets month number from 0-11 so need to add by 1
                    let currentMonth = moment(currentDate).month() + 1
                    let currentWeek = moment(currentDate).week()

                    let weeklyContributions = [];
                    let monthlyContributions = [];
                    let yearlyContributions = [];

                    // Each Month
                    for (let j in thisYear) {

                        // E.g. thisMonth = 'December || 12'
                        let thisMonth = thisYear[j]
                        let monthSum = 0;

                        console.log("End of month")
                        let endOfMonthNoFormat = moment(thisMonth['1'].date).endOf("month")
                        let endOfMonth = moment(endOfMonthNoFormat).date();

                        // This is the specific number day
                        console.log(endOfMonth)

                        for (let k in thisMonth) {

                            let contribution = thisMonth[k]

                            // For the month, we must add to the monthSum
                            monthSum += contribution.count
                            let formatDate = moment(contribution.date);


                            // This Week Filter
                            if (moment(contribution.date).week() === currentWeek) {
                                let thisDay = {
                                    date: moment(contribution.date).weekday() + 1,
                                    count: contribution.count
                                }
                                weeklyContributions.push(thisDay)
                            }

                            // This Month Filter
                            if (parseInt(j) === currentMonth) {
                                let thisDay = {
                                    date: moment(contribution.date).date(),
                                    count: contribution.count
                                }
                                console.log(thisDay)
                                monthlyContributions.push(thisDay)
                            }

                            // If the contribution date equals the end of the month
                            if (formatDate.date() === endOfMonth) {
                                console.log("\nSum Month Contributions")
                                // let newMom = moment(contribution.date)
                                // console.log(newMom)
                                // console.log(contribution.date)
                                let thisMonth = {
                                    date: k,
                                    count: monthSum
                                }
                                console.log(thisMonth)
                                monthSum = 0
                                yearlyContributions.push(thisMonth)
                            }

                        }
                    }

                    // for (let i = 0; i < thisYear.length; i++) {

                    //     console.log(thisYear[i])
                    //     let thisDate = {
                    //         date: thisYear[i].date,
                    //         count: thisYear[i].count
                    //     }
                    //     console.log(thisDate)

                    //     if (moment(thisDate.date)) {
                    //         weeklyContributions.push(thisDate)
                    //     }

                    //     if (thisDate.date) {
                    //         monthlyContributions.push(thisDate)
                    //     }

                    //     if (moment(thisDate.date)) {
                    //         yearlyContributions.push(thisDate)
                    //     }

                    // }

                    let studentData = {
                        student: dbStudent[0].dataValues,
                        contributions: {
                            week: weeklyContributions,
                            month: monthlyContributions,
                            year: yearlyContributions
                        }
                    }

                    console.log("\nStudent Data")
                    console.log(studentData)
                    res.json(studentData)
                })
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
        let password = req.body.firstName.toLowerCase();
        let passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(8));

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

    removeStudent: (req, res) => {
        console.log("\nParams ID")
        console.log(req.params.id)
        db.CohortStudent.destroy({
            where: {
                studentID: req.params.id
            }
        }).then(dbCohortStudent => {
            console.log("\nStudent Removed")
            console.log(dbCohortStudent)
            res.json(dbCohortStudent)
        })
    },

    getGraph: (req, res) => {
        console.log("\nGet Graph")
        let studentList = req.body.students
        let studentData = [];
        let colors = ['#61dafb', '#f04747', '#ece913', '#ff1493', '#ADFF2F', '#00FA9A', '#F5FFFA']

        for (let i = 0; i < studentList.length; i++) {
            if (studentList[i].githubUsername) {

                // Get Contributions for each student
                axios.get(`https://github-contributions-api.now.sh/v1/${studentList[i].githubUsername}`)
                    .then(student => {

                        // Using moment we get our values for the current date
                        let currentDate = moment().format('YYYY-MM-DD');
                        // let currentYear = parseInt(currentDate.slice(0, 4));
                        let currentYear = moment(currentDate).year();
                        // let currentMonth = moment(currentDate).month();
                        let currentWeek = moment(currentDate).week();
                        // let currentDay = moment(currentDate).date();


                        // Format Data to day count
                        let thisMonth = currentDate.slice(0, 7);

                        let weeklyContributions = [];
                        let monthlyContributions = [];
                        let yearlyContributions = [];

                        let monthSum = 0;

                        // This API always starts from the end of the year, so we will start there as well to get yearly contriubtions
                        let studentMonth = 11;

                        // Iterate through list of contributions
                        for (let j = 0; j < student.data.contributions.length; j++) {

                            let studentDate = student.data.contributions[j].date
                            let monthDate = studentDate.slice(0, 7);

                            // WEEKLY FILTER
                            // This will get all the days from this week
                            if (moment(studentDate).week() === currentWeek && moment(studentDate).weekYear() === currentYear) {
                                let contribution = student.data.contributions[j]
                                console.log(contribution)

                                let thisDate = {
                                    date: parseInt(moment(student.data.contributions[j].date).date()),
                                    count: parseInt(contribution.count)
                                }
                                weeklyContributions.push(thisDate)
                            }

                            // MONTHLY FILTER
                            // If the month is equal to this month of this year
                            if (monthDate == thisMonth) {
                                let thisDate = {
                                    date: parseInt(moment(student.data.contributions[j].date).date()),
                                    count: parseInt(student.data.contributions[j].count)
                                }
                                // console.log(thisDate)
                                monthlyContributions.push(thisDate)
                            }

                            // YEARLY FILTER
                            // Lets have a for loop to count the number of commits per week

                            if (moment(studentDate).year() === currentYear) {
                                let contribution = student.data.contributions[j]
                                monthSum += contribution.count

                                if (moment(contribution.date).month() !== studentMonth || j === 364) {
                                    let thisMonth = {
                                        date: studentMonth,
                                        count: monthSum
                                    }
                                    monthSum = 0
                                    yearlyContributions.push(thisMonth)
                                    studentMonth--
                                }
                                // monthSum += student.data.contributions[j].count

                                // let thisDate = {
                                //     date: parseInt(moment(student.data.contributions[j].date).dayOfYear()),
                                //     count: parseInt(student.data.contributions[j].count)
                                // }
                                // yearlyContributions.push(thisDate)
                            }

                            // This is our user, we want to push this formatted version of the data recieved to our userData array
                        }

                        let newStudent = {
                            author: studentList[i],
                            color: colors[i],
                            week: weeklyContributions,
                            month: monthlyContributions,
                            year: yearlyContributions
                        }

                        console.log(newStudent)

                        studentData.push(newStudent)

                        // At the end of the loop. Scaled to include more users
                        if (studentData.length === studentList.length) {
                            let returnData = {
                                students: studentData
                            }

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

