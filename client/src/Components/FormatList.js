import React from 'react';

// Edit classname of a button onclick
function FormatList({ changeFormat, format }) {

    let btnStyle1 = format === 'week' ? 'active btn' : 'btn'
    let btnStyle2 = format === 'month' ? 'active btn' : 'btn'
    let btnStyle3 = format === 'year' ? 'active btn' : 'btn'

    return (
        <div className='btn-group' role='group' aria-label='Format'>
            <button type='button' className={btnStyle1} value='week' onClick={changeFormat}>Weekly</button>
            <button type='button' className={btnStyle2} value='month' onClick={changeFormat}>Monthly</button>
            <button type='button' className={btnStyle3} value='year' onClick={changeFormat}>Yearly</button>
        </div >
    )
}

export default FormatList;