import React, { Component } from 'react'

class WallFrequency extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    changeWF=(e)=>{
        this.props.wfchange(e.target.value);
    }
    render() {
        return (
            <React.Fragment>
            <div className="wftext">Wall Frequency</div>
            <select id="size" className="selector"
             value={this.props.wallF} onChange={this.changeWF}>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
            </select>
            </React.Fragment>
        )
    }
}

export default WallFrequency
