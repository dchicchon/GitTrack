import React from 'react';

function AddCohort({ cohortName, handleInputChange, submitCohort }) {
    return (
        <div className='form-horizontal col-12 mt-3'>
            <div className='row'>
                <div className='form-group'>
                    <label htmlFor="cohortName">Cohort Name</label>
                    <input className='form-control' id='cohortName' name='cohortName' value={cohortName} onChange={handleInputChange} placeholder='Cohort Name' />
                </div>
            </div>
            <button type='button' className='btn btn-primary' onClick={submitCohort}>Submit</button>
        </div>
    )
}

export default AddCohort;