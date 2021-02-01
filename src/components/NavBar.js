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
   MDBIcon,
} from "mdbreact";
import Modal from "./Modal";

class Navbar extends Component {
   state = {
      loggedIn: false,
      messages: 0,
      collapseID: "",
      modalShow: false,
      modalType: false,
   };
   //modal choice = 0 --> Login Modal /// Non-Zero ---> Reg Modal
   //Handlers-------------------------------------------------
   /*    registerHandler = (e) => {
      this.setState({ loggedIn: false });
   }; */
   componentDidMount() {
      //check if localstorage has token set loggedIn with true
      if (localStorage.getItem("token") !== null) {
         this.setState({ loggedIn: true });
      }
   }
   logoutHandler = (e) => {
      this.setState({ loggedIn: false });
      localStorage.removeItem("token");
      console.log("Logout Handler " + this.state.loggedIn);
   };
   loginHandler = (e) => {
      this.setState({ loggedIn: true });
      localStorage.setItem("token", "123");
      console.log("Login Handler " + this.state.loggedIn);
   };
   modalHider = () => {
      this.setState({ modalShow: false });
   };
   modalShower = (e, modalType) => {
      this.setState({ modalShow: true });
      this.setState({ modalType: modalType });
   };
   //Handlers-------------------------------------------------

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
                        <MDBDropdownToggle className="dropdown-toggle" nav>
                           <MDBIcon icon="user" />
                        </MDBDropdownToggle>
                        <MDBDropdownMenu className="dropdown-default" right>
                           <MDBDropdownItem href="./profile" className="text-right">
                              <p className="p-0 m-0 font-weight-bold"> حسابي </p>
                           </MDBDropdownItem>
                           <MDBDropdownItem
                              to=""
                              onClick={(e) => this.logoutHandler(e)}
                              href="./"
                              className="text-right">
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
                     <MDBNavLink
                        to="#!"
                        onClick={(e) => this.modalShower(e, 0)}
                        className=" text-right ">
                        <p className="p-0 m-0 font-weight-bold"> تسجيل الدخول </p>
                     </MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem className="pl-5 ">
                     <MDBNavLink
                        to="#!"
                        onClick={(e) => this.modalShower(e, 1)}
                        className=" text-right ">
                        <p className="p-0 m-0 font-weight-bold"> انضم الينا </p>
                     </MDBNavLink>
                  </MDBNavItem>
               </MDBNavbarNav>
            );
         }
      };
      return (
         <MDBNavbar color="stylish-color-dark" dark expand="md" className="z-depth-4 sticky-top">
            <MDBNavbarBrand>
               <MDBNavLink to="/">
                  <strong className="black-text">Logo</strong>
               </MDBNavLink>
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
                     <MDBNavLink to="#" className=" text-right ">
                        <p className="p-0 m-0 font-weight-bold"> اخري </p>
                     </MDBNavLink>
                  </MDBNavItem>
               </MDBNavbarNav>
               {renderAuthButton()}
            </MDBCollapse>
            <Modal
               modal={this.state.modalType}
               show={this.state.modalShow}
               // loggedin={this.state.loggedIn ? 1 : 0}
               loginhandler={this.loginHandler}
               onHide={() => this.modalHider()}
            />
         </MDBNavbar>
      );
   }
}

export default Navbar;
