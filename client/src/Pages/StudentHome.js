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

        // Graph
        studentData: '',
        dataFormat: 'week',
        showGraph: false,
        weekData: '',
        monthData: '',
        yearData: ''
    }

    componentDidMount() {
        // Get Student commits for this week
        API.getMyData(this.props.user.githubUsername)
            .then(res => {
                if (res.data) {
                    console.log(res.data)
                    let student = res.data
                    let weekSum = 0
                    let monthSum = 0
                    let yearSum = 0

                    for (let j = 0; j < student.week.length; j++) {
                        weekSum += student.week[j].count
                        // weekSum += students[i].weekly[j].count
                    }
                    for (let k = 0; k < student.month.length; k++) {
                        monthSum += student.month[k].count
                    }
                    for (let l = 0; l < student.year.length; l++) {
                        yearSum += student.year[l].count
                    }

                    let weekData = {
                        total: weekSum,
                        average: weekSum / 7
                    }

                    let monthData = {
                        total: monthSum,
                        average: monthSum / 30
                    }

                    let yearData = {
                        total: yearSum,
                        average: yearSum / 12
                    }

                    this.setState({
                        studentData: res.data,
                        showGraph: true,
                        weekData: weekData,
                        monthData: monthData,
                        yearData: yearData
                    })
                } else {
                    console.log("No Data")
                }

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

    changeFormat = event => {
        let { value } = event.target;
        this.setState({
            dataFormat: value
        })

    }

    render() {
        return (
            <div>
                <div className='container'>

                    {/* <h1>Welcome {this.props.user.firstName}</h1> */}

                    {this.state.message ?
                        <Message
                            message={this.state.message}
                            color={this.state.color}
                        />
                        : ''}

                    {/* Edit Github Username is now in settings */}

                    {/* {this.state.editUsername ?
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
                    } */}
                </div>
                {this.state.showGraph ?
                    <div>
                        <div className='container'>

                            <h3>Your Contributions</h3>
                            <h2>Total this {this.state.dataFormat}: {this.state.dataFormat === 'year' ? this.state.yearData.total : ''}{this.state.dataFormat === 'month' ? this.state.monthData.total : ''}{this.state.dataFormat === 'week' ? this.state.weekData.total : ''} </h2>
                            <h2>Average Commits: {this.state.dataFormat === 'year' ? this.state.yearData.average : ''}{this.state.dataFormat === 'month' ? this.state.monthData.average : ''}{this.state.dataFormat === 'week' ? this.state.weekData.average : ''} </h2>

                            <div className='row'>
                                <button type='button' className='btn ml-2' onClick={this.changeFormat} value='week'>Weekly</button>
                                <button type='button' className='btn ml-2' onClick={this.changeFormat} value='month'> Monthly</button>
                                <button type='button' className='btn ml-2' onClick={this.changeFormat} value='year'>Yearly</button>

                            </div>
                        </div>
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
                    :
                    <div className='container'>
                        <h1>"Loading..."</h1>
                    </div>
                }



            </div >
        )
    }
}

export default StudentHome;