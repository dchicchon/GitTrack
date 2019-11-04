import React from 'react'

// let style = { width: 'auto', height: 'auto', background: 'white' }

function ContextMenu({ id, trigger, items }) {

    if (trigger) {
        return (
            <div id={id} className='list-group'>
                <ul>
                    {items.map((item, i) => (
                        <li className='list-group-item' key={i}>{item}</li>
                    ))}
                </ul>
                {/* Should accept multiple items */}
            </div>
        )
    } else {
        return <div id={id}></div>
    }
}

export default ContextMenu;