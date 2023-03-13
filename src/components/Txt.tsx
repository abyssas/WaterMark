import React, { ChangeEvent, useState } from "react";
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import '../styles/Txt.scss'
import Picture from "./Picture";
import store from "../store";
import { connect } from "react-redux";

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

class Txt extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = { txt: '', ratio: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e: any) {
        const target = e.target
        const name = target.name
        this.setState({ [name]: target.value }, () => { this.props.sendAction(this.state.txt, this.state.ratio) })
        // console.log(this.state)
    }

    handleSubmit(e: any) {
        e.preventDefault();
        console.log(this.state)
    }

    // Click = () => {
    //     this.props.sendAction(this.state.txt)
    //     console.log('click', store.getState())
    // }

    componentDidMount(): void {
        store.subscribe(() => {
            console.log('subs:', store.getState())
        })
    }

    render() {
        return (
            <div>
                <span className="txt">请输入您想要添加的水印文字:</span><br />
                <input className="input" type='text' name='txt' onChange={this.handleChange} />
                <br />
                <span className="txt">请输入您想要添加的水印比例:</span><br />
                <input className="input" type='text' name='ratio' onChange={this.handleChange} /><br />
                <button type="button" onClick={this.handleSubmit} >提交</button>
                {/* <button type="button" onClick={this.Click} >提交</button> */}
                <Picture></Picture>

                {/* <canvas style={{ width: 650, height: 320, backgroundColor: "black" }} /> */}
            </div>
        )
    }
}
const mapDispatch = (dispatch: any) => {
    return {
        sendAction: (txt: any, ratio: any) => {
            dispatch({
                type: "add",
                data: txt,
                ratio: ratio
            })
        }
    }
}


export default connect(null, mapDispatch)(Txt)