import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { connect } from 'react-redux';
import store from '../store';


interface IState {
    imgUrl: any,
}
class Picture extends React.Component<any, IState>{
    state = {
        imgUrl: '',
    }

    onChangeHandler = (e: any) => {
        let dpr = window.devicePixelRatio;
        let file = e.target.files[0]
        var img = new Image()
        this.setState({
            imgUrl: window.URL.createObjectURL(file)
        }, () => {
            img.src = this.state.imgUrl
        })
        let cvs = document.getElementById('cvs') as any;
        var ctx = cvs.getContext('2d')
        let str = this.props.txt
        let ratio = this.props.ratio

        img.onload = function () {
            ctx.drawImage(img, 0, 0, cvs.width * dpr, cvs.height * dpr);
            cvs.style.backgroundImage = cvs.toDataURL()
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    ctx.rotate(-20 * Math.PI / 180)
                    ctx.font = "10px microsoft yahei";
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "rgba(255,255,255,0.8)";
                    ctx.fillText(str, i * (str.length * 20 / ratio), j * (str.length * 10 / ratio));
                    ctx.rotate(20 * Math.PI / 180)
                }

            }
        }

        store.subscribe(() => {
            str = store.getState().txt
            ratio = store.getState().ratio
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            cvs.style.backgroundImage = cvs.toDataURL()
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    ctx.rotate(-20 * Math.PI / 180)
                    ctx.font = "10px microsoft yahei";
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "rgba(255,255,255,0.8)";
                    ctx.fillText(str, i * (str.length * 20 / ratio), j * (str.length * 10 / ratio));
                    ctx.rotate(20 * Math.PI / 180)
                }

            }
        })
        const btn = document.getElementById("upload") as any
        btn.innerHTML = "<input type='button' value='点击下载' />"
    }



    // waterMarker() {
    //     var cvs = document.getElementById('cvs') as any;
    //     var ctx = cvs.getContext('2d')
    //     // 设置水印
    //     ctx = cvs.getContext('2d')
    //     const id = '3.14159261111'
    //     const str = '我是水印ya'
    //     ctx.rotate(-20 * Math.PI / 180)// 设置水印元素的倾斜, 这一行代码要写在设置水印文字之前，涉及样式的都写在设置水印文字之前
    //     ctx.font = '16px serif' // 设置水印文字的大小和字体
    //     ctx.fillStyle = 'rgba(200, 200, 200, 0.8)' // 设置水印文字的颜色
    //     ctx.textAlign = 'left' // 文本左对齐
    //     ctx.fillText(str, cvs.width / 16, cvs.height / 2) // 设置水印文字
    //     const divEle = document.createElement('div')
    //     divEle.id = id
    //     divEle.style.width = cvs.width + 'px' // 设置div元素的宽高
    //     divEle.style.height = cvs.height + 'px'
    //     divEle.style.pointerEvents = 'none' // 元素永远不会成为鼠标事件的target
    //     divEle.style.position = 'fixed' // 固定定位, 让元素撑满整个可视区域
    //     divEle.style.top = '3px'
    //     divEle.style.left = '5px'
    //     divEle.style.background = 'url(' + cvs.toDataURL() + ') left top repeat' // 水印图片做div的背景,并且重复，这样看起来就是满屏都是水印
    //     divEle.style.zIndex = '999999'
    //     document.body.appendChild(divEle)
    //     return id

    // }

    download() {
        const canvas = document.querySelector('#cvs') as any;
        const el = document.createElement('a');
        el.href = canvas.toDataURL();
        el.download = '文件名称';
        const event = new MouseEvent('click');
        el.dispatchEvent(event);
    }

    render() {
        console.log("comB", this.props.txt)
        return (
            <div className="edit-page">
                <canvas id="cvs" style={{ width: 1500, height: 500, backgroundColor: 'black' }}></canvas>
                <input type="file" onChange={this.onChangeHandler} />
                <br />
                <button type="button" onClick={this.download}>下载图片</button>
                <div id="upload"></div>
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return state
}

export default connect(mapStateToProps)(Picture)