
import './App.css';
import React, { Component } from 'react';
import Pathfinding from './Pathfinding';
import BFS from './BFS';
import DFS from './DFS';
import Slider from './Slider'
import Walls from './Walls';
import Chosen from './Chosen'
import RandomMaze from './RandomMaze';
import WallFrequency from './WallFrequency';
import RecursiveDiv from './RecursiveDiv';
import StartAndEnd from './StartAndEnd';
import AddFinish from './AddFinish';

 class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      start:[8,9],
      finish:[8,20],
      finish2:[5,14],
      change:"wall",
      grid:[],
      speed:30,
      wallF:12,
      fnodes:1
    }
  }
  change=(c)=>{
    this.setState({change:c})
  }
  changePos=(i,j)=>{
    var finish2= this.state.finish2;
    var c=this.state.change;
    if(c==="wall")return
    var grid= this.state.grid;
    grid[i][j].iswall=false;
    if(c==="finish2"){
      document.getElementById([finish2[0],finish2[1]]).className=`node`;
      document.getElementById([i,j]).className=`node nodeFinish2`
    }
    this.setState({[c]:[i,j]});
  }
  addGrid=(grid)=>{
    this.setState({grid:grid})
  }
  provideSpeed=(speed)=>{
    this.setState({speed:speed})
  }
  wallfreq=(wf)=>{
    this.setState({wallF:wf});
  }
  clearSearch=(grid)=>{
    for(let i=0;i<18;i++){
      for(let j=0;j<40;j++){
        grid[i][j].isVisited=false;
        grid[i][j].distance=Infinity;
        grid[i][j].previousNode=null;
        if(i===this.state.start[0] && j=== this.state.start[1]){
          document.getElementById([i,j]).className=`node nodeStart`;
        }else if(i===this.state.finish[0] && j=== this.state.finish[1]){
          document.getElementById([i,j]).className=`node nodeFinish`;
        }else if(i===this.state.finish2[0] && j=== this.state.finish2[1]
          && this.state.fnodes===2){
          document.getElementById([i,j]).className=`node nodeFinish2`;
        }else if(!grid[i][j].iswall){
          document.getElementById([i,j]).className=`node`
        }
      }
    }
  }
  clearBoard=()=>{
    var grid= this.state.grid;
    for(let i=0;i<18;i++){
      for(let j=0;j<40;j++){
        grid[i][j].iswall=false;
        grid[i][j].isVisited=false;
        grid[i][j].previousNode=null;
        grid[i][j].distance=Infinity;
        if(i===this.state.start[0] && j=== this.state.start[1]){
          document.getElementById([i,j]).className=`node nodeStart`;
          continue;
        }else if(i===this.state.finish[0] && j=== this.state.finish[1]){
          document.getElementById([i,j]).className=`node nodeFinish`;
          continue;
        }else if(i===this.state.finish2[0] && j=== this.state.finish2[1]
           && this.state.fnodes===2){
          document.getElementById([i,j]).className=`node nodeFinish2`;
          continue;
        }
        document.getElementById([i,j]).className=`node`
      }
    }
  }
  addf2=()=>{
    var finish2= this.state.finish2;
    var grid= this.state.grid;
    var node= document.getElementById([finish2[0],finish2[1]]);
    if(node.className===`node nodeFinish2`){
      node.className=`node`;
      this.setState({fnodes:1});
    }else{
      grid[finish2[0]][finish2[1]].iswall=false;
      node.className=`node nodeFinish2`
      this.setState({fnodes:2});
    }
  }
  render() {
    var st=this.state.start; var fi=this.state.finish; var fi2=this.state.finish2;
    const grid= this.state.grid;
    return (
      <div className="App">
        <div className="topbar">
          <Slider provideSpeed={this.provideSpeed}/>
          <Chosen fill={this.state.change}/>
          <StartAndEnd/>
          <AddFinish f2={this.addf2}/>
          <WallFrequency wallF={this.state.wallF} wfchange={this.wallfreq}/>
          <Walls change={this.change}/>
          <BFS start={st} finish={fi} grid={grid} fn={this.state.fnodes}
           finish2={fi2} speed={this.state.speed} cs={this.clearSearch}/>
          <DFS start={st} finish={fi} grid={grid} fn={this.state.fnodes}
           finish2={fi2} speed={this.state.speed} cs={this.clearSearch}/>
          <button className="clearboard" onClick={()=>this.clearBoard()} >Clear Board</button>
          <button className="clearSearch" onClick={()=>this.clearSearch(grid)} >Clear Search</button>
          <RecursiveDiv start={st} finish={fi} finish2={fi2} grid={grid} clear={this.clearBoard}
           fn={this.state.fnodes}/>
          <RandomMaze start={st} finish={fi} grid={grid} finish2={fi2}
           clear={this.clearBoard} wallF={this.state.wallF}/>
        </div>
        <Pathfinding start={st} finish={fi} addGrid={this.addGrid} finish2={fi2}
         pos={this.changePos} change={this.change} fill={this.state.change} grid={this.state.grid}/>
      </div>
    )
  }
}

export default App