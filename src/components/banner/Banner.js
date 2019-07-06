import React, { Component } from "react";
import "./Banner.css";
import img from "./imgs/1200x380.png";


const CLOSED = 'closed'
const CLOSING = 'closing'
const OPENED = 'opened'
const OPENING = 'opening'

export default class Banner extends Component {
  static defaultProps = {
    openAtStart: true, // [boolean] true | false
    // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
    autoToggle: false, // [boolean|number] true | false | 3000
    // 設定收合展開按鈕
    button: {
      closeText: "收合", // [string]
      openText: "展開", // [string]
      class: "btn" // [string]
    },
    // 設定模組在各狀態時的class
    class: {
      [CLOSED]: "closed", // [string]
      [CLOSING]: "closing", // [string]
      [OPENED]: "opened", // [string]
      [OPENING]: "opening" // [string]
    },
    // 是否要有transition效果
    transition: true,
    whenTransition:function(){
      console.log('Transition!!!!')
    }
  };

  state = {
    openAtStart: false,
    autoToggle: false,
    transition: true,
    transitionClass: "",
    classText: "收合",
    currentClass: OPENED
  };



  componentDidMount() {
    const { openAtStart, autoToggle, transition } = this.props;
    openAtStart ? this.changeClass(OPENED) : this.changeClass(CLOSED);
    if(typeof autoToggle === "number"){
      this.toggleLoop(autoToggle)
    }else if(typeof autoToggle === "boolean"){
      if (autoToggle) {
        this.toggleLoop(); 
      }
    }
    
    if (transition) {
      this.setState({ transitionClass: "transition" });
    }

  }

  transitionendHandle = () => {
    clearInterval(this.time);
    console.log('end')
    this.state.currentClass === OPENING ? this.changeClass(OPENED) : this.changeClass(CLOSED);
    if(this.state.currentClass === OPENED||this.state.currentClass === OPENING){this.setState({classText:'收合'})}
    if(this.state.currentClass === CLOSED||this.state.currentClass === CLOSING){this.setState({classText:'展開'})}
    
  };

  toggle() {
    if(this.state.currentClass === OPENED){
      this.changeClass(CLOSING);
      this.intervalTime();
    }else if(this.state.currentClass === CLOSED){
      this.changeClass(OPENING);
      this.intervalTime();
    }
    // this.state.currentClass === OPENED ? this.changeClass(CLOSING)  : this.changeClass(OPENING);
  }

  toggleLoop(n) {
    if(typeof n === "number"){
      setTimeout(()=>{
        this.state.currentClass === OPENED ? this.changeClass(CLOSED) : this.changeClass(OPENED);
      },n)
    }else{
      this.state.currentClass === OPENED ? this.changeClass(CLOSED) : this.changeClass(OPENED);
    }
   
  }

  changeClass(className) {
    this.setState({
      currentClass: className
    });
  }
  
  intervalTime(){
    this.time = setInterval(()=>this.props.whenTransition(),25);
  }

  render() {
    const { classText, currentClass, transitionClass } = this.state;
    return (
      <div>
      
        <div
          className={`banner  ${this.props.class[currentClass]} ${transitionClass}`}
          onTransitionEnd={this.transitionendHandle}
        >
          <a className="wrap">
            <img
              className="img"
              src={img}
              title="輸入廣告促銷說明文字"
              alt="輸入廣告促銷說明文字"
            />
          </a>
          <button className="wrap_btn" onClick={this.toggle.bind(this)}>
            { classText }
          </button>
        </div>
      </div>
    );
  }
}

//button text
// transitionEnd call back