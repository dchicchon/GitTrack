import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Utils
import API from '../Utils/API';

// Sum of contributions based on format
function sumContributions(format, data) {
    let sum = 0;
    for (let i = 0; i < data[format].length; i++) {
        sum += data[format][i].count
    }
    return sum
}

class StudentProfile extends Component {
    state = {
        studentData: '',
        dataFormat: 'week'
    }

    changeFormat = event => {
        let { value } = event.target
        this.setState({
            dataFormat: value
        })
    }

    // Using the Student ID, we get the student information
    componentDidMount() {
        const { id } = this.props.match.params
        API.inspectStudent(id)
            .then(res => {
                console.log(res)
                this.setState({
                    studentData: res.data
                })
            })

    }

    render() {
        return (

            <div className='home-container mt-5'>
                {/* While getting student data, be sure to have a loading image */}
                {this.state.studentData ?
                    <div>
                        <Link className='btn mb-4' to='/'>Back to Cohort</Link>
                        <h3>{this.state.studentData.student.firstName} {this.state.studentData.student.lastName}</h3>
                        <h3>Email: {this.state.studentData.student.email}</h3>
                        <h3>GitHub Username: {this.state.studentData.student.githubUsername}</h3>
                        <h3>Commits this {this.state.dataFormat}: {sumContributions(this.state.dataFormat, this.state.studentData.contributions)} </h3>

                        <div className='row'>
                            <h3>Change Format</h3>
                            <button type='button' className='btn ml-2' value='week' onClick={this.changeFormat}>Weekly</button>
                            <button type='button' className='btn ml-2' value='month' onClick={this.changeFormat}>Monthly</button>
                            <button type='button' className='btn ml-2' value='year' onClick={this.changeFormat}>Yearly</button>

                        </div>

                        {/* Graph goes here */}

                    </div> : ''}

            </div>
        )
    }
}

export default StudentProfile;