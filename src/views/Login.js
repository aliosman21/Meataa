import React, { Component } from "react";
//import axios from "axios";
import "../styles/login.css";
export default class Login extends Component {
   /*   loginHandler(e) {
      e.preventDefault();
      const userData = {
         email: "demouser@gmail.com",
         password: "1a2b3c4d5e", //This should be encoded
      };

      axios.post("https://example.com/createUser", userData).then((res) => {
         responseData = res.data;
         if (responseData.status == "success") {
            const user = responseData.user;
         } else {
            alert("Something went wrong while creating account");
         }
      });
   }
 */
   render() {
      return (
         <div className="custom-content-login">
            <div className="custom-container-login">
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
                  <div className="text-center custom-login-button">
                     <button
                        className="login-button"
                        type="submit"
                        /* onClick={(e) => loginHandler(e)} */
                     >
                        {" "}
                        تسجيل الدخول
                     </button>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
