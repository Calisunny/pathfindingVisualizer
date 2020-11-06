import React, { Component } from 'react'

class DFS extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            startRow:props.start[0],
            startCol:props.start[1],
            finishRow: props.finish[0],
            finishCol: props.finish[1],
        }
    }
    visualizeDFS=(order,nodesInShortestPath)=>{
        if(order===1)
            this.props.cs(this.props.grid);
        const [visitedNodesInorder,stack]= this.Dfs(order);
        var finish2= this.props.finish2;
        var grid= this.props.grid;
        var len= visitedNodesInorder.length;
        for(let i=0; i<len; i++){
            setTimeout(()=>{
                const node= visitedNodesInorder[i];
                const newgrid= this.props.grid.slice();
                const newnode={
                    ...node,
                    isVisited:true,
                }
                newgrid[node.row][node.col]= newnode;
                if(order===1){
                    if(this.props.fn===2&&node.row===finish2[0]&&node.col===finish2[1]){
                        grid[node.row][node.col].isVisited=false;
                    }else{
                        document.getElementById([node.row,node.col]).className="node nodeVisited";
                    }
                }else if(order===2){
                    document.getElementById([node.row,node.col]).className="node nodeVisited2";
                }
                if(i===len-1 && order===2){
                    this.createShortestPath(stack,nodesInShortestPath);
                }
                if(i===len-1){
                    this.createShortestPath(stack);
                }
            },(51-this.props.speed)*i);
        }
    }
    createShortestPath=(nodesInShortestPath,v)=>{
        var grid= this.props.grid;
        var finish= this.props.finish;
        var finish2=this.props.finish2;
        if(this.props.fn===1){
            var disp=[];
            for(let i=nodesInShortestPath.length-1;i>=0;i--){
                disp.push(nodesInShortestPath[i])
            }
            for(let i=0;i<disp.length;i++){
                const row= disp[i].row;
                const col= disp[i].col;
                setTimeout(()=>{
                    document.getElementById([row,col]).className="node nodePath"
                },(51-this.props.speed)*i);
            }
        }
        if(this.props.fn===2 && grid[finish2[0]][finish2[1]].isVisited===false
         && v===undefined){
            var bool=false;
            if(grid[finish[0]][finish[1]].isVisited) bool=true;
            for(let i=0;i<grid.length;i++){
                for(let j=0;j<grid[0].length;j++){
                    grid[i][j].isVisited=false;
                    grid[i][j].distance=Infinity;
                    grid[i][j].previousNode=null;
                }
            }
            if(bool){
                this.visualizeDFS(2,nodesInShortestPath);
            }
        }
        if(this.props.fn===2 && grid[finish2[0]][finish2[1]].isVisited && v){
            var display=[]
            for(let i=v.length-1;i>=0;i--){
                display.push(v[i]);
            }
            for(let i=nodesInShortestPath.length-1;i>=0;i--){
                display.push(nodesInShortestPath[i]);
            }
            for(let i=display.length-1;i>=0;i--){
                const row= display[i].row;
                const col= display[i].col;
                setTimeout(()=>{
                    document.getElementById([row,col]).className="node nodePath"
                },(51-this.props.speed)*i);
            }
        }
    }
    Dfs=(order)=>{
        const visitedNodesInorder=[];
        const stack=[];
        var neighbour="";
        var startRow= this.props.start[0]; var startCol= this.props.start[1];
        var finishRow= this.props.finish[0]; var finishCol= this.props.finish[1];
        var finish2= this.props.finish2;
        if(order===2){
            startRow=finishRow; startCol=finishCol;
            finishRow=finish2[0]; finishCol=finish2[1];
        }
        const grid= this.props.grid;
        const c= grid[0].length-1;
        const r= grid.length-1;
        stack.push(grid[startRow][startCol]);
        visitedNodesInorder.push(grid[startRow][startCol]);
        grid[startRow][startCol].isVisited=true;
        while(stack.length!==0){
            const currentNode= stack[0];
            neighbour= this.getNeighbour(currentNode,grid,c,r);
            if(neighbour!==null){
                neighbour.isVisited=true;
                visitedNodesInorder.push(neighbour);
                stack.unshift(neighbour);
            }
            if(neighbour!==null && neighbour.row===finishRow && neighbour.col===finishCol){
                return [visitedNodesInorder,stack];
            }
            if(neighbour===null){
                stack.shift();
            }
        }
        return [visitedNodesInorder,stack];
    }
    getNeighbour=(node,grid,c,r)=>{
        const {row,col}= node;
        if(col<c && grid[row][col+1].isVisited===false && grid[row][col+1].iswall===false){ 
            return grid[row][col+1];
        }else if(row<r && grid[row+1][col].isVisited===false && grid[row+1][col].iswall===false){
            return grid[row+1][col];
        }else if(col>0 && grid[row][col-1].isVisited===false && grid[row][col-1].iswall===false){
            return grid[row][col-1];
        }else if(row>0 && grid[row-1][col].isVisited===false && grid[row-1][col].iswall===false){
            return grid[row-1][col];
        }else{
            return null;
        }
    }
    render() {
        return (
            <button onClick={()=>this.visualizeDFS(1)} className="dfs" >
                Depth First Search
            </button>
        )
    }
}

export default DFS
