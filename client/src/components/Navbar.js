import React from 'react'

 function Navbar() {
    return (
        <div>
            <nav className="navbar navbar-light bg-light">
                <a className="navbar-brand" href="/">
                <span style={{color: 'DodgerBlue'}}><i className="fa fa-stack-exchange" aria-hidden="true"></i></span>
                  &nbsp;Star Wars API 
                </a>
            </nav>
        </div>
    )
}

export default Navbar;