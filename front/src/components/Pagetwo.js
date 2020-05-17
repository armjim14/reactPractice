import React, { Component } from 'react'

class Pagetwo extends Component {

    state = {
        turn: 0,
        bills: [],
        trans: []
    }

    changeView = () => {
        if ( this.state.turn === 0 ){
            document.getElementById("changeText").innerText = "View Transactions";
            this.setState({turn: 1, bills: this.state.bills, trans: this.state.trans})
            this.switchTable()
        } else {
            document.getElementById("changeText").innerText = "View bills";
            this.setState({turn: 0, bills: this.state.bills, trans: this.state.trans})
            this.switchTable()
        }
    }

    switchTable = () => {
        if(this.state.turn === 0){
            document.getElementById("forSpending").style.display = "none";
            document.getElementById("forBills").style.display = "block";

            document.getElementById("subTitle").innerText = "Bills";
        } else {
            document.getElementById("forBills").style.display = "none";
            document.getElementById("forSpending").style.display = "block";

            document.getElementById("subTitle").innerText = "Transactions";
        }
    }

    getData = num => {
        let arr = num === 1 ? this.state.bills : this.state.trans;
        let title = num === 1 ? 'Bills' : 'Transactions';

        let forTd = arr.map( (item, i) => {
            let name = num === 1 ? item.billName : item.transName;
            let date = num === 1 ? item.dueDate : item.theDate;

            return (
                <tr key={i}>
                    <td>{name}</td>
                    <td>{date}</td>
                    <td>{item.amount}</td>
                </tr>
            )
        })

        return (
            <tbody>
                <tr>
                    <td>{`${title}`}</td>
                    <td>Date</td>
                    <td>amount</td>
                </tr>
                {forTd}
            </tbody>
        )
    }

    componentDidMount() {
        this.setState({bills: this.props.bills, trans: this.props.trans, turn: 0}, () => {
            this.changeView()
        })
    }

    render() {
        return (
            <div>
                <h2 className="title">Remaining</h2>
                <p className="cen">50 for 5 days</p>
                <div className="bigBox">
                    <div className="smallBox">
                        <button onClick={() => this.changeView()} id="changeText">View bills</button>
                    </div>
                </div>
                <hr className="smallLine" />
                <h2 id="subTitle" className="title">Spending</h2>
                <div className="bigBox">
                    <div className="smallBox">
                        <table id="forBills">
                            {this.getData(1)}
                        </table>
                        <table id="forSpending">
                            {this.getData(2)}
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

export default  Pagetwo
