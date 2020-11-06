import React from 'react'

const Chosen = (props) => {
var cl=""
    if(props.fill==="wall"){
        cl="wall"
    }else if(props.fill==="start"){
        cl="nodeStart"
    }else if(props.fill==="finish"){
        cl="nodeFinish"
    }else if(props.fill==="finish2"){
        cl="nodeFinish2"
    }
    return (
        <div className="selectedNode">
            Selected Node<div className={`node ${cl} shift`}></div>
        </div>
    )
}

export default Chosen
