import React, { Component } from "react";
import "../styles/login.css";
export default class Login extends Component {
   render() {
      return (
         <div className="custom-content-login">
            <div className="custom-container-login col-8">
               <form>
                  <h2 className="text-center mb-4">تسجيل الدخول</h2>
                  <div className="grey-text">
                     <input type="email" className="form-control" required />
                     <p className="text-right custom-login-p">البريد الالكتروني</p>
                  </div>
                  <div className="grey-text">
                     <input type="password" className="form-control" required />
                     <p className="text-right custom-login-p">كلمه السر</p>
                  </div>
                  <div className="text-center custom-login-button">
                     <button className="login-button" type="submit">
                        تسجيل الدخول
                     </button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}
