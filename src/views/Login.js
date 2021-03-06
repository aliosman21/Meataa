import React, { Component } from "react";
import axios from "axios";
import serverURL from "../Utils/global";
import Cookies from "js-cookie";
import Banner from "../components/banner";
import "../styles/login.css";
import Footer from "../components/footer";
import { withAlert } from "react-alert";
import JsonData from "../data/data.json";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

class Login extends Component {
   constructor(props) {
      super(props);
      this.state = {
         email: "",
         password: "",
      };
   }

   handleFieldChange(e) {
      this.setState((state) => {
         return { [e.target.name]: e.target.value };
      });
   }

   loginHandler(e) {
      e.preventDefault();
      let loginData = {
         email: this.state.email,
         password: this.state.password,
      };

      axios
         .post(serverURL + "/login", loginData)
         .then((res) => {
            if (res.status === 200) {
               let in1Hour = 1 / 24;
               Cookies.set(
                  "session",
                  {
                     token: res.data[0].original.token,
                     email: res.data[1].email,
                     img: res.data[1].img,
                     NID: res.data[1].NID,
                     tags: res.data[1].tags,
                     name: res.data[1].name,
                     mobile2: res.data[1].mobile2,
                     mobile: res.data[1].mobile,
                     type: res.data[1].type,
                  },
                  {
                     expires: in1Hour,
                  }
               );

               window.location.href = "/";
            } else {
               console.log(res);
            }
         })
         .catch((err) => {
            this.props.alert.error(JsonData.Login.loginAlertError);
         });
   }

   render() {
      return (
         <>
            <Banner data={{ header: "تسجيل الدخول" }} />
            <div className="custom-content-login">
               <MDBContainer>
                  <MDBRow>
                     <MDBCol md="3"></MDBCol>
                     <MDBCol md="6" className="loginFormHolder">
                        <form>
                           <p className="h5 text-center mb-4 mt-4 headerText">
                              {JsonData.Login.header}
                           </p>
                           <div className="grey-text">
                              <MDBInput
                                 className="textDirection"
                                 label={JsonData.Login.email}
                                 icon="envelope"
                                 name="email"
                                 size="lg"
                                 group
                                 type="email"
                                 validate
                                 onChange={(e) => {
                                    this.handleFieldChange(e);
                                 }}
                                 error="wrong"
                                 success="right"
                              />
                              <MDBInput
                                 label={JsonData.Login.password}
                                 icon="lock"
                                 group
                                 name="password"
                                 size="lg"
                                 className="textDirection"
                                 onChange={(e) => {
                                    this.handleFieldChange(e);
                                 }}
                                 type="password"
                                 validate
                              />
                           </div>
                           <div className="text-center">
                              <MDBBtn
                                 color="green"
                                 type="submit"
                                 className="loginBtn"
                                 onClick={(e) => this.loginHandler(e)}>
                                 {JsonData.Login.loginBtn}
                              </MDBBtn>
                           </div>
                        </form>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
            </div>
            <Footer />
         </>
      );
   }
}
export default withAlert()(Login);
