import React, { Component } from "react";
import "../styles/login.css";
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBBtn } from "mdbreact";
export default class Login extends Component {
   render() {
      return (
         <div className="custom-content">
            <div className="custom-container col-8">
               <form>
                  <p className="h5 text-center mb-4">تسجيل الدخول</p>
                  <div className="grey-text">
                     <input type="email" className="form-control" required />
                     <p className="text-right">البريد الالكتروني</p>
                  </div>
                  <div className="grey-text">
                     <input type="password" className="form-control" required />
                     <p className="text-right">كلمه السر</p>
                  </div>
                  <div className="text-center custom-login-button">
                     <button type="submit">تسجيل الدخول</button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}
