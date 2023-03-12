import React, { ChangeEvent, useState } from "react";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getwatermarktxt } from "../store/actions/watermarktxt";

// export default function Txt() {

//     const change = (e: ChangeEvent<HTMLInputElement>) => {
//         console.log(e.target.value)
//     }
//     return (
//         <div className="txt">
//             <span>水印文字</span><br />
//             <input type="text" placeholder="请输入您需要添加的文字" onChange={change}></input>
//         </div>
//     )
// }

export default class Txt extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { txt: '', ratio: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e: any) {
        const target = e.target
        const name = target.name
        this.setState({ [name]: target.value })
    }
    handleSubmit(e: any) {
        e.preventDefault();
        console.log(this.state)
    }
    render() {
        return (
            // <form onSubmit={this.handleSubmit}>
            //     <label>
            //         请输入您想要添加的水印:
            //         <input type='text' name='txt' onChange={this.handleChange} />
            //         请输入您想要添加的比例:
            //         <input type='text' name='ratio' onChange={this.handleChange} />
            //     </label>
            //     <input type="submit" value="提交" />
            //     <input type="button" onClick={this.handleSubmit} />
            // </form>
            <div>
                请输入您想要添加的水印:
                <input type='text' name='txt' onChange={this.handleChange} />
                请输入您想要添加的比例:
                <input type='text' name='ratio' onChange={this.handleChange} />
                <button type="button" onClick={this.handleSubmit} >提交</button>
                {/* <canvas style={{ width: 650, height: 320, backgroundColor: "black" }} /> */}
            </div>
        )
    }
}