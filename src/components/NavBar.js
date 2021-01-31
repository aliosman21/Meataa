import React, { Component } from "react";
import {
   MDBNavbar,
   MDBNavbarBrand,
   MDBNavbarNav,
   MDBNavItem,
   MDBNavLink,
   MDBNavbarToggler,
   MDBCollapse,
   MDBDropdown,
   MDBDropdownToggle,
   MDBDropdownMenu,
   MDBDropdownItem,
   MDBContainer,
   MDBIcon,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

class Navbar extends Component {
   state = {
      loggedIn: true,
      messages: 0,
      collapseID: "",
   };

   toggleCollapse = (collapseID) => () =>
      this.setState((prevState) => ({
         collapseID: prevState.collapseID !== collapseID ? collapseID : "",
      }));
   render() {
      const renderAuthButton = () => {
         if (this.state.loggedIn) {
            return (
               <MDBNavbarNav right>
                  <MDBNavItem className="pt-1 ">
                     <MDBNavLink
                        className="waves-effect waves-light d-flex align-items-center"
                        to="#!">
                        {this.state.messages}
                        <MDBIcon icon="envelope-open-text" className="ml-2 pb-1" />
                     </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                     <MDBDropdown>
                        <MDBDropdownToggle className="dopdown-toggle" nav>
                           <img
                              src="https://mdbootstrap.com/img/Photos/Avatars/avatar-2.jpg"
                              className="rounded-circle z-depth-0"
                              style={{ height: "30px", padding: 0 }}
                              alt="profilePic"
                           />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default" right>
                           <MDBDropdownItem href="#!" className="text-right">
                              <p className="p-0 m-0 font-weight-bold"> حسابي </p>
                           </MDBDropdownItem>
                           <MDBDropdownItem href="#!" className="text-right">
                              <p className="p-0 m-0 font-weight-bold"> تسجيل الخروج </p>
                           </MDBDropdownItem>
                        </MDBDropdownMenu>
                     </MDBDropdown>
                  </MDBNavItem>
               </MDBNavbarNav>
            );
         } else {
            return (
               <MDBNavbarNav right>
                  <MDBNavItem className="pl-5">
                     <MDBNavLink to="#!" className=" text-right ">
                        <p className="p-0 m-0 font-weight-bold"> تسجيل الدخول </p>
                     </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem className="pl-5 ">
                     <MDBNavLink to="#!" className=" text-right ">
                        <p className="p-0 m-0 font-weight-bold"> انضم الينا </p>
                     </MDBNavLink>
                  </MDBNavItem>
               </MDBNavbarNav>
            );
         }
      };
      return (
         <Router>
            <MDBNavbar color="stylish-color-dark" dark expand="md" className="z-depth-4 sticky-top">
               <MDBNavbarBrand>
                  <strong className="black-text">Logo</strong>
               </MDBNavbarBrand>
               <MDBNavbarToggler onClick={this.toggleCollapse("navbarCollapse3")} />
               <MDBCollapse id="navbarCollapse3" isOpen={this.state.collapseID} navbar>
                  <MDBNavbarNav left className="pl-5 ">
                     <MDBNavItem className="pl-5">
                        <MDBNavLink to="#!" className="text-right">
                           <p className="p-0 m-0 font-weight-bold"> المجالات </p>
                        </MDBNavLink>
                     </MDBNavItem>
                     <MDBNavItem className="pl-5 ">
                        <MDBNavLink to="#!" className=" text-right ">
                           <p className="p-0 m-0 font-weight-bold"> شيء اخر </p>
                        </MDBNavLink>
                     </MDBNavItem>
                  </MDBNavbarNav>
                  {renderAuthButton()}
               </MDBCollapse>
            </MDBNavbar>
         </Router>
      );
   }
}

export default Navbar;
