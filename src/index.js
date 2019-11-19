import React from 'react';
import ReactDOM from 'react-dom';

import Counter1 from './components/counter1'
import Counter2 from './components/counter2'

class Index extends React.Component {
    render() {
        return (<>
            <Counter1 />
            <hr/>
            <Counter2 />
        </>)
    }
}
ReactDOM.render(<Index />, document.getElementById('root'))

