import React from "react";
import NavbarItem from "./navbarItem";

function Navbar(){
    return(
        <div>

            <div className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">
                <div className="container">
                <a href="/" className="navbar-brand">Minhas Finanças</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                <div className="collapse navbar-collapse" id="navbarResponsive">

                    <ul className="navbar-nav">
                        <NavbarItem href='/home' label='Home' />
                        
                        <NavbarItem href='/lancamentos' label='Lançamentos' />

                        <NavbarItem href='/login' label='Login' />
                            
                            
                    </ul>
            
                </div>

                </div>
            </div>
        </div>

    )
}

export default Navbar