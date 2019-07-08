
import React, { Component } from 'react'
import Banner from '../components/banner/Banner'


export default class App extends Component {
  constructor(){
    super()
    this.bannerRef = React.createRef();
   
  }
  bannerOpen = () =>{
    this.bannerRef.current.bannerOpen()
  }
  bannerToggle = () =>{
    this.bannerRef.current.bannerToggle()
  }
  bannerClose = () =>{
    this.bannerRef.current.bannerClose()
  }
  componentDidMount(){
    setTimeout(() => {
      // this.bannerToggle();
    }, 3000);
  }
  render() {
    return (
      <div className="App">
      
      <Banner ref={ this.bannerRef } 
      // openAtStart={  true  }  
      // autoToggle={ false }  
      // transition={ true }
      // whenTransition={ function(){
      //   console.log(' props callback !!!! ')
      // } }
      />

    </div>
    )
  }
}

