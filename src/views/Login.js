import React, { Component } from "react";
import axios from "axios";
import serverURL from "../Utils/global";
import Cookies from "js-cookie";
import "../styles/login.css";
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

      axios.post(serverURL + "/login", loginData).then((res) => {
         if (res.status === 200) {
            console.log(res);
            Cookies.set("session", {
               token: res.data[0].original.token,
               email: res.data[1].email,
               img: res.data[1].img,
               NID: res.data[1].NID,
               tags: res.data[1].tags,
               jobs: res.data[1].jobs,
               name: res.data[1].name,
               mobile2: res.data[1].mobile2,
               mobile: res.data[1].mobile,
               type: res.data[1].type,
               achievments: res.data[1].achievments,
            });
            window.location.href = "/";
         } else {
            alert("Something went wrong while logging in");
         }
      });
   }

   render() {
      return (
         <div className="custom-content-login">
            <div className="custom-container-login">
               <form>
                  <div className="form-container">
                     <h2 className="text-center mb-4 login-header">تسجيل الدخول</h2>
                     <div className="form-inputs">
                        <div className="grey-text">
                           <input
                              type="email"
                              name="email"
                              className="form-control"
                              onChange={(e) => {
                                 this.handleFieldChange(e);
                              }}
                              required
                           />
                           <p className="text-right custom-login-p">البريد الالكتروني</p>
                        </div>
                        <div className="grey-text">
                           <input
                              name="password"
                              type="password"
                              className="form-control"
                              onChange={(e) => {
                                 this.handleFieldChange(e);
                              }}
                              required
                           />
                           <p className="text-right custom-login-p">كلمه السر</p>
                        </div>
                     </div>
                     <div className="text-center custom-login-button">
                        <button
                           className="login-button"
                           type="submit"
                           onClick={(e) => this.loginHandler(e)}>
                           تسجيل الدخول
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}
