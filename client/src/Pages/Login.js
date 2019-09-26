import React, { Component } from 'react';

// Utils

import API from '../Utils/API';


class Login extends Component {
    state = {
        email: '',
        password: ''
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleLogin = event => {
        event.preventDefault();
        console.log(this.state.email);
        console.log(this.state.password);
        if (this.state.email && this.state.password && this.state.password.length > 4) {
            let creds = {
                email: this.state.email,
                password: this.state.password
            }
            API.handleLogin(creds)
                .then(res => {
                    console.log(res.data)
                })
        } else {
            console.log("You must enter proper login info")
        }
    }

    render() {
        return (
            <div>
                <h1>Admin Login</h1>
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
                    <div className="form-group form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Remember Me</label>
                    </div>
                    <button onClick={this.handleLogin} type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Login;