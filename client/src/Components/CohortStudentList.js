import React from 'react';
import { Link } from 'react-router-dom';


// This function takes in an array of data and depending on the
// format it will return a sum for the specific key of the element
// of data
function sumContributions(key, format, data) {

    let sum = 0;

    console.log(`This is a bug from CohortStudentList component. This function 
    is executed each time the button 'Invite Student' is clicked an the input 
    is placed`)

    // List of all users, we only want one to use
    for (let i = 0; i < data[key][format].length; i++) {
        sum += data[key][format][i].count
    }

    return sum
}

function CohortStudentList({ data, format, handleRemove, }) {
    return (
        <div className='text-light mt-3'>
            <h3>Students</h3>
            {data.length ?
                <table>
                    <tbody>
                        <tr>
                            <th>Name</th>
                            <th>Commits this {format}</th>
                            <th>Color</th>
                            {/* Maybe don't need header for remove, X is self explanatory */}
                            <th></th>
                            {/* <th>Remove</th> */}
                        </tr>

                        {/* data: {
                            author: {
                                id: '',
                                firstName: 
                                
                            }

                            color: {

                            }

                            week: {

                            }

                            month: {

                            }

                            year: {

                            }

                        } */}
                        {/* Each element has the above structure */}
                        {data.map((student, i) => (
                            <tr key={i}>
                                <td>
                                    <Link className='student-link' to={{ pathname: '/student/' + student.author.id }}>{student.author.firstName} {student.author.lastName}</Link>
                                </td>

                                {/* Get contributions for month */}
                                <td style={{ textAlign: 'center' }}>
                                    {sumContributions(i, format, data)}
                                </td>

                                {/* Get color */}

                                <td>
                                    <p style={{ color: `${student.color}`, fontSize: `1.8rem` }}>&#9679;</p>
                                </td>

                                <td>
                                    <button className='btn' type='button' onClick={() => handleRemove(student.author.id)}>X</button>
                                </td>
                            </tr>
                        ))}

                        {/* {list.map((student, i) => ( */}
                        {/* <tr key={i}> */}
                        {/* <td><Link className='student-link' to={{ pathname: '/student/' + student.id }}>{student.firstName} {student.lastName}</Link></td> */}

                        {/* Based on the format, we want to give the total number of commits for this user */}
                        {/* <td>{sumContributions(i, format, data)}</td> */}

                        {/* Color of student's Line */}
                        {/* <td></td> */}
                        {/* This should be removing student from cohort, not deleting student */}
                        {/* <td><button className='btn' type='button' onClick={() => handleRemove(student.id)}>X</button></td> */}
                        {/* </tr> */}
                        {/* ))} */}
                    </tbody>
                </table>
                : 'No Students'
            }

        </div >
    )

}

export default CohortStudentList;