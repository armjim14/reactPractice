import React, { Component } from 'react';
import axios from 'axios';

class Pageone extends Component {

    state = {
        list: [],
        amount: 0,
        details: "",
        value: 0,
        date: ""
    }

    componentDidMount() {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd
        console.log(today)
        if ( this.props.list[0] ){
            this.setState({list: this.props.list, amount: this.state.amount, details: this.state.details, value: this.props.list[0].CatID.toString(), date: today})
        } else {
            console.log("waiting...")
        }
    }

    updateInput = e => {
        const value = e.target.value;
        this.setState({
          ...this.state,
          [e.target.name]: value
        });
    }

    addTrans = e => {
        e.preventDefault()
        console.log(this.state)
        axios.post(`/add/trans`, this.state)
        .then( res => {
            if (res.data.added){
                window.location.href = "/bills"
            } else {
                alert('error')
            }
        })
    }

    getSections = () => {
        let listItems = this.state.list;

        let items = listItems.map( (item) => <option key={item.CatID} value={item.CatID}>{item.sectionName}</option>)

        return ( <select name="value" value={this.state.value} onChange={this.updateInput} className="forInput" id="cat"> {items} </select>)
    }

    render() {
        return (
            <form onSubmit={this.addTrans}>

                <h2 className="title">Enter Amount</h2>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Category: </span>
                        {this.getSections()}
                    </div>
                </div>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Details: </span>
                        <input name="details" value={this.state.details} onChange={this.updateInput} className="forInput" type="text" />
                    </div>
                </div>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Amount: </span>
                        <input name="amount" value={this.state.amount} onChange={this.updateInput} className="forInput" type="number" />
                    </div>
                </div>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Amount: </span>
                        <input name="date" value={this.state.date} onChange={this.updateInput} className="forInput" type="date" />
                    </div>
                </div>

                <div className="bigBox">
                    <div className="smallBox">
                        <input type="submit" value="Add transaction" />
                    </div>
                </div>

            </form>
        )
    }
}

export default  Pageone