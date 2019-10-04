import React, { Component } from 'react';

// Components
import Message from '../Components/Message';
import { VictoryChart, VictoryAxis, VictoryLine, VictoryLabel } from 'victory';

// Utils
import API from '../Utils/API';


class StudentHome extends Component {

    state = {
        editUsername: false,
        githubUsername: '',
        message: '',
        color: '',
        studentData: '',
        dataFormat: 'weekly',
        showGraph: false
    }

    componentDidMount() {
        // Get Student commits for this week
        API.getMyData(this.props.user.githubUsername)
            .then(res => {
                console.log(res.data)
                this.setState({
                    studentData: res.data,
                    showGraph: true
                })
            })
    }

    // State Change Functions
    handleInputChange = event => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    editUsername = () => {
        if (this.state.editUsername) {
            this.setState({
                editUsername: false
            })
        } else {
            this.setState({
                editUsername: true
            })
        }

    }

    submitGithub = () => {
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
                    editUsername: false,
                    message: res.data.message,
                    color: res.data.color
                })
            })
    }

    render() {
        return (
            <div>
                <h1>Welcome {this.props.user.firstName}</h1>

                {this.state.message ?
                    <Message
                        message={this.state.message}
                        color={this.state.color}
                    />
                    : ''}
                {this.state.editUsername ?
                    <div className='form-group'>
                        <label htmlFor='githubName'>Github Username</label>
                        {this.props.user.githubUsername ?
                            <input placeholder={this.props.user.githubUsername} className='form-control' id='githubName' onChange={this.handleInputChange} value={this.state.githubUsername} name='githubUsername' />
                            :
                            <input placeholder='New Github Username' className='form-control' id='githubName' onChange={this.handleInputChange} value={this.state.githubUsername} name='githubUsername' />
                        }
                        <button type='button' className='btn mt-2 mr-2' onClick={this.submitGithub}>Submit Username</button>
                        <button type='button' className='btn mt-2' onClick={this.editUsername}>Close</button>
                    </div> :
                    <button type='button' className='btn mr-2' onClick={this.editUsername}>Edit Github Username</button>
                }
                {this.state.showGraph ?
                    <div>
                        <h3>Your Contributions</h3>
                        <VictoryChart
                            domainPadding={{ y: 20 }}
                            padding={50}
                        >
                            <VictoryAxis
                                axisLabelComponent={<VictoryLabel />}
                                label={this.state.dataFormat}
                                style={{
                                    axisLabel: { fontFamily: 'inherit', letterSpacing: '1px', stroke: 'white', fontSize: 12 },
                                    grid: { stroke: 'lightgrey' },
                                    tickLabels: { fontFamily: 'inherit', letterSpacing: '1px', stroke: '#61dafb ', fontSize: 8 }
                                }}
                            />
                            <VictoryAxis
                                dependentAxis={true}
                                axisLabelComponent={<VictoryLabel />}
                                label={'Number of Commits'}
                                style={{
                                    axisLabel: { fontFamily: 'inherit', letterSpacing: '1px', stroke: 'white', fontSize: 12 },
                                    grid: { stroke: 'lightgrey' },
                                    tickLabels: { fontFamily: 'inherit', letterSpacing: '1px', stroke: '#61dafb ', fontSize: 8 }

                                }}
                            />

                            <VictoryLine
                                interpolation='natural'
                                data={this.state.studentData[`${this.state.dataFormat}`]}
                                x='date'
                                y='count'
                                style={{
                                    data: { stroke: this.state.studentData.color }
                                }}
                            />

                        </VictoryChart>
                    </div>
                    : ""}



            </div >
        )
    }
}

export default StudentHome;