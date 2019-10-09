import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function NoPage() {
    let location = useLocation();
    return (
        <div className='container mt-5'>
            <h3>The Page {location.pathname} you were looking for was not found!</h3>
            <Link to='/'>Return Home</Link>
        </div>
    )
}

export default NoPage;