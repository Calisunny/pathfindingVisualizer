import React, { Component } from 'react'
import './App.css';
import Node from "./Node";


class Pathfinding extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            grid: [],
        }
    }
    createNode=(col,row)=>{
        return{
            row,
            col,
            isVisited:false,
            distance: Infinity,
            iswall:false,
            previousNode:null,
        }
    }
    getGrid=()=>{
        const grid=[];
        for(let row=0; row<18; row++){
            const currentrow=[];
            for(let col=0; col<40; col++){
                currentrow.push(this.createNode(col,row));
            }
            grid.push(currentrow);
        }
        return grid;
    }
    componentDidMount(){
        const grid= this.getGrid()
        this.setState({grid:grid},()=>{this.props.addGrid(grid)});
    }
    render() {
        const {grid}= this.state;
        return (
            <div className="grid">
            {grid.map((row,rowid)=>{
                return <div key={rowid} style={{width:"850px", height:"20px", margin:"0px",
                display:"flex", padding:"0px"}} >
                    {row.map((node,nodeid)=>{
                        var start=false; var finish=false;
                        if(this.props.start[0]===rowid && this.props.start[1]===nodeid){
                            start=true;
                        }
                        if(this.props.finish[0]===rowid && this.props.finish[1]===nodeid){
                            finish=true;
                        }
                        return(
                            <Node key={nodeid} isStart={start} isFinish={finish} iswall={false} 
                            pos={this.props.pos} i={rowid} j={nodeid} change={this.props.change}
                            fill={this.props.fill} grid={this.props.grid}
                            st={this.props.start} fi={this.props.finish} fi2={this.props.finish2} />
                        )
                    }
                )}
                </div>
            })
            }
            </div>
        )
    }
    
}

export default Pathfinding
