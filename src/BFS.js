import React, { Component } from 'react'

class BFS extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            startRow:props.start[0],
            startCol:props.start[1],
            finishRow: props.finish[0],
            finishCol: props.finish[1],
        }
    }
    visualizeBFS=(order,nodesInShortestPath)=>{
        if(order===1)
            this.props.cs(this.props.grid);
        const visitedNodesInorder= this.Bfs(order);
        var len= visitedNodesInorder.length;
        var grid= this.props.grid;
        var finish2=this.props.finish2;
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
                }else{
                    document.getElementById([node.row,node.col]).className="node nodeVisited2";
                }
                if(i===len-1 && order===2){
                    this.createShortestPath(nodesInShortestPath);
                }
                if(i===len-1){
                    this.createShortestPath();
                }
            },(51-this.props.speed)*i);
        }
    }
    createShortestPath=(v)=>{
        var grid= this.props.grid;
        let currentNode= grid[this.props.finish[0]][this.props.finish[1]];
        const nodesInShortestPath=[];
        var finish2=this.props.finish2;
        if(v) currentNode= grid[finish2[0]][finish2[1]];
        while(currentNode!==null){
            nodesInShortestPath.unshift(currentNode);
            currentNode= currentNode.previousNode;
        }
        if(this.props.fn===1){
            for(let i=0;i<nodesInShortestPath.length;i++){
                const row= nodesInShortestPath[i].row;
                const col= nodesInShortestPath[i].col;
                setTimeout(()=>{
                    document.getElementById([row,col]).className="node nodePath"
                },(51-this.props.speed)*i);
            }
        }
        if(this.props.fn===2 && grid[finish2[0]][finish2[1]].isVisited===false
            && v===undefined){
            var finish=this.props.finish;
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
                this.visualizeBFS(2,nodesInShortestPath);
            }
        }
        if(this.props.fn===2 && v&& grid[finish2[0]][finish2[1]].isVisited){
            for(let i=0;i<nodesInShortestPath.length;i++){
                v.push(nodesInShortestPath[i]);
            }
            for(let i=0;i<v.length;i++){
                const row= v[i].row;
                const col= v[i].col;
                setTimeout(()=>{
                    document.getElementById([row,col]).className="node nodePath"
                },(51-this.props.speed)*i);
            }
        }
    }
    Bfs=(order)=>{
        const visitedNodesInorder=[];
        var startRow= this.props.start[0]; var startCol= this.props.start[1];
        var finishRow= this.props.finish[0]; var finishCol= this.props.finish[1];
        var finish2=this.props.finish2;
        if(order===2){
            startRow=finishRow; startCol=finishCol;
            finishRow=finish2[0]; finishCol=finish2[1];
        }
        const grid= this.props.grid;
        const c= grid[0].length-1;
        const r= grid.length-1;
        grid[startRow][startCol].distance=0;
        const unvisitedNodes= this.getAllNodes(grid);
        while(!!unvisitedNodes.length){
            this.sortNodesByDistance(unvisitedNodes);
            const closestNode= unvisitedNodes.shift();
            if(closestNode.iswall)continue;
            if(closestNode.distance===Infinity) return visitedNodesInorder;
            closestNode.isVisited=true;
            visitedNodesInorder.push(closestNode);
            if(closestNode===grid[finishRow][finishCol]){
                return visitedNodesInorder;
            }
            this.updateNeighbours(closestNode,grid,c,r);
        }
        return visitedNodesInorder;
    }
    updateNeighbours=(node,grid,c,r)=>{
        const neighbours= this.getNeighbours(node,grid,c,r);
        for(const neighbour of neighbours){
            neighbour.distance= node.distance+1;
            neighbour.previousNode= node;
        }
    }
    getNeighbours=(node,grid,c,r)=>{
        const neighbours=[];
        const {row,col}= node;
        if(row>0)neighbours.push(grid[row-1][col]);
        if(col>0)neighbours.push(grid[row][col-1]);
        if(row<r)neighbours.push(grid[row+1][col]);
        if(col<c)neighbours.push(grid[row][col+1]);
        return neighbours.filter(neighbour=> !neighbour.isVisited);
    }
    sortNodesByDistance=(unvisitedNodes)=>{
        unvisitedNodes.sort((NodeA,NodeB)=>NodeA.distance-NodeB.distance);
    }
    getAllNodes=(grid)=>{
        const nodes=[];
        for(var row in grid){
            for(var node in grid[row]){
                nodes.push(grid[row][node]);
            }
        }
        return nodes;
    }
    render() {
        return (
            <button onClick={()=>this.visualizeBFS(1)} className="bfs" >
                Breadth First Search
            </button>
        )
    }
}

export default BFS
