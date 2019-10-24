import React, { Component } from 'react';
import API from '../Utils/API';

class Settings extends Component {
    state = {
        message: '',
        editFirstName: '',
        editLastName: '',
        editGithubUsername: '',
        editPassword: '',
        editPasswordConfirm: ''
    }

    handleInputChange = event => {
        let { name, value } = event.target;
        this.setState({
            [name]: value
        })
    }

    submitEdit = event => {
        event.preventDefault();
        if (this.state.editPassword === this.state.editPasswordConfirm) {
            let creds = {
                id: this.props.user.id,
                userType: this.props.user.userType,
                editUser: {
                    firstName: this.state.editFirstName,
                    lastName: this.state.editLastName,
                    githubUsername: this.state.editGithubUsername,
                    password: this.state.editPassword,
                }
                // firstName: (this.state.editFirstName ? this.state.editFirstName : this.props.user.firstName),
                // lastName: (this.state.editLastName ? this.state.editLastName : this.props.user.lastName),
                // githubUsername: (this.state.editGithubUsername ? this.state.editGithubUsername : this.props.user.githubUsername),
            }
            console.log(creds)
            API.editAccount(creds)
                .then(res => {
                    console.log("\nReturn Data")
                    console.log(res.data)
                    this.setState({
                        message: 'Your account changes will come into effect on logout',
                        editFirstName: '',
                        editLastName: '',
                        editGithubUsername: '',
                        editPassword: '',
                        editPasswordConfirm: ''
                    })
                })
        } else {
            console.log("Please make sure that the passwords match")
        }

    }
    render() {
        return (
            <div className='container'>
                <h1>Settings</h1>
                {this.state.message ? this.state.message : ''}
                <h5></h5>
                <div className='form-group'>
                    <label htmlFor='editFirstName'>First Name</label>
                    <input className='form-control' onChange={this.handleInputChange} id='editFirstName' name='editFirstName' value={this.state.editFirstName} placeholder={this.props.user.firstName} />
                </div>
                <div className='form-group'>
                    <label htmlFor='editLastName'>Last Name</label>
                    <input className='form-control' onChange={this.handleInputChange} id='editLastName' name='editLastName' value={this.state.editLastName} placeholder={this.props.user.lastName} />
                </div>
                {this.props.user.userType === 'student' ?
                    <div className='form-group'>
                        <label htmlFor='editGithubUsername'>GitHub Username</label>
                        <input placeholder={this.props.user.githubUsername} id='editGithubUsername' className='form-control' name='editGithubUsername' onChange={this.handleInputChange} value={this.state.editGithubUsername} />
                    </div>
                    : ''
                }
                <div className='form-group'>
                    <label htmlFor='editPassword'>Password</label>
                    <input onChange={this.handleInputChange} value={this.state.editPassword} className='form-control' name="editPassword" placeholder='Password' />
                </div>
                <div className='form-group'>
                    <label htmlFor='editPasswordConfirm'>Confirm Password</label>
                    <input placeholder='Confirm Password' onChange={this.handleInputChange} className='form-control' value={this.state.editPasswordConfirm} name='editPasswordConfirm' />
                </div>
                <button type='button' className='btn' onClick={this.submitEdit}>Submit Changes</button>
            </div>
        )
    }
}

export default Settings;