import React, { Component } from 'react';

// Components
// import Message from '../Components/Message';
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
        dataFormat: 'month',
        showGraph: false,
        weekData: '',
        monthData: '',
        yearData: '',
        loading: true
    }

    componentDidMount() {
        // Student Home should be checking the params to return back an id for data
        // Get Student commits for this week

        let { id } = this.props.user || this.props.match.params
        API.getMyData(id)
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
                        average: (weekSum / 7).toFixed(2)
                    }

                    let monthData = {
                        total: monthSum,
                        average: (monthSum / 30).toFixed(2)
                    }

                    let yearData = {
                        total: yearSum,
                        average: (yearSum / 12).toFixed(2)
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
            <div className='mt-3'>

                {/* Make columns */}

                {this.state.showGraph ?

                    <div>
                        <div className='home-container'>
                            <div className='row'>

                                <div className='col-3'>
                                    <h3>{this.state.studentData.name}</h3>
                                    <h4>Contributions</h4>
                                    <p>Total this {this.state.dataFormat}: {this.state.dataFormat === 'year' ? this.state.yearData.total : ''}{this.state.dataFormat === 'month' ? this.state.monthData.total : ''}{this.state.dataFormat === 'week' ? this.state.weekData.total : ''} </p>
                                    <p>Average Commits: {this.state.dataFormat === 'year' ? this.state.yearData.average : ''}{this.state.dataFormat === 'month' ? this.state.monthData.average : ''}{this.state.dataFormat === 'week' ? this.state.weekData.average : ''} </p>

                                    {/* Get data from all of cohort and sort what is the ranking of this individual in the cohort in terms of commits */}
                                    <p>Cohort Ranking: #5</p>
                                    <div className='row'>
                                        <button type='button' className='btn ml-2' onClick={this.changeFormat} value='week'>Weekly</button>
                                        <button type='button' className='btn ml-2' onClick={this.changeFormat} value='month'> Monthly</button>
                                        <button type='button' className='btn ml-2' onClick={this.changeFormat} value='year'>Yearly</button>
                                    </div>
                                </div>
                                <div className='col-9'>
                                    <VictoryChart
                                        axisLabelComponent={<VictoryLabel />}
                                        label={this.state.dataFormat}
                                        scale={{ x: "time" }}
                                        style={{
                                            axisLabel: { fontFamily: 'inherit', letterSpacing: '1px', stroke: 'white', fontSize: 12 },
                                            grid: { stroke: 'lightgrey' },
                                            tickLabels: { fontFamily: 'inherit', letterSpacing: '1px', stroke: '#61dafb ', fontSize: 8 }
                                        }}

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
                            </div>
                        </div>
                    </div>
                    :
                    <div className="spinner-border text-info" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                }

            </div >
        )
    }
}

export default StudentHome;