import React, { Component } from 'react';

import API from '../Utils/API';

import Message from '../Components/Message';

class StudentHome extends Component {

    state = {
        githubUsername: '',
        message: '',
        color: ''
    }

    // State Change Functions
    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    editGithubUsername = () => {
        console.log("Edit Github Username")
        console.log(this.props.user)
        let creds = {
            id: this.props.user.id,
            githubUsername: this.state.githubUsername
        }
        API.editGithubUsername(creds)
            .then(res => {
                console.log("Updated Github Username")
                console.log(res.data)
                this.setState({
                    message: res.data.message,
                    color: res.data.color
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Welcome Student</h1>

                {this.state.message ?
                    <Message
                        message={this.state.message}
                        color={this.state.color}
                    />
                    : ''}
                <div className='form-group'>
                    <label htmlFor='githubName'>Github Username</label>
                    <input placeholder='Github Username' className='form-control' id='githubName' onChange={this.handleInputChange} value={this.state.githubUsername} name='githubUsername' />
                </div>
                <button type='button' className='btn btn-primary' onClick={this.editGithubUsername}>Edit Github Username</button>
            </div >
        )
    }
}

export default StudentHome;