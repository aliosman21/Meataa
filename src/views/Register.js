import React, { Component } from "react";
import "../styles/register.css";
export default class Login extends Component {
   render() {
      return (
         <div className="custom-content-register">
            <div className="custom-container-register col-8">
               <form>
                  <h2 className="text-center mb-4">أنضم لنا</h2>
                  <div className="grey-text">
                     <input type="text" className="form-control" required />
                     <p className="text-right custom-register-p">الأسم بالكامل</p>
                  </div>
                  <div className="grey-text">
                     <input type="email" className="form-control" required />
                     <p className="text-right custom-register-p">البريد الالكتروني</p>
                  </div>
                  <div className="grey-text">
                     <input type="password" className="form-control" required />
                     <p className="text-right custom-register-p">كلمه السر</p>
                  </div>
                  <div className="grey-text">
                     <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        className="image-button"
                        required
                     />
                     <p className="text-right custom-register-p">صورتك الشخصيه</p>
                  </div>
                  <div className="text-center custom-register-button">
                     <button type="submit">أنضم الان</button>
                  </div>
               </form>
            </div>
         </div>
      );
   }
}
