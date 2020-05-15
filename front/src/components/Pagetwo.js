import React, { Component } from 'react'

class Pagetwo extends Component {

    state = {
        turn: 0
    }

    changeView = function() {
        if ( this.state.turn === 0 ){
            document.getElementById("changeText").innerText = "View spending";
            this.setState({turn: 1})
        } else {
            document.getElementById("changeText").innerText = "View bills";
            this.setState({turn: 0})
        }
    }

    render() {
        return (
            <div>
                <div className="bigBox">
                    <div className="smallBox">
                        <button onClick={() => this.changeView()} id="changeText">View bills</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default  Pagetwo
