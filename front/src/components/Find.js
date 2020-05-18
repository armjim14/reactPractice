import React, { Component, Fragment } from 'react'
import axios from 'axios';

export default class Find extends Component {

    state = {
        from: "",
        to: "",
        value: "0",
        list: [],
        amountFrom: "0",
        amountTo: "0",
        data: []
    }

    componentDidMount() {
        if ( this.props.list[0] ){

            let eList = this.props.list;
            eList.unshift({CatID: 0, sectionName: "None"});

            this.setState({
                from: "",
                to: "",
                value: "0",
                list: this.props.list,
                amountFrom: "0",
                amountTo: "0",
                data: []
            })
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

    getSections = () => {
        let listItems = this.state.list;

        let items = listItems.map( (item) => <option key={item.CatID} value={item.CatID}>{item.sectionName}</option>)
        return ( <select name="value" value={this.state.value} onChange={this.updateInput} className="forInput" id="cat"> {items} </select>)
    }

    findTransaction = e => {
        e.preventDefault();

        let fd = false;
        let fsd = false;
        let fa = false;
        let fsa = false
        let fs = false;

        if ( this.state.from !== "" || this.state.to !== "" ){
            fsd = true
        }
        if (this.state.from !== "" && this.state.to !== ""){
            fd = true;
            fsd = false
        }
        if (this.state.amountFrom !== "0" || this.state.amountTo !== "0"){
            fsa = true
        }
        if (this.state.amountFrom !== "0" && this.state.amountTo !== "0"){
            fa = true;
            fsa = false
        }
        if (this.state.value !== "0"){
            fs = true
        }

        let singDate = null;
        if (fsd === true){
            singDate = this.state.to === "" ? 1 : 2
        }

        let singAmount = null;
        if (fsa === true){
            singAmount = this.state.amountTo === "0" ? 1 : 2
        }

        let ob = {
            fd,
            fsd,
            fa,
            fsa,
            fs,
            fromDate: this.state.from,
            toDate: this.state.to,
            singDate,
            fromAmount: +this.state.amountFrom,
            toAmount: +this.state.amountTo,
            singAmount,
            catid: +this.state.value
        }

        axios.post('/filter', ob)
        .then(res => {
            this.setState({
                ...this.state,
                data: res.data
            })
        })

    }

    showData = () => {

        let info = this.state.data.map( item => {
            let secName = this.state.list.find( na => na.CatID === item.SectionID);
            let date = item.theDate.split("T")[0].split("-");
            let niceDate = `${date[1]}/${date[2]}/${date[0]}`;
            return (
                <Fragment key={item.TransID}>
                    <tr>
                        <td>{item.notes}</td>
                        <td>{niceDate}</td>
                        <td>{item.amount}</td>
                        <td>{secName.sectionName}</td>
                    </tr>
                </Fragment>
            )
        })


        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {info}
                </tbody>
            </table>
        )
    }

    render() {
        return (
            <form onSubmit={this.findTransaction}>
                <h2 className="title">Find Transaction</h2>
                <div className="bigBox">
                    <div className="smallBox">
                        <input name="from" type="date" value={this.state.from} onChange={this.updateInput} />
                        <span style={{padding: '0px 10px'}}>To</span>
                        <input name="to" type="date" value={this.state.to} onChange={this.updateInput} />
                    </div>
                </div>
                <div className="bigBox">
                    <div className="smallBox">
                        <input className="cen" name="amountFrom" type="number" value={this.state.amountFrom} onChange={this.updateInput} />
                        <span style={{padding: '0px 10px'}}>To</span>
                        <input className="cen" name="amountTo" type="number" value={this.state.amountTo} onChange={this.updateInput} />
                    </div>
                </div>
                <div className="bigBox">
                    <div className="smallBox">
                        <span style={{paddingRight: '10px'}}>Category: </span>{this.getSections()}
                    </div>
                </div>
                <div className="bigBox">
                    <div className="smallBox">
                        <input type="submit" value="Find" />
                    </div>
                </div>
                <hr className="smallLine" />
                <div className="bigBox">
                    <div className="smallBox">
                        {this.showData()}
                    </div>
                </div>
            </form>
        )
    }
}
