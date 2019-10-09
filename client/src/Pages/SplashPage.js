import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Splash Navbar will contain a login and support button
const SplashNav = function () {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="brand-logo" to='/'> GitTrack</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                    <li className="nav-item">

                        {/* <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a> */}
                    </li>
                    <li className="nav-item">
                        {/* <a className="nav-link" href="#">Link</a> */}
                    </li>
                    <li className='nav-item'>
                    </li>


                </ul>
            </div>
            <div>
                <Link className='btn' to='/login'>Login</Link>
            </div>

        </nav>
    )
}

class SplashPage extends Component {
    state = {

    }

    render() {
        return (
            <div>
                <SplashNav />
                <div className="jumbotron jumbotron-fluid">
                    <div className="container">
                        <h1 className="display-4 center">GitTrack</h1>
                        <p className="lead center-small">Keeping you coding</p>
                        <button className='btn mx-auto'><Link className='new-Link' to='/login'>Signup</Link></button>
                    </div>
                </div>
                <div>

                    <div className='container'>
                    </div>
                    <div className='section-card'>
                        <h3>Timeline graphs for GitHub Contributions</h3>
                    </div>
                </div>
            </div>
        )
    }
}

export default SplashPage;