import React, { Component } from 'react'


class ProductOptionControl extends Component {

  constructor(props) {
    super(props)
    this.state = {
    	bodyDefaultHeight: null,   
    	accordionOpen: false  	
    }
    this.toggleAccordion = this.toggleAccordion.bind(this)
  }

  componentDidMount() {
     this.setState({bodyDefaultHeight: this.optionBody.style.height})
     this.optionBody.style.height = 0
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

  toggleAccordion(e) {
  	if(!this.state.accordionOpen) {
  		this.optionBody.style.height = this.state.bodyDefaultHeight
  		this.setState({accordionOpen: true})
  		this.emitSectionChangeEvent()
  	} else {
  		this.optionBody.style.height = 0
  		this.setState({accordionOpen: false})
  	}
  }

  render() {
    return (       
    	<div className="productoption" >
	        <div onClick={this.toggleAccordion} className="productoption_header" >
	        	{this.props.optionName}
	        </div>        
	        <div className="productoption_body" ref={ el => this.optionBody = el} >
	        	{this.props.optionValues.map( value => {
	        		return <a key={value} onClick={(e) => {
	        			e.preventDefault()
	        			this.emitColorChangeEvent(value)
	        		}} className="productoption_btn" href="#">{value}</a>
	        	})}
	        </div>        
        </div>
    )
  }
}

export default ProductOptionControl
