import React, { Component } from 'react';
import { Link } from 'react-router-dom'
// import screenshot1 from '../assets/imgs/gittrack_1.png'
import screenshot2 from '../assets/imgs/screenshot1.png'
// import logo from '../assets/imgs/logo.png'

// Splash Navbar will contain a login and support button
const SplashNav = function () {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="brand-logo" to='/'> GitTrack </Link>
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
                <a className='nav-item' rel='noopener noreferrer' target="_blank" href='https://github.com/dchicchon/GitTrack'>GitHub</a>
            </div>
            <div>
                <Link className='nav-item' to='/login'>Login</Link>
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
                    <div className="container-text">
                        <h1 className="display-4 center">GitTrack</h1>
                        <p className="lead center-small">Keeping you coding</p>
                        {/* <div className='row mx-auto'> */}
                        <Link className='btn new-Link' to='/signup'>Signup</Link>
                        <Link className='btn new-Link' to='/docs'>Docs</Link>
                        {/* </div> */}
                    </div>
                </div>
                <div>

                    <div className='section-card'>

                        <div className='container center-signup p-5'>
                            <h3>Timeline graphs for GitHub Contributions</h3>
                            <img className='responsive-img' src={screenshot2} alt='site screenshot'></img>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default SplashPage;