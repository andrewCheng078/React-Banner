import React, { Component } from "react";
import "./Banner.css";
import img from "./imgs/1200x380.png";


const CLOSED = 'closed'
const CLOSING = 'closing'
const OPENED = 'opened'
const OPENING = 'opening'

export default class Banner extends Component {
  // static defaultProps = {
  //   openAtStart: true, // [boolean] true | false
  //   // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
  //   autoToggle: false, // [boolean|number] true | false | 3000
  //   // 設定收合展開按鈕
  //   // 是否要有transition效果
  //   transition: true,
  //   whenTransition:function(){
  //     console.log('Transition!!!!')
  //   }
  // };

  state = {
    openAtStart: true,
    autoToggle: false,
    transition: true,
    transitionClass: "",
    classText: "",
    currentClass: OPENED,
    whenTransition: function () {
      console.log(' default callback !!!! ')
    },
    imgClass:null,
  };



  componentDidMount() {
    let { openAtStart, autoToggle, transition } = this.props;
    if (openAtStart === undefined) { openAtStart = this.state.openAtStart };
    if (autoToggle === undefined) { autoToggle = this.state.autoToggle };
    if (transition === undefined) { transition = this.state.transition };
    openAtStart ? this.bannerOpen() : this.bannerClose();
    transition ? this.setState({ transitionClass: "transition" }) : this.setState({ transitionClass: "transitionClose" });

    if (typeof autoToggle === "number") {
      this.autoToggle(autoToggle)
    } else if (typeof autoToggle === "boolean") {
      if (autoToggle) {
        this.autoToggle();
      }
    }



  }



  transitionendHandle() {
    clearInterval(this.time);
    console.log('end');
    this.state.currentClass === OPENING ? this.changeClass(OPENED) : this.changeClass(CLOSED);
    if(this.state.currentClass === OPENING){
      this.changeClass(OPENED)
    }else{
      this.changeClass(CLOSED)
      this.setState({
        imgClass:true,
      })
    }
    if (this.state.currentClass === OPENED || this.state.currentClass === OPENING) { this.setState({ classText: '收合' }) }
    if (this.state.currentClass === CLOSED || this.state.currentClass === CLOSING) { this.setState({ classText: '展開' }) }

  };

  toggle() {
    const{imgClass} = this.state;
    if (this.state.currentClass === OPENED) {
      this.changeClass(CLOSING);
      this.intervalTime();

    } else if (this.state.currentClass === CLOSED) {
      this.changeClass(OPENING);
      this.setState({
        imgClass:false,
      })
      this.intervalTime();
    }
    // this.state.currentClass === OPENED ? this.changeClass(CLOSING)  : this.changeClass(OPENING);
  }

  autoToggle(n) {
    if (typeof n === "number") {
      setTimeout(() => {
        this.state.currentClass === OPENED ? this.changeClass(CLOSED) : this.changeClass(OPENED);
      }, n)
    } else {
      this.state.currentClass === OPENED ? this.changeClass(CLOSED) : this.changeClass(OPENED);
    }

  }

  changeClass(className) {
    let imgClass = this.state.imgClass;
    this.setState({
      currentClass: className,
    });
  }

  intervalTime() {

    if (this.props.whenTransition === undefined) {
      this.time = setInterval(() => {
        this.state.whenTransition();
      }, 25);
    } else {
      this.time = setInterval(() => {
        this.props.whenTransition();
      }, 25);
    }

  }

  bannerOpen() {
    this.changeClass(OPENED);
    this.setState({ classText: '收合' })
  }

  bannerClose() {
    this.changeClass(CLOSED)
    this.setState({ classText: '展開' })
  }

  bannerToggle() {
    this.state.currentClass === OPENED ? this.bannerClose() : this.bannerOpen();
  }

  render() {
    const { classText, currentClass, transitionClass,imgClass } = this.state;
    return (
      <div>

        <div
          className={`banner  ${currentClass} ${transitionClass}`}
          onTransitionEnd={ this.transitionendHandle.bind(this) }
        >
          <a className="wrap">
            <img
              className={`img ${imgClass?'moveImg':''}`}
              src={img}
              title="輸入廣告促銷說明文字"
              alt="輸入廣告促銷說明文字"
            />
          </a>
          <button className="btn" onClick={ this.toggle.bind(this) }>
            {classText}
          </button>
        </div>
      </div>
    );
  }
}

//button text
// transitionEnd call back