import React, { Component } from 'react';
import { Link } from 'react-router-dom'

// Components
import Message from '../Components/Message';

// Utils
import API from '../Utils/API';


class Login extends Component {
    state = {

        // Login Creds
        email: '',
        password: '',

        // Message
        message: '',
        color: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleLogin = event => {
        event.preventDefault();
        if (this.state.email && this.state.password) {
            let creds = {
                email: this.state.email,
                password: this.state.password
            }
            API.handleLogin(creds)
                .then(res => {
                    console.log(res.data)
                    if (res.data.color === 'red') {
                        this.setState({
                            message: res.data.message,
                            color: res.data.color
                        })
                    } else {
                        window.location.href = '/'
                    }
                })
                .catch(err => console.log(err))
        } else {
            this.setState({
                message: 'Please fill out all fields',
                color: 'red'
            })
            console.log(this.state.message)
            console.log(this.state.color)

        }
    }

    render() {
        return (
            <div>
                <h1 className="center">GitTrack</h1>
                <h3>Login</h3>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input value={this.state.email} name='email' onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input value={this.state.password} name='password' onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" autoComplete="true" />
                    </div>
                    {/* <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                    </div> */}
                    <fieldset className="form-group types">
                        <div className='row col-sm-10'>
                            <p>I am a...</p>
                        </div>
                        <div className="row">
                            {/* <legend className="col-form-label col-sm-2 pt-0">I am a...</legend> */}
                            <div className="col-sm-10">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="administrator" />
                                    <label className="form-check-label" htmlFor="gridRadios1">Administrator</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios1" value="instructor" />
                                    <label className="form-check-label" htmlFor="gridRadios1">Instructor</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" name="gridRadios" id="gridRadios2" value="student" />
                                    <label className="form-check-label" htmlFor="gridRadios2">Student</label>
                                </div>
                            </div>
                        </div>
                    </fieldset>
                    <Message
                        message={this.state.message}
                        color={this.state.color}
                    />
                    <button onClick={this.handleLogin} type="submit" className="btn btn-primary">Submit</button>
                </form>
                <Link to='/signup'>Don't have an account? Signup here.</Link>
            </div>
        );
    }
}

export default Login;