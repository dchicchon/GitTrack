import React from 'react';

function Message({ message, color }) {
    const divStyle = color === 'green' ? 'text-success' : 'text-danger'
    return (
        <div>
            <p className={divStyle}> {message}</p>
        </div>
    )
}

export default Message;
