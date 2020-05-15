import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header>
               <div onClick={this.props.changePage.bind(this, 1)} className="button border-right">
                    One
               </div>
               <div onClick={this.props.changePage.bind(this, 2)} className="button border-right">
                    Two
               </div>
               <div onClick={this.props.changePage.bind(this, 3)} className="button none-border-right">
                    Three
               </div>
               <hr className="longLine" />
            </header>
        )
    }
}

export default Header
