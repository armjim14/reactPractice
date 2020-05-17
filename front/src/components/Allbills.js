import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

export default class Allbills extends Component {

    state = {
        names: []
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({names: this.props.bills}, () => {
            console.log(this.state)
            this.sectionNames()
        })
    }

    sectionNames = () => {
        return (
            <Fragment>
                { this.state.names.map(item => { 
                    return <div key={item.BillID} className="bigBox">
                        <div className="smallBox">
                            <Link to={`/bill/${item.BillID}`} className="cen forLink addH">{item.billName}</Link>
                        </div>
                    </div>
                }) }
            </Fragment>
        )
    }

    render() {
        return (
            <div>
                <h2 className="title">Bills</h2>
                <div className="bigBox">
                    <div className="smallBox">
                        <Link style={{color: '#488a00'}} to={`/add/bill`} className="cen forLink addH">Add new Bill</Link>
                    </div>
                </div>
                <hr className="smallLine" />
                {this.sectionNames()}
            </div>
        )
    }
}
