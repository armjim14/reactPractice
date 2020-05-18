import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

export default class Alltrans extends Component {

    state = {
        names: []
    }

    componentDidMount() {
        console.log(this.props)
        this.setState({names: this.props.trans}, () => {
            this.sectionNames()
        })
    }

    sectionNames = () => {
        return (
            <Fragment>
                { this.state.names.map(item => { 
                    let date = item.theDate.split("T")[0].split("-");
                    let dateNice = `${date[1]}/${date[2]}/${date[0]}`
                    return <div key={item.TransID} className="bigBox">
                        <div className="smallBox">
                            <Link to={`/trans/${item.TransID}`} className="cen forLink addH">{item.notes} - ${item.amount} - {dateNice}</Link>
                        </div>
                    </div>
                }) }
            </Fragment>
        )
    }

    render() {
        return (
            <div>
                <h2 className="title">Transactions</h2>
                <div className="bigBox">
                    <div className="smallBox">
                        <Link style={{color: '#488a00'}} to={`/find`} className="cen forLink addH">Filter transactions</Link>
                    </div>
                </div>
                <hr className="smallLine" />
                {this.sectionNames()}
            </div>
        )
    }
}
