import React, { Component } from 'react'

class Walls extends Component {
constructor(props) {
    super(props)

    this.state = {
          
    }
}

    render() {
        return (<button onClick={()=>this.props.change("wall")} className="wallButton" >
            Select Walls
        </button>)
    }
}

export default Walls
