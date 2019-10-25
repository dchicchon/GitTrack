const db = require("../models");
const axios = require("axios");
const moment = require("moment");

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
    },

    // This will retrieve the users data through an api call and format it appropriately before sending back the data
    // To use this for all components, lets use the students ID to get the username
    getData: (req, res) => {
        db.Student.findOne({
            where: {
                id: req.params.id
            }
        }).then(dbStudent => {
            axios.get(`https://github-contributions-api.now.sh/v1/${dbStudent.dataValues.githubUsername}`)
                .then(student => {

                    let currentDate = moment().format('YYYY-MM-DD');
                    let currentYear = moment(currentDate).year();
                    let currentMonth = moment(currentDate).month();
                    // let currentWeek = moment(currentDate).week();

                    // let thisMonth = currentDate.slice(0, 7);

                    let weeklyContributions = [];
                    let monthlyContributions = [];
                    let yearlyContributions = [];

                    // Sum for the current month
                    // let monthSum = 0;
                    // let studentMonth = 11;

                    let pastWeek = [];

                    // Current Day
                    let dayOfMonth = moment(currentDate).date()
                    for (let x = 0; x < 7; x++) {
                        let dayEntry = dayOfMonth - x
                        pastWeek.push(dayEntry)
                    }

                    let monthSum = 0;
                    let weekSum = 0;
                    let studentMonth = 12;

                    let contributions = student.data.contributions


                    // Iterate through list of contributions
                    // console.log(moment(student.data.contributions[0].date).week())

                    for (let i = 0; i < contributions.length; i++) {

                        // Date for individual contributions
                        let studentDate = contributions[i].date
                        let contributionMonth = moment(studentDate).month();
                        let contributionYear = moment(studentDate).year();
                        let contribution = contributions[i]

                        if (moment(contribution.date).year() == currentYear) {

                            // WEEKLY FILTER
                            // This will get information from the past 7 days
                            // Leverage the current day of the month and gather the previous 7 days
                            // There should be an array of dates of the past 7 days

                            if (pastWeek.includes(moment(studentDate).date()) && contributionMonth === currentMonth && contributionYear === currentYear) {
                                let thisDate = {
                                    date: moment(contribution.date).format("MM/DD"),
                                    count: parseInt(contribution.count)
                                }
                                // console.log(thisDate)
                                weeklyContributions.push(thisDate)
                            }

                            // MONTHLY FILTER
                            // This will include the last 30 days

                            let a = moment(currentDate)
                            let b = moment(studentDate)

                            // Get differences to be less than 31 and greater than 0
                            if (a.diff(b, 'days') <= 30 && a.diff(b, 'days') > 0) {

                                if (a.diff(b, 'days') % 5 == 0) {
                                    let thisWeek = {
                                        date: moment(contribution.date).format("MM/DD"),
                                        count: weekSum
                                    }
                                    monthlyContributions.push(thisWeek)

                                    weekSum = 0
                                } else {
                                    weekSum += contribution.count
                                }
                            }
                            // YEARLY FILTER
                            // Lets have a for loop to count the number of commits per month

                            // If the contribution month no longer equals the student month
                            if ((moment(contribution.date).month() + 1) != studentMonth || i === 364) {

                                let monthName = moment(contributions[i - 1].date).format("MMM")

                                let thisMonth = {
                                    date: monthName,
                                    count: monthSum
                                }

                                monthSum = 0
                                yearlyContributions.push(thisMonth)
                                studentMonth--

                            }
                            // if contribution is equal to this month
                            else {
                                monthSum += contribution.count
                            }
                        }

                    }



                    let newStudent = {
                        color: '#61dafb',
                        name: `${dbStudent.dataValues.firstName} ${dbStudent.dataValues.lastName}`,
                        week: weeklyContributions.reverse(),
                        month: monthlyContributions.reverse(),
                        year: yearlyContributions.reverse()
                    }
                    res.json(newStudent)

                })
        })

    }
}