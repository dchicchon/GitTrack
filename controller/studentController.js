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
    getData: (req, res) => {
        console.log("\nGet Data")
        console.log(req.params.username)
        axios.get(`https://github-contributions-api.now.sh/v1/${req.params.username}`)
            .then(student => {


                let currentDate = moment().format('YYYY-MM-DD');
                let currentYear = moment(currentDate).year();
                // let currentMonth = moment(currentDate).month();
                let currentWeek = moment(currentDate).week();
                // let currentDay = moment(currentDate).date();

                let thisMonth = currentDate.slice(0, 7);

                let weeklyContributions = [];
                let monthlyContributions = [];
                let yearlyContributions = [];

                // Sum for the current month
                let monthSum = 0;
                let studentMonth = 11;

                // let weekSum = 0;
                // let studentWeek = 52;

                // console.log(student)

                // Iterate through list of contributions
                // console.log(moment(student.data.contributions[0].date).week())

                for (let i = 0; i < student.data.contributions.length; i++) {
                    // Date for individual contributions


                    let studentDate = student.data.contributions[i].date;


                    // Only get the month e.g. '2019/09' is 7 characters
                    let monthDate = studentDate.slice(0, 7);

                    // WEEKLY FILTER
                    // Condition is specifying this week in terms of this Year, and the current week for the year i.e. the current week === 32 which is the 32nd week of the year

                    if (moment(studentDate).week() === currentWeek && moment(studentDate).weekYear() === currentYear) {
                        let contribution = student.data.contributions[i]
                        console.log(contribution)
                        let thisDate = {
                            date: parseInt(moment(student.data.contributions[i].date).date()),
                            count: parseInt(contribution.count)
                        }
                        weeklyContributions.push(thisDate)
                    }

                    // Monthly Filter
                    // If our month is equal to the contributions date
                    if (monthDate === thisMonth) {
                        let contribution = student.data.contributions[i]
                        let thisDate = {
                            date: parseInt(moment(student.data.contributions[i].date).date()),
                            count: parseInt(contribution.count)
                        }
                        monthlyContributions.push(thisDate)
                    }

                    // Yearly Filter
                    // We can choose between putting the sum counts on weeks or months
                    // E.g. January had 43 commits, February had 83 
                    // OR Week 1: 10 commits, Week 2: 23 commits, Week 3: 13 commits
                    // Currently this grabs every individual date this year.
                    if (moment(studentDate).year() === currentYear && moment(studentDate).week() > 1) {
                        let contribution = student.data.contributions[i]
                        monthSum += contribution.count
                        // weekSum += contribution.count

                        // If the contribution month is no longer equal to the student month, we will change its value
                        // Current Bug: Does not include the month of January

                        // if (moment(contribution.date).week() !== studentWeek) {
                        //     let thisWeek = {
                        //         date: studentWeek,
                        //         count: weekSum
                        //     }
                        //     console.log(thisWeek)
                        //     weekSum = 0;

                        //     yearlyContributions.push(thisWeek)
                        //     studentWeek--
                        // }

                        if (moment(contribution.date).month() !== studentMonth || i === 364) {
                            let thisMonth = {
                                date: studentMonth,
                                count: monthSum
                            }
                            monthSum = 0
                            yearlyContributions.push(thisMonth)
                            studentMonth--
                        }
                    }

                }

                let newStudent = {
                    color: '#61dafb',
                    week: weeklyContributions,
                    month: monthlyContributions,
                    year: yearlyContributions
                }
                res.json(newStudent)
                // }

            })

    }
}