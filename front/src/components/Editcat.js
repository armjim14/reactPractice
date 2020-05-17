import React, { Component, Fragment } from 'react';
import axios from 'axios';

export default class Editcat extends Component {

    state = {
        num: 0,
        info: "",
        lastInfo: ""
    }

    componentDidMount() {
        this.setState({num: +window.location.pathname.split("/")[2], info: "", lastInfo: ""}, () => {
            this.updateInfo(this.state.num)
        })
    }

    updateInfo = async num => {
        let theInfo = await this.props.cat.find( item => item.CatID === num)

        if (!theInfo){
            console.log("waiting...")
        } else {
            this.setState({num, info: theInfo.sectionName, lastInfo: theInfo.sectionName})
        }
    }

    updateInput = e => {
        this.setState({num: this.state.num, info: e.target.value, lastInfo: this.state.lastInfo})
    }

    updateData = e => {
        e.preventDefault()
        if ( this.state.info === this.state.lastInfo){
            alert("No update available to be made")
        } else {
            console.log(this.state)
            axios.put(`/update/cat`, {id: this.state.num, newName: this.state.info})
            .then( res => {
                console.log(res.data.updated)
                if (res.data.updated){
                    window.location.href = "/categories"
                } else {
                    alert('error')
                }
            })
        }
    }

    forDisplay = () => {
        let name = this.state.info;

        if (!name){
            return ( <h1 className="title">Loading...</h1>)
        } else {
            return (
                <form onSubmit={this.updateData}>
                    <h1 className="title cen">{this.state.info}</h1>
                    <input className="mt-25" value={this.state.info} type="text" onChange={this.updateInput} />
                    <input type="submit" value="Update" />
                </form>
            )
        }
    }

    render() {
        return (
            <Fragment>
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
