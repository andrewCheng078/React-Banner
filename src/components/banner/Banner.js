import React, { Component } from 'react'
import "./Banner.css"
import aimg from './imgs/1200x380.png'

export default class Banner extends Component {
    state={
        demoClick:true,

    }


  demoClick(){
    const { demoClick } = this.state;
    this.setState({
        demoClick:! demoClick,
    })

  }
    render() {
        const { demoClick } = this.state;
        return (
            <div>
                 <button className="run-css" onClick={this.demoClick.bind(this)}>CSS slideToggle</button>
                <div className="cont">Toggle this div</div>
                {demoClick ? <p>show</p> : null}
                <div className="banner">
                    <a className="wrap">
                        <img className="img" src={ aimg } title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字" />
                    </a>
                </div>
            </div>
        )
    }
}
