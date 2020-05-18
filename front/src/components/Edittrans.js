import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Edittrans extends Component {

    state = {
        num: 0,
        notes: "",
        date: "",
        amount: 0,
        section: 0,
        list: []
    }

    componentDidMount() {
        this.setState({num: +window.location.pathname.split("/")[2], notes: "", date: "", amount: 0, section: 0, list: []}, () => {
            this.updateInfo(this.state.num)
        })
    }

    updateInfo = async num => {
        let theInfo = await this.props.trans.find( item => item.TransID === num)

        if (!theInfo){
            console.log("waiting...")
        } else {
            let dateFields = theInfo.theDate.split("T")[0];
            this.setState({num, notes: theInfo.notes, date: dateFields, amount: theInfo.amount.toString(), section: theInfo.SectionID.toString(), list: this.props.list})
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
            notes: this.state.notes,
            date: this.state.date,
            amount: +this.state.amount,
            section: +this.state.section
        }

        axios.put(`/update/trans`, ob)
        .then( res => {
            console.log(res.data.updated)
            if (res.data.updated){
                window.location.href = "/trans"
            } else {
                alert('error')
            }
        })
    }

    getSections = () => {
        let listItems = this.state.list;

        let items = listItems.map( (item) => <option key={item.CatID} value={item.CatID}>{item.sectionName}</option>)

        return ( <select name="section" value={this.state.section} onChange={this.updateInput} className="forInput" id="cat"> {items} </select>)
    }

    forDisplay = () => {
        let name = this.state.notes;

        if (!name){
            return ( <h1 className="title">Loading...</h1>)
        } else {
            return (
                <form onSubmit={this.updateData}>
                    <input name="notes" className="mt-25" value={this.state.notes} type="text" onChange={this.updateInput} />
                    <input name="date" className="mt-25" value={this.state.date} type="date" onChange={this.updateInput} />
                    <input name="amount" className="mt-25" value={this.state.amount} type="number" onChange={this.updateInput} />
                    {this.getSections()}
                    <input type="submit" value="Update" />
                </form>
            )
        }
    }

    deleteTran = id => {
        axios.delete(`/del/trans/${id}`)
        .then(res => res.data.deleted ? window.location.href = "/trans" : alert("error"))
    }

    render() {
        return (
            <Fragment>
                <h1 className="title cen">{!this.state.notes ? "Loading..." : this.state.notes}</h1>
                <div className="bigBox">
                    <div className="smallBox">
                        {this.forDisplay()}
                    </div>
                </div>
                <div className="bigBox mt-25">
                    <div className="smallBox">
                        <button onClick={this.deleteTran.bind(this, this.state.num)}>Delete</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}
