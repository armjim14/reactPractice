import React, { Component } from 'react';

class Pageone extends Component {

    state = {
        list: []
    }

    componentDidMount() {
        this.setState({list: this.props.list})
    }

    getSections = () => {
        let listItems = this.state.list;

        let items = listItems.map( (item) => <option key={item.CatID} value={item.CatID}>{item.sectionName}</option>)

        return ( <select className="forInput" id="cat"> {items} </select>)
    }

    render() {
        return (
            <div>

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
                        <input className="forInput" type="text" />
                    </div>
                </div>

                <div className="bigBox">
                    <div className="smallBox">
                        <span className="label">Amount: </span>
                        <input className="forInput" type="number" />
                    </div>
                </div>

            </div>
        )
    }
}

export default  Pageone