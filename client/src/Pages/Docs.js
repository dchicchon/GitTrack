import React, { Component } from 'react';
import SplashNav from '../Components/SplashNav';

// Insert readme here
class Docs extends Component {
    render() {
        return (
            <div>
                <SplashNav />
                <div style={{ justifyContent: 'center' }} className='container mt-3'>
                    {/* Summary of application */}
                    <h1 style={{ textAlign: 'center' }}>Welcome to Gittrack</h1>
                    <br />
                    <h3 style={{ textAlign: 'center' }}>Summary</h3>
                    <section className='paragraph'>
                        Gittrack allows instructors to keep track of the commit statistics of their class and view trends over time. This grants instructors a deeper insight on the progress of their students and will inform them if they must make adjustments to the instructional plan.
                        <br />
                        <br />

                        Gittrack utilizes the <a target="_blank" rel='noopener noreferrer' href='https://github-contributions.now.sh/'>github-contributions API</a> to allow instructors to utilize student's github usernames to receive their commit history.
                    </section>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Demo</h3>
                    <section className='paragraph'>
                        If you would lilke to demo the site, here are login credentials to view a test instructor account.

                        <br />
                        <br />

                        Login Credentials:
                        <br />
                        Email: danielchicchon@gmail.com
                        <br />
                        Password: daniel
                    </section>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Usage</h3>
                    <section className='paragraph'>
                        {/* Have a gif here so they understand */}
                        <h4>Instructors</h4>
                        <h5>Create Cohort</h5>
                        <p>&nbsp;To create a new cohort, click on the + button next to the Cohorts Tab</p>
                        <h5>Add Students</h5>
                        <p>&nbsp;To add students, click on the + button next to the Students Tab. This will reveal a link and an email button. You can invite a student to your cohort via this link or by sending them an email invite </p>
                        <br />

                        <h4>Students</h4>

                    </section>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Stretch Goals</h3>
                    <section className='paragraph'>
                        <p>&nbsp;Here are a list of updates that I would like to add to the application</p>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </section>
                </div>

            </div>
        )
    }
}

export default Docs;