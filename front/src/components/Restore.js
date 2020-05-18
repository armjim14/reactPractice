import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';

export default class Restore extends Component {

    state = {
        bills: [],
        sections: []
    }

    componentDidMount() {
        this.setState({bills: this.props.delBills, sections: this.props.delCat}, () => {
            let starting = document.getElementById("forBills");
            if(!starting){
                console.log("waiting");
            } else {
                starting.style.display = "none";
    
                this.sectionNames();
                this.billNames();
            }
        })
    }

    sectionNames = () => {
        return (
            <Fragment>
                { this.state.sections.map(item => { 
                    return <div key={item.CatID} className="bigBox">
                        <div className="smallBox">
                            <button onClick={this.activate.bind(this, {id: item.CatID, turn: 2})}>Restore: {item.sectionName}</button>
                        </div>
                    </div>
                }) }
            </Fragment>
        )
    }

    activate = ob => {
        console.log(ob)
        let str = ob.turn === 1 ? 'bill' : 'cat'
        axios.put(`/restore/${str}`, {id: ob.id})
        .then(res => res.data.updated ? window.location.href = "/settings" : alert("error"))
    }

    billNames = () => {
        return (
            <Fragment>
                { this.state.bills.map(item => { 
                    return <div key={item.BillID} className="bigBox">
                        <div className="smallBox">
                            <button onClick={this.activate.bind(this, {id: item.BillID, turn: 1})}>Restore: {item.billName} - ${item.amount}</button>
                        </div>
                    </div>
                }) }
            </Fragment>
        )
    }

    changeView = () => {
        let billsGone = document.getElementById("forBills").style.display === "none";
        if (billsGone){
            document.getElementById("forSections").style.display = "none";
            document.getElementById("forBills").style.display = "block";
        } else {
            document.getElementById("forSections").style.display = "block";
            document.getElementById("forBills").style.display = "none";
        }
    }

    render() {
        return (
            <div>
                <div className="bigBox">
                    <div className="smallBox">
                        <button onClick={this.changeView}>Change</button>
                    </div>
                </div>
                <div id="forSections">
                    <h2 className="title">Unactive Categories</h2>
                    <div className="bigBox">
                        <div className="smallBox">
                            <Link style={{color: '#488a00'}} to={`/settings`} className="cen forLink addH">Back</Link>
                        </div>
                    </div>
                    <hr className="smallLine" />
                    {this.sectionNames()}
                </div>
                <div id="forBills">
                    <h2 className="title">Unactive bills</h2>
                    <div className="bigBox">
                        <div className="smallBox">
                            <Link style={{color: '#488a00'}} to={`/settings`} className="cen forLink addH">Back</Link>
                        </div>
                    </div>
                    <hr className="smallLine" />
                    {this.billNames()}
                </div>
            </div>
        )
    }
}
