import React from 'react';

import Message from './Message';

function AccountModal(props) {
    return (

        <div className='container' style={{ width: '50%', border: '1px solid #1b1e22', background: '#202329', padding: '1rem' }}>
            <div className='row'>
                <h1>Create Account</h1>
                <Message
                    message={props.message}
                    color={props.color}
                />
                <div className='close' onClick={props.close}>x</div>

            </div>

            <form>
                <div className='row'>
                    <div className="form-group col-6">
                        <label htmlFor="firstName">First Name</label>
                        <input value={props.firstName} name='firstName' onChange={props.handleInputChange} type="text" className="form-control" id="firstName" placeholder="First Name" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input value={props.lastName} name='lastName' onChange={props.handleInputChange} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-12">
                        <label htmlFor="email">Email address</label>
                        <input value={props.email} name='email' onChange={props.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-12">
                        <label htmlFor="password">Password</label>
                        <input value={props.password} name='password' onChange={props.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" autoComplete="true" />
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-12">
                        <label htmlFor="password">Confirm Password</label>
                        <input value={props.passwordConfirm} name='passwordConfirm' onChange={props.handleInputChange} type="password" className="form-control" id="passwordConfirm" placeholder="Password" autoComplete="true" />
                    </div>
                </div>
                {/* <fieldset className="form-group types">
                    <div className="row">
                        <legend className="col-form-label col-sm-2 pt-0">Account Type</legend>
                        <div className="col-sm-10">
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="admin" />
                                <label className="form-check-label" htmlFor="gridRadios1">Administrator</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="instructor" />
                                <label className="form-check-label" htmlFor="gridRadios2">Instructor</label>
                            </div>
                            <div className="form-check">
                                <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios3" value="student" />
                                <label className="form-check-label" htmlFor="gridRadios3">Student</label>
                            </div>
                        </div>
                    </div>
                </fieldset> */}
                <div className='row'>
                    <button onClick={props.accountCreate} type="submit" className="btn btn-primary col-4 center-signup">Submit</button>
                </div>
            </form>

        </div>
    )
}

export default AccountModal;