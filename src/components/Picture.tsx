import React, { useState } from 'react';
import { Upload, message } from 'antd';
import { UploadChangeParam } from 'antd/lib/upload';

interface IState {
    imgUrl: any
}
export default class Picture extends React.Component<{}, IState>{
    state = {
        imgUrl: '',
    }
    onChangeHandler = (e: any) => {
        let file = e.target.files[0]
        var img = new Image()
        this.setState({
            imgUrl: window.URL.createObjectURL(file)
        }, () => {
            img.src = this.state.imgUrl
        })
        let cvs = document.getElementById('cvs') as any;
        var ctx = cvs.getContext('2d')
        var imgWidth = img.width
        if (img.width > cvs.width) {
            imgWidth = cvs.width
        }
        img.onload = function () {
            ctx.drawImage(img, 0, 0, cvs.width, cvs.height);
        }
    }

    render() {
        return (
            <div className="edit-page">
                <canvas id="cvs" style={{ backgroundColor: 'black' }}></canvas>
                <input type="file" onChange={this.onChangeHandler} />
                <br />
            </div>
        );
    }
}


