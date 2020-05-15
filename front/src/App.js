import React, { Component } from 'react';
//import axios from 'axios';
import './App.css';

//importing components
import Header from './components/Header';
import Pageone from './components/Pageone';
import Pagetwo from './components/Pagetwo';
import Pagethree from './components/Pagethree';

class App extends Component{

  state = {
    pageNumber: 1
  }

  changePageNumber = (info) => {
    this.setState({pageNumber: info}, () => {
      this.displayPage(this.state.pageNumber)
    })
  }

  displayPage = (num) => {
    document.getElementById("page-1").style.display = "none";
    document.getElementById("page-2").style.display = "none";
    document.getElementById("page-3").style.display = "none";

    document.getElementById(`page-${num}`).style.display = "block";
  }

  componentDidMount() {
    this.displayPage(this.state.pageNumber)
  }

  render() {
    return (
      <div className="App">
        <Header changePage = { (info) => { this.changePageNumber(info) } } />
        <div id="page-1">
          <Pageone />
        </div>
        <div id="page-2">
          <Pagetwo />
        </div>
        <div id="page-3">
          <Pagethree />
        </div>
      </div>
    );
  }
}

export default App;
