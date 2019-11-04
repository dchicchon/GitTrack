import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// Components
// import CohortStudentList from '../Components/CohortStudentList';
import { VictoryChart, VictoryContainer, VictoryAxis, VictoryLabel, VictoryLine, VictoryTooltip } from 'victory';
import ContextMenu from '../Components/ContextMenu';
import AddStudent from '../Components/AddStudent';
import AddCohort from '../Components/AddCohort';

// Utils
import API from '../Utils/API';
import FormatList from '../Components/FormatList';

// TO DO: why does the function SumContributions from the component CohortStudentList execute when I click on the Invite Student Button? 
// This is important to find out because it is causing severe lag to Invite student input

class InstructorHome extends Component {
    state = {

        showList: false,
        loading: false,

        // Creating Cohort
        createCohort: false,
        cohortName: '',

        // Adding Student
        addStudent: false,
        via: 'link',

        // studentEmail: '',
        studentFirstName: '',
        studentLastName: '',
        studentEmail: '',
        currentCohort: '',
        currentCohortName: '',

        // Geting Cohort List
        cohortList: '',

        // Getting Student List
        // studentList: '',
        // loadingStudents: true,

        // Graph
        showGraph: false,
        dataFormat: 'month',
        studentData: [],
        studentLegend: '',
        weekData: '',
        monthData: '',
        yearData: ''
    }

    componentDidMount() {
        console.log("Getting Cohorts")
        API.getCohorts(this.props.user.id)
            .then(res => {
                // console.log(res.data)
                // If we get data back
                if (res.data) {
                    console.log("Cohorts Received")
                    this.setState({
                        cohortList: res.data
                    })
                } else {
                    console.log("No Cohorts!")
                }
            })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    }

    // Currently not working, but I would love to add this function. It would open up alot of functionality for the app
    // openMenu = event => {
    //     console.log("Handle Menu")
    //     let { id } = event.target
    //     console.log(id)
    //     let item = document.getElementById(id)
    //     console.log(item)
    // }

    // Cohort Functions
    // ==================================================================
    createCohort = () => {
        console.log("Creating Cohort")
        if (this.state.createCohort) {
            return this.setState({
                createCohort: false
            })
        }
        this.setState({
            createCohort: true
        })
    }

    removeCohort = event => {
        console.log("remove cohort")
        let { id } = event.target
        console.log(id)
        API.cohortDelete(id)
            .then(res => {
                console.log("Deleted Cohort")
                API.getCohorts(this.props.user.id)
                    .then(res2 => {
                        if (res2.data) {
                            console.log("Cohorts Received")
                            this.setState({
                                cohortList: res2.data
                            })
                        } else {
                            console.log("No Cohorts!")
                        }

                    })
            })
    }

    submitCohort = (event) => {
        event.preventDefault()
        if (this.state.cohortName) {
            let creds = {
                name: this.state.cohortName,
                numberStudents: 0,
                InstructorId: this.props.user.id
            }
            API.cohortCreate(creds)
                .then(res => {
                    this.setState({
                        createCohort: false
                    })
                    API.getCohorts(this.props.user.id)
                        .then(res => {
                            this.setState({
                                cohortList: res.data
                            })
                        })
                })

        } else {
            console.log("Please fill out all fields")
        }


    }


