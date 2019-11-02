import React from 'react';

import Message from './Message';


// This will have many tabs that will display depending on what I click

function newTab(event, accountType) {
    console.log(event.target)
    console.log(accountType)
}

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

            </div >


            {/* Tab Links */}
            <div className='tab'>
                <button className='tablink' onClick={() => newTab()}>Administrator</button>
                <button className='tablink' onClick={() => newTab()}>Instructor</button>
                <button className='tablink' onClick={() => newTab()}>Student</button>

            </div>

            {/* Tab Content */}

            {/* Form should mostly stay the same? Except for students */}
            <form>
                <div className='row'>
                    <div className="form-group col-6">
                        <label htmlFor="firstName">First Name</label>
                        <input value={props.firstName} name='firstName' onChange={props.handleInputChange} type="text" className="form-control" id="firstName" placeholder="First Name" />
                    </div>
                    <div className="form-group col-6">
                        <label htmlFor="lastName">Last Name</label>
                        <input value={props.lastName} name='lastName' onChange={props.handleInputChange} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                    </div>
                </div>
                <div className='row'>
                    <div className="form-group col-12">
                        <label htmlFor="email">Email address</label>
                        <input value={props.email} name='email' onChange={props.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
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
                <div className='row'>
                    <button onClick={props.accountCreate} type="submit" className="btn btn-primary col-4 center-signup">Submit</button>
                </div>
            </form>

        </div >
    )
}

export default AccountModal;