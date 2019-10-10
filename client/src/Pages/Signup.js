import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// Utils
import API from '../Utils/API';

class Login extends Component {
    state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }

    handleInputChange = event => {

        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    // This will send a request to the Administrator to create a new account for the user
    handleSignup = event => {
        event.preventDefault();
        let radioArr = document.getElementsByClassName("form-check-input")
        let typeInput = '';
        for (let i = 0; i < radioArr.length; i++) {
            if (radioArr[i].checked === true) {
                typeInput = radioArr[i].value
            }
        }

        console.log(this.state.email);
        console.log(this.state.password);
        if (this.state.email && this.state.password && this.state.password === this.state.passwordConfirm) {
            let creds = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                password: this.state.password,
                type: typeInput
            }

            console.log(creds)
            API.handleSignup(creds)
                .then(res => {
                    this.setState({
                        email: '',
                        password: ''
                    })
                    window.location.href = '/'
                })
                .catch(err => console.log(err))
        } else {
            console.log("You must enter proper login info")
        }
    }

    render() {
        return (
            <div className='container mt-4 mb-5'>
                <h1 className='center'>GitTrack</h1>
                <h2>Sign Up</h2>
                <hr />
                <div className='container'>

                    <form>
                        <div className="form-group">
                            <label htmlFor="firstName">First Name</label>
                            <input value={this.state.firstName} name='firstName' onChange={this.handleInputChange} type="text" className="form-control" id="firstName" placeholder="First Name" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="lastName">Last Name</label>
                            <input value={this.state.lastName} name='lastName' onChange={this.handleInputChange} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input value={this.state.email} name='email' onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input value={this.state.password} name='password' onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" autoComplete="true" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Confirm Password</label>
                            <input value={this.state.passwordConfirm} name='passwordConfirm' onChange={this.handleInputChange} type="password" className="form-control" id="passwordConfirm" placeholder="Password" autoComplete="true" />
                        </div>
                        <fieldset className="form-group types">
                            <div className="row">
                                <legend className="col-form-label col-sm-2 pt-0">Account Type</legend>
                                <div className="col-sm-10">
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
                        </fieldset>

                        <button onClick={this.handleSignup} type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>

                <Link to='/'>Have an account? Login here</Link>
            </div>
        );
    }
}

export default Login;