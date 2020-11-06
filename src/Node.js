import React, { Component } from 'react'
import './App.css';

class Node extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fill:props.fill,
        }
    }
    move=(e)=>{
        if(this.props.isStart){
            this.props.change("start");
        }else if(this.props.isFinish){
            this.props.change("finish");
        }else if(e.target.className==="node nodeFinish2"){
            this.props.change("finish2");
        }else{
            this.props.pos(this.props.i,this.props.j);
        }
    }
    mouseDown=(e)=>{
        var name= e.target.className;
        var grid= this.props.grid;
        if(this.props.fill==="start" ||this.props.fill==="finish"||this.props.fill==="finish2") return;
        if(name==="node nodeStart"||name==="node nodeFinish"||name==="node nodeFinish2") return;
        if(e.target.className!=="node wall"){ 
            grid[this.props.i][this.props.j].iswall=true;
            e.target.className="node wall"
        }else if(e.target.className==="node wall"){
            grid[this.props.i][this.props.j].iswall=false;
            e.target.className="node"
        }
    }
    render(){
        var extraClass=  "";
        const id=[this.props.i,this.props.j];
        if(this.props.isStart){
            extraClass="nodeStart";
        }
        if(this.props.isFinish){
            extraClass="nodeFinish";
        }
        return (
            <div className={`node ${extraClass}`} onClick={this.move} id={id}
            onMouseUp={this.mouseDown}/>
        )
    }
}

export default Node
