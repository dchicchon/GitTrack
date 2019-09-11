# GitHub Activity Tracker
## Summary
This is an app where the administrator of the app can invite instructors. Instructors can then create cohorts that can have many students. Instructors can see the GitHub activity of their students and the cohort as a whole.

## Technologies Used
- React.js
- Node.js
- MySQL
- Express.js
- Passport.js

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
