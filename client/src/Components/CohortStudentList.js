import React from 'react';
import { Link } from 'react-router-dom';

// This function takes in an array of data and depending on the
// format it will return a sum for the specific key of the element
// of data
function sumContributions(key, format, data) {

    let sum = 0;

    console.log("Sum Contribution")
    // List of all users, we only want one to use
    for (let i = 0; i < data[key][format].length; i++) {
        sum += data[key][format][i].count
    }

    return sum
}

function CohortStudentList({ data, format, handleRemove }) {
    return (
        <div className='text-light mt-3'>

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

                    </tbody>
                </table>
                : 'No Students'
            }

        </div >
    )

}

export default CohortStudentList;