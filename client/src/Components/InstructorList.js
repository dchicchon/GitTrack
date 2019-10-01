import React from 'react';

import Message from './Message';

const InstructorList = ({ changeView, color, message, instructorList, handleInstructorDelete }) => {
    return (

        <div>
            <h3>Instructors</h3>
            <button className='btn btn-primary mr-2' type='button' onClick={changeView} value='admin'>Admin List</button>
            <button className='btn btn-primary' type='button' onClick={changeView} value='student'>Student List</button>
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
                    {instructorList.map((instructor, i) => (
                        <tr key={i}>
                            <td>{instructor.id}</td>
                            <td>{instructor.firstName} {instructor.lastName}</td>
                            <td>{instructor.email}</td>
                            <td><button type='button' className='btn btn-danger' onClick={() => handleInstructorDelete(instructor.id)}>x</button></td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default InstructorList;