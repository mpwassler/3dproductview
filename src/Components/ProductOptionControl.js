import React, { Component } from 'react'
import {TweenMax, Power2} from "gsap"

class ProductOptionControl extends Component {

  constructor(props) {
    super(props)
    this.state = {
    	bodyDefaultHeight: null,   
    	accordionOpen: false  	
    }
    this.toggleAccordion = this.toggleAccordion.bind(this)
    window.addEventListener('accordion-open', () => {
      if(this.state.accordionOpen) {
        TweenMax.to(this.optionBody, 0.05, {height: 0, ease: Power2.easeOut})
        this.setState({accordionOpen: false})
        this.optionBody.style.visibility = 'hidden'        
      }
    })
  }

  componentDidMount() {
     this.setState({bodyDefaultHeight: this.optionBody.clientHeight})
     this.optionBody.style.height = 0
     this.optionBody.style.visibility = 'hidden'
  }

  emitSectionChangeEvent() {
  	let event = new CustomEvent('move-camera', { detail: this.props.optionName })
  	window.dispatchEvent(event)
  }

  emitColorChangeEvent(color) {
  	let event = new CustomEvent('change-color', { detail: {
  		meshName: this.props.optionName,
  		color
  	}})
  	window.dispatchEvent(event)
  }

  emitAccordionOpenEvent(color) {
    let event = new CustomEvent('accordion-open')
    window.dispatchEvent(event)
  }

  toggleAccordion(e) {
  	if(!this.state.accordionOpen) {
      this.setState({accordionOpen: true})
      this.optionBody.style.visibility = 'visible'
      TweenMax.to(this.optionBody, 0.05, {height: this.state.bodyDefaultHeight, ease: Power2.easeOut})
      this.emitAccordionOpenEvent()
      this.emitSectionChangeEvent()
  	} else {
      TweenMax.to(this.optionBody, 0.05, {height: 0, ease: Power2.easeOut})
  		this.setState({accordionOpen: false})
      this.optionBody.style.visibility = 'hidden'
  	}
  }

  render() {
    return (       
    	<div className="productoption" >
	        <button onClick={this.toggleAccordion} className="productoption_header" >
	        	{this.props.optionName}
	        </button>        
	        <div className="productoption_body" ref={ el => this.optionBody = el} >
	        	{this.props.optionValues.map( value => {
	        		return <button key={value} onClick={(e) => {
	        			e.preventDefault()
	        			this.emitColorChangeEvent(value)
	        		}} className="productoption_btn" >{value}</button>
	        	})}
	        </div>        
        </div>
    )
  }
}

export default ProductOptionControl
