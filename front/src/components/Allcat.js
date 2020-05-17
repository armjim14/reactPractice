import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";

export default class Allcat extends Component {

    state = {
        names: []
    }

    componentDidMount() {
        this.setState({names: this.props.cat}, () => {
            this.sectionNames()
        })
    }

    sectionNames = () => {
        return (
            <Fragment>
                { this.state.names.map(item => { 
                    return <div key={item.CatID} className="bigBox">
                        <div className="smallBox">
                            <Link to={`/cat/${item.CatID}`} className="cen forLink addH">{item.sectionName}</Link>
                        </div>
                    </div>
                }) }
            </Fragment>
        )
    }

    render() {
        return (
            <div>
                <h2 className="title">Categories</h2>
                {this.sectionNames()}
            </div>
        )
    }
}
