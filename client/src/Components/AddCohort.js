import React from 'react';

function AddCohort({ close, cohortName, handleInputChange, submitCohort }) {
    return (
        <div className='add-modal col-11'>
            <div className='row'>
                <div className='form-group'>
                    <label htmlFor="cohortName">Add Cohort</label>
                    <input className='form-control' id='cohortName' name='cohortName' value={cohortName} onChange={handleInputChange} placeholder='Cohort Name' />
                </div>
                <div className='close' onClick={close}>x</div>
            </div>
            <div className='row'>
                <button type='button' className='btn btn-primary' onClick={submitCohort}>Submit</button>
                {/* <button type='button' className='btn btn-primary' onClick={}>Submit</button> */}

            </div>
        </div>
    )
}

export default AddCohort;