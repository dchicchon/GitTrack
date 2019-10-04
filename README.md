# GitTrack

## Current Goals

#### Admin
- Admin can create cohorts and assign them to instructors and students

- Admin can reset passwords for users

#### Instructors

- Instructors can send messages to their students via a forum. This will be in the form of an additional page that will be a message board for students *or* on the same home page for students

#### Students
- Students can see their progress and check their percentile compared to the cohort as a whole.

#### General
- Users can view the graph in different time filters (weekly, monthly, yearly)

- Users can change their account settings such as password and email to use

## Done

#### Admin
- Admins can create users with different types such as other admins, instructors and students

- Admins can see a list of users that are in the database

#### Instructor
- Instructor can invite students to cohort

- Instructor can track the progress of individual students and compare them to each other on a graph

- Instructor can create many cohorts that have many students assigned to them

- Instructors can create cohorts

## Clone Instructions
- On clone of this application, you must create an administrator so that they can create accounts for other admins, instructors, and students. To do this, I have created a Signup Page where you can create an admin in the app. Once you have created an admin, go ahead and either turn off routing for the signup page or delete it.


## Stretch Goals

- Use UUID to give unique ids to all users

- Instead of a separate table of admins, maybe allow a specific admin login? 

```javascript
// In Auth Route
if (req.body.email === 'admin@gmail.com' && req.body.password ==='adminPassword') {
    AdminLogin(creds)
}
```


- On Page Load, the root route should redirect the user to the appropriate page. Currently, the root route directs the user to the login page on load.

- Check out other API's that give information about user time coding. Currently the API that we are using can only track the number of commits per day whereas tracking coding time we believe is more crucial. E.g. Wakatime allows you to see your time spent coding and the languages used

- On account creation, email the user their login credentials and a link to the site

## Efficiency
- Once MVPs are complete, make functions more efficient such as Components and SQL Queries