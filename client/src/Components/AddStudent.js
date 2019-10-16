import React from 'react';
import { Link } from 'react-router-dom';

function AddStudent({ handleInputChange, inviteMethod, inviteVia, studentEmail, submitStudent }) {


    let btnStyle1 = inviteVia === 'link' ? 'active btn' : 'btn'
    let btnStyle2 = inviteVia === 'email' ? 'active btn' : 'btn'

    return (
        <div className='add-modal col-11 mt-5'>
            <div className='btn-group' role='group' aria-label='Format'>
                <button type='button' className={btnStyle1} onClick={inviteMethod} value='link' >Link</button>
                <button type='button' className={btnStyle2} onClick={inviteMethod} value='email'>Email</button>
            </div >

            {inviteVia === 'link' ?
                <div>
                    <br />
                    <p>Cohort Signup Link</p>
                    <div className='cohort-link'> 
                        <Link to='/'>Link to join cohort</Link>
                    </div>
                </div>
                :
                <div>
                    <div className='row'>
                        <div className="form-group">
                            <label htmlFor="email">Add Email Address</label>
                            <input value={studentEmail} name='studentEmail' onChange={handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                    </div>
                    <button type='button' className='btn btn-primary' onClick={submitStudent}>Submit</button>
                </div>
            }

        </div >
    )
}

export default AddStudent;