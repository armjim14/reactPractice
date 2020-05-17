import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Editbill extends Component {

    state = {
        num: 0,
        billName: "",
        date: "",
        amount: 0
    }

    componentDidMount() {
        this.setState({num: +window.location.pathname.split("/")[2], billName: "", date: "", amount: 0}, () => {
            this.updateInfo(this.state.num)
        })
    }

    updateInfo = async num => {
        let theInfo = await this.props.bills.find( item => item.BillID === num)

        if (!theInfo){
            console.log("waiting...")
        } else {
            let dateFields = theInfo.dueDate.split("T")[0];
            this.setState({num, billName: theInfo.billName, date: dateFields, amount: theInfo.amount})
        }
    }

    updateInput = e => {
        const value = e.target.value;
        this.setState({
          ...this.state,
          [e.target.name]: value
        });
    }

    updateData = e => {
        e.preventDefault()
        let ob = {
            id: this.state.num,
            newName: this.state.billName,
            amount: this.state.amount,
            date: this.state.date
        }
        axios.put(`/update/bill`, ob)
        .then( res => {
            console.log(res.data.updated)
            if (res.data.updated){
                window.location.href = "/bills"
            } else {
                alert('error')
            }
        })
    }

    forDisplay = () => {
        let name = this.state.billName;

        if (!name){
            return ( <h1 className="title">Loading...</h1>)
        } else {
            return (
                <form onSubmit={this.updateData}>
                    <input name="billName" className="mt-25" value={this.state.billName} type="text" onChange={this.updateInput} />
                    <input name="date" className="mt-25" value={this.state.date} type="date" onChange={this.updateInput} />
                    <input name="amount" className="mt-25" value={this.state.amount} type="number" onChange={this.updateInput} />
                    <input type="submit" value="Update" />
                </form>
            )
        }
    }

    render() {
        return (
            <Fragment>
                <h1 className="title cen">{!this.state.billName ? "Loading..." : this.state.billName}</h1>
                <div className="bigBox">
                    <div className="smallBox">
                        Bill name --- Next due date --- amount
                    </div>
                </div>
                <div className="bigBox">
                    <div className="smallBox">
                        {this.forDisplay()}
                    </div>
                </div>
                <div className="bigBox mt-25">
                    <div className="smallBox">
                        <button>Delete</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}
