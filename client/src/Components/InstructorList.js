import React from 'react';

import Message from './Message';

const InstructorList = ({ color, message, instructorList, handleInstructorDelete }) => {
    return (

        <div>
            <h3 className='mt-2'>Instructors</h3>
            <Message
                message={message}
                color={color}
            />
            <table>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Email</th>
                        <th>Delete</th>
                    </tr>
                    {instructorList ?
                        instructorList.map((instructor, i) => (
                            <tr key={i}>
                                <td>{instructor.id}</td>
                                <td>{instructor.firstName} {instructor.lastName}</td>
                                <td>{instructor.email}</td>
                                <td><button type='button' className='btn btn-danger' onClick={() => handleInstructorDelete(instructor.id)}>x</button></td>
                            </tr>
                        ))
                        : 'No Instructors'
                    }
                </tbody>
            </table>
        </div>
    )
}

export default InstructorList;