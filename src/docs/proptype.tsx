import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

let root: HTMLElement | null = document.getElementById('root')

interface PersonProps extends Record<string, any> {
    name?: string,
    age?: number,
    gender?: 'male' | 'female';
    hobby?: Array<string>;
    position?: { x: number, y: number };
    // [propName: string]: any -> Record<string,any>
}
class Person extends React.Component<PersonProps>{
    static defaultProps: PersonProps = {
        name: "默认"
    }
    static propType = {
        name: PropTypes.string.isRequired,
        gender: PropTypes.oneOf(['male', 'female']).isRequired,
        hobby: PropTypes.arrayOf(PropTypes.string),
        position: PropTypes.shape({
            x: PropTypes.number,
            y: PropTypes.number,
        }),
        //自定义校验器 Record<解决索引校验问题> 校验传入的age
        age(props: PersonProps, propName: string, componentName: string): Error | null {
            let age = props[propName]
            if (age < 0 || age > 100) {
                return new Error(`Invalid Props ${propName} supplied to ${componentName}`)
            }
            return null
        }

    }
    render() {
        let { name, gender, hobby, position } = this.props
        return <div>
            <p>{name}</p>
            <p>{gender}</p>
            <p>{hobby}</p>
            <p>{position!.x}</p>
            <p>{position!.y}</p>
        </div>
    }
}
let personProps: PersonProps = {
    // name: '彭云飞',
    age: 100,
    gender: "male",
    hobby: ['唱', '跳', 'rap', '篮球'],
    position: { x: 100, y: 100 }
}
ReactDOM.render(<Person {...personProps} />, root)