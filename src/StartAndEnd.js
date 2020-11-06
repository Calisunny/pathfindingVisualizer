import React from 'react'

const StartAndEnd = () => {
    return (
        <div className="startendnode">
            <div style={{display:"flex", height:"28px"}}>
                Start node: <div style={{height:"20px", width:"20px", backgroundColor:"green"}} ></div>
            </div>
            <div style={{display:"flex"}}>
                Finish node: <div style={{height:"20px", width:"20px", backgroundColor:"red"}} ></div>
            </div>
        </div>
    )
}

export default StartAndEnd
