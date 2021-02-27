import React, { Component } from "react";
import { MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
 MDBIcon } from "mdbreact";
import Cookies from 'js-cookie';
import "../styles/navigation.css"
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
                <MDBIcon icon="hands-helping" className="mr-1" />اضافه فئه</MDBNavLink>
            </MDBNavItem>
            </>):(<></>)}
            {Cookies.getJSON('session').type === "Organization"?(<>
              <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/newEvent">
                <MDBIcon icon="plus" className="mr-1" />عمل جديد</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/MyEvents">
                <MDBIcon icon="hands-helping" className="mr-1" />مبادراتي</MDBNavLink>
            </MDBNavItem>
            </>
              ):(<></>)}
              <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/search">
                <MDBIcon icon="search" className="mr-1" />بحث</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/profile">
                <MDBIcon icon="sign-in-alt" className="mr-1" />{Cookies.getJSON('session').name}</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>  
              <MDBNavLink className="waves-effect waves-light" to="/" onClick={this.logoutHandler}>
                <MDBIcon icon="sign-out-alt" className="mr-1" />تسجيل الخروج</MDBNavLink>
            </MDBNavItem>
             </>)
             
             :(<>
             <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/search">
                <MDBIcon icon="search" className="mr-1" />بحث</MDBNavLink>
            </MDBNavItem>
               <MDBNavItem style ={{fontSize:"18px"}}>
              <MDBNavLink className="waves-effect waves-light" to="/login">
                <MDBIcon icon="sign-in-alt" className="mr-1" />تسجيل الدخول</MDBNavLink>
            </MDBNavItem>
            <MDBNavItem style ={{fontSize:"18px"}}>  
              <MDBNavLink className="waves-effect waves-light" to="/register">
                <MDBIcon icon="user-plus" className="mr-1" />انضم لنا</MDBNavLink>
            </MDBNavItem>
             
             </>)}
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
      

    );
  }
}

export default NavbarPage;