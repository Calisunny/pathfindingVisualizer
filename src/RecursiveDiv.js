import React, { Component } from 'react'

class RecursiveDiv extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             
        }
    }
    generateMaze=(grid,st,fi,fi2)=>{
        this.props.clear();
        var fn= this.props.fn;
        for(let i=0;i<grid.length;i++){
            for(let j=0;j<grid[0].length;j++){
                if(i===0||j===0||i===grid.length-1||j===grid[0].length-1){
                    grid[i][j].iswall=true;
                    document.getElementById([i,j]).className=`node wall`
                }
            }
        }
        this.divideAndDraw(grid,1,grid[0].length-2,1,grid.length-2,0);
        grid[st[0]][st[1]].iswall=false; grid[fi[0]][fi[1]].iswall=false;
        if(fn===2) grid[fi2[0]][fi2[1]].iswall=false;
        document.getElementById([st[0],st[1]]).className=`node nodeStart`;
        document.getElementById([fi[0],fi[1]]).className=`node nodeFinish`;
        if(fn===2)
        document.getElementById([fi2[0],fi2[1]]).className=`node nodeFinish2`;
    }
    divideAndDraw=(grid,left,right,up,down,depth)=>{
        var horizontal=right-left;
        var verticle=down-up;
        if(horizontal>verticle){
            if(verticle+1<2) return;
            var vertLine=Math.floor(Math.random()*(horizontal-1)+left+1);
            if(grid[up-1][vertLine].iswall===false||grid[down+1][vertLine].iswall===false){
                for(let mov=left+1;mov<right;mov++){
                    if(grid[up-1][mov].iswall===true&&grid[down+1][mov].iswall===true){
                        vertLine=mov;
                        break;
                    }
                }
            }
            if(grid[up-1][vertLine].iswall===false||grid[down+1][vertLine].iswall===false){
                return;
            }
            var skipwalli=Math.floor(Math.random()*(verticle)+up);
            for(let i=up;i<=down;i++){
                if(i===skipwalli) continue;
                grid[i][vertLine].iswall=true;
                document.getElementById([i,vertLine]).className=`node wall`
            }
            this.divideAndDraw(grid,left,vertLine-1,up,down,depth+1);
            this.divideAndDraw(grid,vertLine+1,right,up,down,depth+1);
        }else{
            if(horizontal+1<2) return;
            var horiLine=Math.floor(Math.random()*(verticle-1)+up+1);
            if(grid[horiLine][left-1].iswall===false||grid[horiLine][right+1].iswall===false){
                for(let mov=up+1;mov<down;mov++){
                    if(grid[mov][left-1].iswall===true&&grid[mov][right+1].iswall===true){
                        horiLine=mov;
                        break;
                    }
                }
            }
            if(grid[horiLine][left-1].iswall===false||grid[horiLine][right+1].iswall===false){
                return;
            }
            var skipwallj=Math.floor(Math.random()*(horizontal)+left);
            for(let j=left;j<=right;j++){
                if(j===skipwallj) continue;
                grid[horiLine][j].iswall=true;
                document.getElementById([horiLine,j]).className=`node wall`
            }
            this.divideAndDraw(grid,left,right,up,horiLine-1,depth+1);
            this.divideAndDraw(grid,left,right,horiLine+1,down,depth+1);
        }
    }
    render() {
        var grid= this.props.grid;
        var st= this.props.start; var fi= this.props.finish; var fi2= this.props.finish2;
        return (
            <button onClick={()=>this.generateMaze(grid,st,fi,fi2)} className="recursiveDiv">
                Recursive Division Maze
            </button>
        )
    }
}

export default RecursiveDiv
