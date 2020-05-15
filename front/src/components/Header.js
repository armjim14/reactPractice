import React, { Component } from 'react'

class Header extends Component {
    render() {
        return (
            <header>
               <div className="button border-right">
                    One
               </div>
               <div className="button border-right">
                    Two
               </div>
               <div className="button none-border-right">
                    Three
               </div>
               <hr className="longLine" />
            </header>
        )
    }
}

export default Header
