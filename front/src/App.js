import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import './App.css';

//importing components
import Header from './components/Header';
import Pageone from './components/Pageone';
import Pagetwo from './components/Pagetwo';
import Pagethree from './components/Pagethree';

import Allcat from './components/Allcat';
import Editcat from './components/Editcat';
import Addcat from './components/Addcat';

import Allbills from './components/Allbills';
import Editbill from './components/Editbill';
import Addbill from './components/Addbill';

import Alltrans from './components/Alltrans';
import Edittrans from './components/Edittrans';

import Restore from './components/Restore';
import Find from './components/Find';

class App extends Component{

  state = {
    cat: [],
    bills: [],
    trans: [],
    Abills: [],
    Asections: []
  }

  componentDidMount() {
    this.runData();
  }

    runData = () => {
      axios.all([
        axios.get("/sections"),
        axios.get("/bills"),
        axios.get("/trans"),
        axios.get("/other/bills"),
        axios.get("/other/sections")
      ])
      .then(axios.spread( (cat, bills, trans, allBills, allSections) => {
        this.setState({
          cat: cat.data,
          bills: bills.data,
          trans: trans.data,
          Abills: allBills.data,
          Asections: allSections.data
        })
      }))
    }

  render() {
    return (
      <div className="App">
        <Router>
        <Header />
          <Switch>
            <Route exact path="/" component={() => <Pageone list={this.state.cat} />} />
            <Route exact path="/view" component={() => <Pagetwo bills={this.state.bills} trans={this.state.trans} />} />
            <Route exact path="/settings" component={Pagethree} />
            <Route exact path="/categories" component={() => <Allcat cat={this.state.cat} />} />
            <Route exact path="/cat/:id" component={() => <Editcat runData={this.runData} cat={this.state.cat} />} />
            <Route exact path="/add/cat" component={Addcat} />
            <Route exact path="/bills" component={() => <Allbills bills={this.state.bills} />} />
            <Route exact path="/bill/:id" component={() => <Editbill runData={this.runData} bills={this.state.bills} />} />
            <Route exact path="/add/bill" component={Addbill} />
            <Route exact path="/trans" component={() => <Alltrans trans={this.state.trans} />} />
            <Route exact path="/trans/:id" component={() => <Edittrans list={this.state.cat} trans={this.state.trans} />} />
            <Route exact path="/restore" component={() => <Restore delBills={this.state.Abills} delCat={this.state.Asections} />} />
            <Route exact path="/find" component={() => <Find list={this.state.cat} />} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
