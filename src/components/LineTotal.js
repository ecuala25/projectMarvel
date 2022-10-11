
import React, { Component } from 'react';

function LineTotal(props) {
    return (
        <div>
            <div style={{ display: 'flex', flexDirection: 'row', margin: 5, fontSize: '25px' }}>
                <div style={{ textAlign: 'right', width: '300px' }}>{props.text}</div>
                <div style={{  color: '#555', width: '50px', textAlign: 'right', marginLeft: 5, marginRight: 5 }}>{props.value}</div>
            </div>
            
        </div>
    )
}

export default LineTotal;