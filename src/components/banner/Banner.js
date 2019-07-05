import React, { Component } from 'react'
import "./Banner.css"
import img from './imgs/1200x380.png'

export default class Banner extends Component {
    state={
        demoClick:true,
        openAtStart:false,
        autoToggle:false,
        transition:true,
        transitionClass:'',
        classText:'收合',
        bannerClass:"opened",

    }


  demoClick(){
    let { demoClick } = this.state;
    this.setState({
        demoClick:! demoClick,
    })

  }
  
  componentDidMount(){
     const { openAtStart,autoToggle, transition } = this.state;
       openAtStart ? this.open() : this.close() ; 
       if(autoToggle){this.toggle()}
       if(transition){this.setState({transitionClass:'transition'})}
       
  }

  toggle(){
   this.state.bannerClass ==='opened'?  this.close(): this.open() ;
 
  }

  open(){
    let ingClass = 'opening'
    this.transitionListener();
    let newClass = 'opened'
    this.setState({
      bannerClass:newClass,
    })
  }

  close(){
    let newClass = 'closed'
    this.setState({
      bannerClass:newClass,
    })
  }
  transitionListener(){
    const el = document.querySelector('.banner');
    el.addEventListener('transitionend webkitTransitionEnd oTransitionEnd',()=>{
      console.log('do something')
    });

   
  }
 

    render() {
        const { demoClick,classText, bannerClass, transitionClass } = this.state;
        return (
            <div>
                 <button className="run-css" onClick={ this.demoClick.bind(this) }>CSS slideToggle</button>
                <div className="cont">Toggle this div</div>
                {demoClick ? <p>show</p> : null}
                <div className={`banner  ${bannerClass} ${transitionClass}` } >
                    <a className="wrap">
                        <img className="img" src={ img } title="輸入廣告促銷說明文字" alt="輸入廣告促銷說明文字" />
                    </a>
                    <button className="wrap_btn" onClick={this.toggle.bind(this)}>{ classText }</button>
                </div>
            
            </div>
        )
    }
}


//需求 

// 設定一開始是否為開或合
//     openAtStart: true, // [boolean] true | false
//     // 設定啟動後是否要自動開或合，若設為false，就不要自勳開合；若為true是馬上自動開合；若為數字是幾毫秒之後開合
//     autoToggle: true, // [boolean|number] true | false | 3000
//     // 設定收合展開按鈕
//     button: {
//         closeText: '收合', // [string]
//         openText: '展開', // [string]
//         class: 'btn' // [string]
//     },
//     // 設定模組在各狀態時的class
//     class: {
//         closed: 'closed', // [string]
//             closing: 'closing', // [string]
//             opened: 'opened', // [string]
//             opening: 'opening' // [string]
//     },
//     // 是否要有transition效果
//     transition: true,
//     // 當有transition時，要執行的callback function
//     whenTransition: function () {
//         console.log('whenTransition');
//     }