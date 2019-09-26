import React, { Component } from 'react';

// Utils


class Login extends Component {
    state = {
        email: null,
        passsword: null
    }

    handleInputChange = event => {
        const { value, name } = event.target;
        this.setState({
            [name]: value
        })
    }

    handleLogin = () => {
        console.log(this.state.email);
        console.log(this.state.passsword);


    }

    render() {
        return (
            <div className='container' >
                <h1>Login</h1>
                <form>
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input value={this.state.email} onChange={this.handleInputChange} type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                        {/* <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small> */}
                    </div>
                    <div className="form-group">
                        <label htmlFor="passsword">Password</label>
                        <input value={this.state.passsword} onChange={this.handleInputChange} type="password" className="form-control" id="password" placeholder="Password" />
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