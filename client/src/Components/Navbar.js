import React from 'react';
import { Link } from 'react-router-dom';

function Navbar(props) {
    return (

        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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


                    {/* <li className="nav-item"> */}
                    {/* <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> */}
                    {/* Dropdown */}
                    {/* </a> */}
                    {/* <div className="dropdown-menu" aria-labelledby="navbarDropdown"> */}
                    {/* <a className="dropdown-item" href="#">Action</a> */}
                    {/* <a class="dropdown-item" href="#">Another action</a> */}
                    {/* <div class="dropdown-divider"></div> */}
                    {/* <a class="dropdown-item" href="#">Something else here</a> */}
                    {/* </div> */}
                    {/* </li> */}
                </ul>
                <Link to='/' onClick={props.logout}>Logout</Link>
            </div>
        </nav>

    )
}

export default Navbar