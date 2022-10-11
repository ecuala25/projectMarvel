
import React, { Component } from 'react';

function KpiBox(props) {
    return (
        <div>
            <div>
                <div>{props.text}</div>
                <div style={{ fontSize: '100px', color: '#555' }}>{props.value}</div>
            </div>
        </div>
    )
}

export default KpiBox;