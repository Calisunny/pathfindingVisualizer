import React, { Component } from 'react'

class AddFinish extends Component {
    render() {
        return (
            <button className="addfinish" onClick={()=>{this.props.f2()}}>
                Another Finish Node
            </button>
        )
    }
}

export default AddFinish
