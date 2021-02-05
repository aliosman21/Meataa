import React, { Component } from "react";
import "../styles/login.css";
export default class Login extends Component {
   render() {
      return (
         <div className="custom-content-login">
            <div className="custom-container-login col-8">
               <div className="form-container">
                  <h2 className="text-center mb-4 login-header">تسجيل الدخول</h2>
                  <div className="form-inputs">
                     <div className="grey-text">
                        <input type="email" className="form-control" required />
                        <p className="text-right custom-login-p">البريد الالكتروني</p>
                     </div>
                     <div className="grey-text">
                        <input type="password" className="form-control" required />
                        <p className="text-right custom-login-p">كلمه السر</p>
                     </div>
                  </div>
                  <div className="radio-button-login">
                     <input
                        type="radio"
                        defaultChecked
                        id="volunteer"
                        name="userType"
                        value="volunteer"
                     />
                     <input type="radio" id="organization" name="userType" value="organization" />
                     <input type="radio" id="admin" name="userType" value="admin" />
                     <label htmlFor="volunteer">volunteer</label>
                     <label htmlFor="volunteer">organization</label>
                     <label htmlFor="volunteer">admin</label>
                  </div>
                  <div className="text-center custom-login-button">
                     <button className="login-button" type="submit">
                        تسجيل الدخول
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
