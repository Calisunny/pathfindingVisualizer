import React, { Component } from 'react'

class RandomMaze extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    createMaze=()=>{
        this.props.clear();
        var grid=this.props.grid
        for(let i=0;i<18;i++){
            console.log("row "+i);
            for(let j=1;j<=this.props.wallF;j++){
                var col=(Math.floor(Math.random()*40));
                if((i===this.props.start[0] && col=== this.props.start[1])||
                    (i===this.props.finish[0] && col=== this.props.finish[1])||
                    (i===this.props.finish2[0] && col=== this.props.finish2[1])){
                        console.log(i+","+j)
                        continue;
                }
                grid[i][col].iswall=true;
                console.log(grid[i][col]);
                document.getElementById([i,col]).className=`node wall`
            }
        }
    }
    render() {
        return (
            <button onClick={this.createMaze} className="RandomMaze" >
                Create Random Maze
            </button>
        )
    }
}

export default RandomMaze
