import React, { Component } from "react";
import {
    MDBCol, MDBFormInline, MDBBtn, MDBNavbarBrand, MDBNavbarToggler, MDBNavItem,
    MDBNavbar, MDBNavLink, MDBCollapse, MDBNavbarNav
} from
    "mdbreact";
import { keyword } from "./Search";

class Header extends Component {
    state = {
        collapsed: false,
        input:""
    }

    handleTogglerClick = () => {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    handleNavbarClick = (event) => {
        event.preventDefault();
        // console.log(this.state.input)
        keyword.search=this.state.input
        
        this.setState({
            collapsed: false
        });
        this.props.setWord(keyword.search)
    }
    handleChange=(event)=>{
        const { value } = event.currentTarget;
        this.setState({
            input:value
        })
    }

    render() {
        return (
            <MDBCol md="12">
                <MDBNavbar color="deep-purple" className="text-white darken-3" dark expand="md">
                    <MDBNavbarBrand>WeatherApp</MDBNavbarBrand>
                    <MDBNavbarToggler onClick={this.handleTogglerClick} />
                        <MDBCollapse isOpen={this.state.collapsed} navbar>
                            <MDBNavbarNav left>
                                <MDBNavItem active>
                                    <MDBNavLink to="/">Home</MDBNavLink>
                                </MDBNavItem>
                            </MDBNavbarNav>
                            <MDBNavbarNav right >
                                <MDBFormInline className="md-form mr-auto m-0">
                                    <input className="form-control mr-sm-2" style={{backgroundColor:"white",color:"black"}} name="input" onChange={(event)=>this.handleChange(event)}  type="text" placeholder="Search by City ,Country......" aria-label="Search" />
                                    <MDBBtn outline color="white" size="sm" type="submit" className="mr-auto"
                                    onClick={(event)=>this.handleNavbarClick(event)}>
                                        Search
                                   </MDBBtn>
                                </MDBFormInline>
                            </MDBNavbarNav>
                        </MDBCollapse>
                </MDBNavbar>
            </MDBCol>
        );
    }
}

export default Header;