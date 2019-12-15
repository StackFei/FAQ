import React from './react/react';

function btnClick() {
    alert('btn')
}

// let element = (
//     <button id="btn" style={{ backgroundColor: 'red' }} onClick={btnClick}>
//         btn
//         <b>
//             hello
//         </b>
//     </button>
// );

let element = React.createElement(
    'button',
    { id: 'btn', style: { backgroundColor: 'red', color: 'green' }, onClick: btnClick },
    'btn',
    React.createElement('b', {}, 'hello')
)

React.render(element, document.getElementById('root'))