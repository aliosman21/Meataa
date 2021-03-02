import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
 MDBIcon } from "mdbreact";
import Cookies from 'js-cookie';
import "../styles/navigation.css"
import JsonData from "../data/data.json";
import image from "../styles/logo.png"

class NavbarPage extends Component {
   constructor(props) {
    super(props);
     this.state = {
  collapseID: ""
  };
    this.logoutHandler = this.logoutHandler.bind(this);
  }

 logoutHandler = async (e) =>{
    console.log(e);
    Cookies.remove('session');
    window.location.href="/"


  } 

toggleCollapse = collapseID => () =>
  this.setState(prevState => ({
  collapseID: prevState.collapseID !== collapseID ? collapseID : ""
}));

render() {
  return (
      <MDBNavbar color="indigo" dark expand="md" style ={{marginBottom:"0"}} className="customNavibar">
        <MDBNavbarBrand href="/" className="logoCus" >  
         <img src={image} height="100" width="110" alt="logo" className="imgLogo"/>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar >
          
          <MDBNavbarNav right>
             {Cookies.getJSON('session')?
             
             ( 
             <>
                         
            {Cookies.getJSON('session').type === "admin"?(<>
            
            <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/addNewTag">
                <MDBIcon icon="hands-helping" className="mr-1" />{JsonData.Navigation.AddTags}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/AllVolunteers">
                <MDBIcon icon="user-tie" className="mr-1" />{JsonData.Navigation.AllVolunteers}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/AllOrganizations">
                <MDBIcon icon="users" className="mr-1" />{JsonData.Navigation.AllOrganizations}</MDBNavLink>
            </MDBNavItem>
            </>):(<></>)}
            {Cookies.getJSON('session').type === "Organization"?(<>
              <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/newEvent">
                <MDBIcon icon="plus" className="mr-1" />{JsonData.Navigation.NewEvent}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/MyEvents">
                <MDBIcon icon="hands-helping" className="mr-1" />{JsonData.Navigation.MyEvents}</MDBNavLink>
            </MDBNavItem>
            </>
              ):(<></>)}
              <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/search">
                <MDBIcon icon="search" className="mr-1" />{JsonData.Navigation.Search}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/profile">
                <MDBIcon icon="sign-in-alt" className="mr-1" />{Cookies.getJSON('session').name}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>  
              <MDBNavLink className="waves-effect waves-light" to="/" onClick={this.logoutHandler}>
                <MDBIcon icon="sign-out-alt" className="mr-1" />{JsonData.Navigation.Logout}</MDBNavLink>
            </MDBNavItem>
             </>)
             
             :(<>
             <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/search">
                <MDBIcon icon="search" className="mr-1" />{JsonData.Navigation.Search}</MDBNavLink>
            </MDBNavItem>
               <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/login">
                <MDBIcon icon="sign-in-alt" className="mr-1" />{JsonData.Navigation.Login}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>  
              <MDBNavLink className="waves-effect waves-light" to="/register">
                <MDBIcon icon="user-plus" className="mr-1" />{JsonData.Navigation.Register}</MDBNavLink>
            </MDBNavItem>
             
             </>)}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      

    );
  }
}

export default NavbarPage;