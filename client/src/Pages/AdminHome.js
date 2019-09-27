import React, { Component } from 'react';

const AccountModal = function () {

}

const ActivityModal = function () {

}

class AdminHome extends Component {
    state = {
        accountModal: false,
        activityModal: false
    }

    accountControl = () => {
        if (this.state.accountModal) {
            return (this.setState({ accountModal: false }))
        }
        this.setState({
            activityModal: false,
            accountModal: true
        })

    }

    activityControl = () => {
        if (this.state.activityModal) {
            return (this.setState({ activityModal: false }))
        }
        this.setState({
            accountModal: false,    
            activityModal: true
        })
    }


    render() {
        return (
            <div>
                <h1>Welcome Admin</h1>

                {/* Admin should have ability to create Instuctor and Student Accounts */}
                {/* Admin should be able to check the activity on the site */}
                <div>
                    <button className='btn' onClick={this.accountControl}>Create Account</button>
                    <button className='btn' onClick={this.activityControl}>Site Activity</button>
                </div>
                {this.state.accountModal ? 'Account Modal Activated' : ''}
                {this.state.activityModal ? 'Activity Modal Activated' : ''}

            </div>
        )
    }
}

export default AdminHome;