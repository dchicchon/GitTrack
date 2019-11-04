import React from 'react';
import { Link } from 'react-router-dom';

function SplashNav() {
    return (
        <nav className="navbar navbar-expand-lg">
            <Link className="brand-logo" to='/'> GitTrack </Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
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

export default SplashNav;