    // Get list of cohort students and their data to put on graph
    inspectCohort = (id, name) => {
        // event.preventDefault();
        this.setState({
            loading: true,
            showList: false
        })

        API.cohortStudentList(id)
            .then(res => {


                // If there are no students in the cohort
                if (res.data.length === 0) {
                    this.setState({
                        showList: true,
                        loading: false,
                        studentEmail: '',

                        studentLegend: '',

                        studentData: [],
                        weekData: '',
                        monthData: '',
                        yearData: '',

                        cohortName: '',
                        currentCohort: id,
                        currentCohortName: name
                    })
                }

                else {

                    // Get a list of students that have github username submitted
                    let list = {
                        students: res.data.filter(student => student.githubUsername !== '')
                    }

                    API.getGraph(list)
                        .then(res2 => {

                            // Here we modify data to get specific numbers
                            let students = res2.data.students
                            let weekSum = 0;
                            let monthSum = 0;
                            let yearSum = 0;
                            let studentLegend = []
                            for (let i = 0; i < students.length; i++) {
                                // console.log(students[i])
                                // console.log(students[i].week)

                                let legendEntry = {
                                    name: (students[i].author.firstName + ' ' + students[i].author.lastName),
                                    symbol: { fill: students[i].color }
                                }

                                studentLegend.push(legendEntry)
                                for (let j = 0; j < students[i].week.length; j++) {
                                    weekSum += students[i].week[j].count
                                }
                                for (let k = 0; k < students[i].month.length; k++) {
                                    monthSum += students[i].month[k].count
                                }
                                for (let l = 0; l < students[i].year.length; l++) {
                                    yearSum += students[i].year[l].count
                                }

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

                                // Show the list of students
                                showList: true,
                                loading: false,

                                // List of students
                                studentEmail: '',

                                // Legend for the VictoryLegend Component
                                studentLegend: studentLegend,

                                // Data for the week,month,year
                                weekData: weekData,
                                monthData: monthData,
                                yearData: yearData,

                                // List of students Contributions
                                studentData: students,

                                cohortName: '',

                                // Cohort ID
                                currentCohort: id,

                                // Cohort Name
                                currentCohortName: name


                            })

                        })
                }
            })
    }
    // ==================================================================

    changeFormat = event => {
        let { value } = event.target
        this.setState({
            dataFormat: value
        })
    }
    // ==================================================================


    // STUDENT FUNCTIONS
    // ==================================================================

    // Currently this affects the cohort student list when I click on the button
    // This causes the cohort student list to re-render

    // Clicking this affects the addStudent state Variable
    addStudent = () => {
        if (this.state.addStudent) {
            return this.setState({
                addStudent: false
            })
        }
        this.setState({
            addStudent: true
        })
    }

    // Invite student via email or via link
    inviteMethod = event => {
        let { value } = event.target
        this.setState({
            via: value
        })
    }

    // This should remove the student from the cohort and not delete the student entirely and also should
    // Re-render the graph without the student
    handleRemoveStudent = (event) => {
        console.log("Remove Student")
        let { id } = event.target;
        let numID = parseInt(id)
        console.log(numID)
        this.setState({
            loading: true,
            showList: false
        })

        // Remove student from cohort
        API.studentRemove(numID)
            .then(res => {
                console.log("Student Removed")
                console.log(res.data)

                // I would expect that this function would re-render the student list
                API.cohortStudentList(this.state.currentCohort)
                    .then(res2 => {
                        // If there are no students in the cohort
                        if (res2.data.length === 0) {
                            this.setState({
                                showList: true,
                                loading: false,
                                studentEmail: '',

                                studentLegend: '',

                                studentData: [],
                                weekData: '',
                                monthData: '',
                                yearData: '',

                                cohortName: '',
                            })
                        }

                        else {

                            // Get a list of students that have github username submitted
                            let list = {
                                students: res2.data.filter(student => student.githubUsername !== '')
                            }

                            API.getGraph(list)
                                .then(res3 => {

                                    // Here we modify data to get specific numbers
                                    let students = res3.data.students
                                    let weekSum = 0;
                                    let monthSum = 0;
                                    let yearSum = 0;
                                    let studentLegend = []
                                    for (let i = 0; i < students.length; i++) {
                                        // console.log(students[i])
                                        // console.log(students[i].week)

                                        let legendEntry = {
                                            name: (students[i].author.firstName + ' ' + students[i].author.lastName),
                                            symbol: { fill: students[i].color }
                                        }

                                        studentLegend.push(legendEntry)
                                        for (let j = 0; j < students[i].week.length; j++) {
                                            weekSum += students[i].week[j].count
                                        }
                                        for (let k = 0; k < students[i].month.length; k++) {
                                            monthSum += students[i].month[k].count
                                        }
                                        for (let l = 0; l < students[i].year.length; l++) {
                                            yearSum += students[i].year[l].count
                                        }

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

                                        // Show the list of students
                                        showList: true,
                                        loading: false,

                                        // List of students
                                        studentEmail: '',

                                        // Legend for the VictoryLegend Component
                                        studentLegend: studentLegend,

                                        // Data for the week,month,year
                                        weekData: weekData,
                                        monthData: monthData,
                                        yearData: yearData,

                                        // List of students Contributions
                                        studentData: students,

                                        cohortName: '',



                                    })

                                })
                        }

                    })
            })
    }
    // ==================================================================


    render() {

        return (
            <div>

                {/* List of cohorts*/}
                <div className='home-container mt-3'>
                    {/* <h2>Welcome {this.props.user.firstName}</h2> */}

                    {/* This row should contain cohort list and respective students */}
                    <div className='row mb-2'>

                        <div className='col-2'>

                            <h3>Cohorts <span className='add' onClick={this.createCohort}>+</span></h3>

                            {this.state.createCohort ?
                                <AddCohort
                                    close={this.createCohort}
                                    handleInputChange={this.handleInputChange}
                                    cohortName={this.state.cohortName}
                                    submitCohort={this.submitCohort}
                                />
                                : ""}

                            {/* Show Cohort List */}
                            {this.state.cohortList ?
                                <div className='mt-2'>
                                    <ul className="list-group">
                                        {this.state.cohortList.map((cohort, i) => (
                                            <li
                                                key={i}
                                                // value={cohort.id}
                                                // id={cohort.name}
                                                className='list-group-item'
                                            // onClick={this.inspectCohort}
                                            >
                                                <span style={{ cursor: 'pointer' }} id={cohort.name} onClick={() => this.inspectCohort(cohort.id, cohort.name)}>{cohort.name}</span>
                                                <span id={cohort.id} style={{ position: 'absolute', right: '10px', cursor: 'pointer' }} onClick={this.removeCohort}>x</span>

                                            </li>

                                        ))}
                                    </ul>
                                </div>
                                : ''}


                            {/* Render student List if cohort is inspected */}
                            {this.state.showList ?
                                <div className='mt-2'>
                                    <div className='row'>
                                        <h3>Students <span className='add' onClick={this.addStudent}>+</span></h3>
                                        {this.state.addStudent ?
                                            <AddStudent
                                                close={this.addStudent}
                                                cohortID={this.state.currentCohort}
                                                inviteMethod={this.inviteMethod}
                                                inviteVia={this.state.via}
                                                handleInputChange={this.handleInputChange}
                                                studentEmail={this.state.studentEmail}
                                                submitStudent={this.submitStudent}
                                            />
                                            : ''}
                                    </div>

                                    {/* Add a remove student function that will come in the form of a sidemenu */}
                                    {/* How about instead of clicking on the student to their link, what if it opened a menu? */}
                                    {/* This is based off of studentData, not studentList */}
                                    {this.state.studentData.length ?
                                        < ul className='list-group'>
                                            {this.state.studentData.map((student, k) => (
                                                <li
                                                    key={k}
                                                    className='list-group-item'
                                                >

                                                    {/* <span style={{ color: `${student.color}`, fontSize: `1.8rem` }}>&#9679;</span> */}
                                                    {/* <span className='student-link' id={k} onClick={this.openMenu}>{student.author.firstName} {student.author.lastName}</span> */}

                                                    {/* Does not work at the moment, will continue to use link */}
                                                    {/* 
                                                    <ContextMenu
                                                        id={k}
                                                        trigger={0}
                                                        items={["Inspect Student", ["Remove student"]]}
                                                    /> */}

                                                    <Link className='student-link' to={{ pathname: '/student/' + student.author.id }}>
                                                        <span style={{ color: `${student.color}`, fontSize: `1.8rem` }}>&#9679;</span><span> {student.author.firstName} {student.author.lastName}</span>
                                                    </Link>
                                                    <span id={student.author.id} style={{ position: 'absolute', right: '10px', cursor: 'pointer' }} onClick={this.handleRemoveStudent}>x</span>
                                                </li>
                                            ))}
                                        </ul> : 'No Students yet! Click on the plus button to add students'}
                                </div>
                                : ''
                            }

                            {/* <CohortStudentList
                                    format={this.state.dataFormat}
                                    handleRemove={this.handleRemoveStudent}
                                    addStudent={this.addStudent}
                                    // handleInputChange={this.handleInputChange}
                                    // list={this.state.studentList}
                                    data={this.state.studentData}
                                /> */}


                            {/* If I want to add student. Depends on addStudent State */}

                        </div>
                        <div className='col-10'>
                            {this.state.loading ?
                                <div className="spinner-border text-info" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div> : ''}
                            {this.state.showList ?
                                <div>
                                    <h2>{this.state.currentCohortName}</h2>
                                    {/* On button click, add a class that changes it's style */}
                                    <FormatList
                                        format={this.state.dataFormat}
                                        changeFormat={this.changeFormat}
                                    />
                                    <div>
                                        <div>
                                            <VictoryChart
                                                domainPadding={30}
                                                height={600}
                                                width={1050}
                                                containerComponent={<VictoryContainer responsive={false} />}
                                                style={{ parent: { maxWidth: "100%" } }}
                                            >
                                                <VictoryAxis
                                                    axisLabelComponent={<VictoryLabel />}
                                                    label={this.state.dataFormat}
                                                    scale={{ x: "time" }}
                                                    style={{
                                                        axisLabel: { fontFamily: 'inherit', fontWeight: 100, letterSpacing: '1px', stroke: 'white', fontSize: 20 },
                                                        grid: { stroke: 'lightgrey' },
                                                        tickLabels: { fontFamily: 'inherit', fontWeight: 100, letterSpacing: '1px', stroke: '#61dafb ', fontSize: 20 }
                                                    }}
                                                />
                                                <VictoryAxis
                                                    dependentAxis={true}
                                                    axisLabelComponent={<VictoryLabel />}
                                                    label={'Number of Commits'}
                                                    // padding={1000}
                                                    // This moves the y-axis label and ticks
                                                    // offsetX={25}
                                                    fixLabelOverlap={true}
                                                    // Does nothing
                                                    // singleQuandrantDomainPadding={true}
                                                    // width={100}
                                                    style={{
                                                        axisLabel: { fontFamily: 'inherit', fontWeight: 100, letterSpacing: '1px', stroke: 'white', fontSize: 20, margin: '30px' },
                                                        grid: { stroke: 'lightgrey' },
                                                        tickLabels: { fontFamily: 'inherit', fontWeight: 100, letterSpacing: '1px', stroke: '#61dafb ', fontSize: 20, marginBlock: '20px' }

                                                    }}

                                                />

                                                {/* Add a feature that will allow instructors to hide lines on student click */}
                                                {this.state.studentData ?
                                                    this.state.studentData.map(
                                                        (student, i) => (
                                                            <VictoryLine
                                                                interpolation='natural'
                                                                name={student.author.firstName}
                                                                key={i}
                                                                labelComponent={<VictoryTooltip />}
                                                                labels={() => `${student.author.firstName}`}
                                                                data={student[`${this.state.dataFormat}`]}
                                                                style={{
                                                                    data: { stroke: student.color, strokeWidth: 1.5 }
                                                                }}
                                                                x='date'
                                                                y='count'
                                                            />
                                                        )
                                                    )
                                                    : ''}

                                            </VictoryChart>
                                            <div className='row'>
                                                <div className='col-4'>

                                                    <h3>Class Progress</h3>
                                                    <p>Commits this {this.state.dataFormat}: {this.state.dataFormat === 'year' ? this.state.yearData.total : ''} {this.state.dataFormat === 'month' ? this.state.monthData.total : ''} {this.state.dataFormat === 'week' ? this.state.weekData.total : ''}</p>
                                                    <p>Average Commits: {this.state.dataFormat === 'year' ? this.state.yearData.average : ''} {this.state.dataFormat === 'month' ? this.state.monthData.average : ''} {this.state.dataFormat === 'week' ? this.state.weekData.average : ''}</p>


                                                </div>

                                            </div>
                                        </div>

                                    </div>






                                </div>
                                : ''}
                        </div>
                    </div>
                    <div>
                        <div>
                            {/* End row here */}


                        </div>
                        {/* : ''} */}
                    </div>
                </div >


            </div >

        )
    }
}

export default InstructorHome;