import React from 'react';

function AddStudent({ handleInputChange, studentEmail, submitStudent }) {
    return (
        <div className='form-horizontal col-12 mt-3'>
            <div className='row'>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input value={studentEmail} name='studentEmail' onChange={handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                </div>
            </div>
            <button type='button' className='btn btn-primary' onClick={submitStudent}>Submit</button>
        </div>
    )
}

export default AddStudent;