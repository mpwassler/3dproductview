import React, { Component } from 'react'
import logo from './logo.svg'
import './App.css'
import Scene3d from './Components/Scene3d'
import Controls from './Components/Controls'

class App extends Component {
  render() {
    return (
      <div className="App">                
        <Scene3d />                
        <Controls 
        options={[ 'frame', 'seat', 'waterbottle', 'handlebars' ]} 
        optionValues={[
        	[ 'red', 'blue', 'green', 'yellow' ],
        	[ 'grey', 'white', 'black' ],
        	[ 'grey', 'white', 'black' ],
        	[ 'grey', 'white', 'black' ]
        ]}
        />        
      </div>
    )
  }
}

export default App
