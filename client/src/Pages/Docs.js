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
                    <p className='paragraph'>
                        Gittrack allows instructors to keep track of the commit statistics of their class and view trends over time. This grants instructors a deeper insight on the progress of their students and will inform them if they must make adjustments to the instructional plan.
                        <br />
                        <br />

                        Gittrack utilizes the <a target="_blank" rel='noopener noreferrer' href='https://github-contributions.now.sh/'>github-contributions API</a> to allow instructors to utilize student's github usernames to receive their commit history.
                    </p>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Demo</h3>
                    <p className='paragraph'>
                        If you would lilke to demo the site, here are login credentials to view a test instructor account.

                        <br />
                        <br />

                        Login Credentials:
                        <br />
                        Email: danielchicchon@gmail.com
                        <br />
                        Password: daniel
                    </p>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Usage</h3>
                    <p className='paragraph'>
                        {/* Have a gif here so they understand */}
                    </p>
                    <br />
                    <h3 style={{ textAlign: "center" }}>Stretch Goals</h3>
                    <p className='paragraph'>
                        {/* Have a gif here so they understand */}
                    </p>
                </div>

                {/* What you can do with this application */}
                {/* Future goals */}
            </div>
        )
    }
}

export default Docs;