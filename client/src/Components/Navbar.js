import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
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


                </ul>
            </div>

            {/* <li className="nav-item"> */}
            <div className='dropdown show mr-2'>

                {/* having an issue with user prop  */}

                <Link className="btn btn-secondary dropdown-toggle nav-button" to='#' id="dropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {props.user.firstName}
                </Link>
                <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <Link className="dropdown-item" to='/settings'>Settings</Link>
                    {/* <a className="dropdown-item" href="#">Another action</a> */}
                    {/* A divider for styling */}
                    {/* <div className="dropdown-divider"></div> */}
                    {/* <a className="dropdown-item" href="#">Something else here</a> */}
                    <Link className='dropdown-item' to='/' onClick={props.logout}>Logout</Link>
                </div>
            </div>
            {/* </li> */}
        </nav>

    )
}

export default Navbar