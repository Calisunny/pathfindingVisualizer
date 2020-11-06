import React, { Component } from 'react'

class Slider extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             speed: 30
        }
    }
    handleChange=(e)=>{
        this.setState({speed: e.target.value},
            ()=>{this.props.provideSpeed(this.state.speed)});
    }
    render() {
        return (
             <div className="slider">
                <input type="Range" min={1} max={40} value={this.state.speed}
                onChange={this.handleChange} style={{margin:"0px", padding:"0px"}}/>
                <p style={{margin:"0px", padding:"0px", color:"yellow", fontSize:"150%"}}>
                     <b >Speed : {this.state.speed} </b> </p>
            </div>
        )
        }
}

export default Slider
