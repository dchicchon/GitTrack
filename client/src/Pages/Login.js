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
                <h1>Login</h1>
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