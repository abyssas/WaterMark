import React from "react";
import { Slider, Switch } from 'antd';
// export default function Ratio() {
//     return (
//         <div className="ratio">
//             <span>水印比例</span><br />
//             <Slider defaultValue={30} />

//         </div>
//     )
// }

export default class Ratio extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { value: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e: any) {
        this.setState({ value: e.target.value })
    }
    handleSubmit(e: any) {
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    请输入您想要添加的比例:
                    <input type='text' onChange={this.handleChange} />
                </label>
                <input type="submit" value="提交" />
            </form>
        )
    }
}