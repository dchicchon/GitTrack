# GitHub Activity Tracker
## Summary
This is an app where the administrator of the app can invite instructors. Instructors can then create cohorts that can have many students. Instructors can see the GitHub activity of their students and the cohort as a whole. Students can see other students stats and the stats of the cohort. You should be able to see the average stats vs yours! 

You can also see your streak!

At the beginning of the day, a Slackbot will post 3 coding challenges for the day

At the end of the day, a SlackBot will post on the activity for each person and for the cohort as a whole. It will also check if a student has coded today. It will also post the solutions for the coding challenge activities.

This should also be a forum, a message board that will have posts/messages on there to indicate whats going on.

Examples: 
- Azzi has been coding for 15 days straight!
- Danny has not been coding for 2 days :(
- Chris has made 15 commits today, wow!

## Technologies Used
- React.js
- Node.js
- MySQL
- Express.js

#### Data Visualization Options
- [Victory](https://formidable.com/open-source/victory/)
- [D3.js](https://d3js.org/)
- [Chart.js](https://www.chartjs.org/) - from what I read, it is easier to implement moment.js
- [Three.js](https://threejs.org/)
<!-- - Passport.js -->
<!-- - Octokit -->

## Steps
### Front End
1. Setup Signup and Login Page
2. Create Utils for client requests
3. Create Main Page where users will be sent on login
4. Add Navigation Bar so that Users can check out their different cohorts or check data

### Back End
1. Create File Structure
2. Setup Basic Server Code and Database Code
3. Create Routes folder for Login and Signup
4. Add Passport.js for Login and Signup
5. Check out Octokit to use GitHub.Api

## Database Relationships
- An Instructor can have many cohorts 
- A cohort can have many students
- A student can belong to many cohorts

## Questions
- Which Data Visualization Package should we use? First we should check the docs for all of them and try using them to figure that out.