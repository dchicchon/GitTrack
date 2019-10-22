import React, { Component } from 'react';

import { Link } from 'react-router-dom';

// Utils
import API from '../Utils/API';


class CohortSignup extends Component {
    state = {
        firstName: '',
        lastName: '',
        githubUsername: '',
        cohortName: '',
        email: '',
        password: '',
        passwordConfirm: ''
    }

    // Gets the cohort signup
    componentDidMount() {
        const { id } = this.props.match.params
        API.getCohortInfo(id)
            .then(res => {
                this.setState({
                    cohortName: res.data.name
                })
                console.log(this.state.cohortName)
            })
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

        if (this.state.email && this.state.password && this.state.password === this.state.passwordConfirm) {
            let creds = {
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                email: this.state.email,
                githubUsername: this.state.githubUsername,
                password: this.state.password,
                type: 'student'
            }

            API.handleSignup(creds)
                .then(res => {
                    this.setState({
                        email: '',
                        password: '',
                        githubUsername: ''
                    })
                    window.location.href = '/login'
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
                <div className='container col-6 mx-auto'>
                    <h2 className='col-6'>Sign Up</h2>
                    <form>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label htmlFor="firstName">First Name</label>
                                <input value={this.state.firstName} name='firstName' onChange={this.handleInputChange} type="text" className="form-control" id="firstName" placeholder="First Name" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="lastName">Last Name</label>
                                <input value={this.state.lastName} name='lastName' onChange={this.handleInputChange} type="text" className="form-control" id="lastName" placeholder="Last Name" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-12">
                                <label htmlFor="email">Email address</label>
                                <input value={this.state.email} name='email' onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-12">
                                <label htmlFor="githubUsername">GitHub Username</label>
                                <input value={this.state.githubUsername} name='githubUsername' onChange={this.handleInputChange} type="text" className="form-control" id="githubUsername" placeholder="eg. OctoGuy94" />
                                {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label htmlFor="password">Password</label>
                                <input value={this.state.password} name='password' onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" autoComplete="true" />
                            </div>
                            <div className="form-group col-6">
                                <label htmlFor="password">Confirm Password</label>
                                <input value={this.state.passwordConfirm} name='passwordConfirm' onChange={this.handleInputChange} type="password" className="form-control" id="passwordConfirm" placeholder="Password" autoComplete="true" />
                            </div>
                        </div>

                        <div className='row col-6'>
                            <button onClick={this.handleSignup} type="submit" className="btn col-6">Submit</button>
                        </div>
                    </form>
                </div>

            </div>
        );
    }
}

export default CohortSignup;