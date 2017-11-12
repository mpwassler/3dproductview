import React, { Component } from 'react'
import ProductOptionControl from './ProductOptionControl'

class Controls extends Component {


  render() {
    return (       
        <div className="controls" >
        {this.props.options.map( (option, cnt) =>  {
          return <ProductOptionControl key={option} optionName={option} optionValues={this.props.optionValues[cnt]} />
        })}
        </div>        
    )
  }
}

export default Controls
