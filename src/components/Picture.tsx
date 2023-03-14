import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';
import { connect } from 'react-redux';
import store from '../store';
import "../styles/Picture.scss"


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
        console.log("url", img)
        let cvs = document.getElementById('cvs') as any;
        var ctx = cvs.getContext('2d')
        let str = this.props.txt
        let ratio = this.props.ratio
        let width = cvs.width
        let height = cvs.height
        cvs.width = 500


        img.onload = function () {
            cvs.height = cvs.width * (img.height / img.width)
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
            cvs.style.backgroundImage = cvs.toDataURL()
            for (let i = 0; i < 20; i++) {
                for (let j = 0; j < 20; j++) {
                    ctx.scale(2, 2);
                    ctx.translate(-width / 2, -height / 2);
                    ctx.rotate(-20 * Math.PI / 180)
                    ctx.font = "10px microsoft yahei";
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "rgba(255,255,255,0.8)";
                    ctx.fillText(str, i * (str.length * 20 / ratio), j * (str.length * 10 / ratio));
                    ctx.rotate(20 * Math.PI / 180)
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
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
                    ctx.scale(2, 2);
                    ctx.translate(-width / 2, -height / 2);
                    ctx.rotate(-20 * Math.PI / 180)
                    ctx.font = "10px microsoft yahei";
                    ctx.textAlign = 'center';
                    ctx.fillStyle = "rgba(255,255,255,0.8)";

                    ctx.fillText(str, i * (str.length * 20 / ratio), j * (str.length * 10 / ratio));
                    ctx.rotate(20 * Math.PI / 180)
                    ctx.setTransform(1, 0, 0, 1, 0, 0);
                }

            }
        })
        const btn = document.getElementById("upload") as any
        btn.innerHTML = "<input type='button' value='点击下载' />"
        btn.style.display = "block";
        const upbtn = document.getElementById("up") as any;
        upbtn.style.textAlign = "right";
    }


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
                {/* <input id="picture" type="file" onChange={this.onChangeHandler} /> */}
                <label >
                    <div id='up'>
                        <input type="button" id="btn" value="点我上传" />
                        <input type="file" id="picture" onChange={this.onChangeHandler} />
                    </div>

                    <div id="upload" onClick={this.download} style={{ display: 'none' }}></div>

                </label>

                <div className='cvsbox'>
                    <canvas id="cvs" ></canvas>
                </div>

                <br />
            </div>
        );
    }
}
const mapStateToProps = (state: any) => {
    return state
}

export default connect(mapStateToProps)(Picture)