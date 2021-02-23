import React, { Component } from "react";
import axios from "axios";
import serverURL from "../Utils/global";
import Cookies from "js-cookie";
import Banner from "../components/banner";
import JsonData from "../data/data.json";
import "../styles/login.css";
import Contact from "../components/contact";
import SVG from "../components/svg";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";

export default class Login extends Component {
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
      console.log(this.state.email);
      console.log(this.state.password);
      let loginData = {
         email: this.state.email,
         password: this.state.password,
      };

      axios
         .post(serverURL + "/login", loginData)
         .then((res) => {
            if (res.status === 200) {
               Cookies.set("session", {
                  token: res.data[0].original.token,
                  email: res.data[1].email,
                  img: res.data[1].img,
                  NID: res.data[1].NID,
                  tags: res.data[1].tags,
                  name: res.data[1].name,
                  mobile2: res.data[1].mobile2,
                  mobile: res.data[1].mobile,
                  type: res.data[1].type,
               });
               console.log(res);
               console.log("Cookie is");
               console.log(Cookies.getJSON("session"));
               window.location.href = "/";
            } else {
               alert("حدث حطأ ما");
            }
         })
         .catch(console.log);
   }

   render() {
      return (
         <>
            <Banner data={{ header: "تسجيل الدخول" }} />
            <SVG />
            <div className="custom-content-login">
               <MDBContainer>
                  <MDBRow>
                     <MDBCol md="3"></MDBCol>
                     <MDBCol md="6" className="loginFormHolder">
                        <form>
                           <p className="h5 text-center mb-4 mt-4 headerText">سجل دخولك</p>
                           <div className="grey-text">
                              <MDBInput
                                 className="textDirection"
                                 label="البريد الالكتروني"
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
                                 label="كلمه السر"
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
                                 سجل الدخول
                              </MDBBtn>
                           </div>
                        </form>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
            </div>
            <Contact data={JsonData} />
         </>
      );
   }
}
