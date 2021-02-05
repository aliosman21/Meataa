import React, { useState } from "react";
import "../styles/register.css";

export default function Register() {
   const [userReg, setUserReg] = useState(0);

   return (
      <div className="custom-content-register">
         <div className="custom-container-register col-8">
            <h2 className="text-center mb-4 header-text">أنضم لنا</h2>
            <div className="radio-buttons">
               <div className="radioButtons">
                  <div>
                     <input
                        type="radio"
                        id="volunteer"
                        name="userType"
                        value="volunteer"
                        defaultChecked
                        onClick={() => setUserReg(0)}
                     />
                     <label htmlFor="volunteer" className="radioLabel">
                        متطوع
                     </label>
                  </div>
                  <div>
                     <input
                        type="radio"
                        id="organization"
                        name="userType"
                        value="organization"
                        onClick={() => setUserReg(1)}
                     />
                     <label htmlFor="volunteer" className="radioLabel">
                        مبادره
                     </label>
                  </div>
               </div>
            </div>
            {!userReg ? (
               <>
                  <div className="vol-inputs">
                     <input type="text" className="form-control text-inputs-reg" required />
                     <p className="text-center custom-register-p">الأسم بالكامل</p>
                     <input type="text" className="form-control text-inputs-reg" required />
                     <p className="text-center custom-register-p">الرقم القومي</p>
                     <input type="text" className="form-control text-inputs-reg" required />
                     <p className="text-center custom-register-p">البريد الالكتروني</p>
                     <input type="password" className="form-control" required />
                     <p className="text-center custom-register-p">كلمه السر</p>
                     <input type="password" className="form-control" required />
                     <p className="text-center custom-register-p">رقم الهاتف</p>
                     <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        className="image-button image-uploader"
                        required
                     />
                     <p className="text-center custom-register-p">صورتك الشخصيه</p>
                     <div className="interests">
                        <input type="checkbox" id="interest1" name="interest1" value="interest1" />
                        <input type="checkbox" id="interest2" name="interest2" value="interest2" />
                        <input type="checkbox" id="interest3" name="interest3" value="interest3" />
                        <input type="checkbox" id="interest4" name="interest4" value="interest4" />
                        <input type="checkbox" id="interest5" name="interest5" value="interest5" />
                        <label htmlFor="interest1">رعايه أيتام</label>
                        <label htmlFor="interest2">حمايه بيئه</label>
                        <label htmlFor="interest3">تنظيم مؤتمرات</label>
                        <label htmlFor="interest4">اخري</label>
                        <label htmlFor="interest5">اخري</label>
                     </div>
                     <p className="text-center custom-register-p">الاهتمامات</p>
                  </div>
                  <div className="text-center custom-register-button">
                     <button className="register-button" type="submit">
                        أنضم الان
                     </button>
                  </div>
               </>
            ) : (
               <>
                  <div className="vol-inputs">
                     <input type="text" className="form-control text-inputs-reg" required />
                     <p className="text-center custom-register-p">اسم الجهه</p>
                     <input type="text" className="form-control text-inputs-reg" required />
                     <p className="text-center custom-register-p">رقم هاتف</p>
                     <input type="password" className="form-control" />
                     <p className="text-center custom-register-p"> رقم هاتف اخر</p>
                     <input type="text" className="form-control text-inputs-reg" />
                     <p className="text-center custom-register-p">البريد الالكتروني</p>
                     <input type="password" className="form-control" required />
                     <p className="text-center custom-register-p">كلمه السر</p>
                     <input
                        type="file"
                        id="img"
                        name="img"
                        accept="image/*"
                        className="image-button image-uploader"
                        required
                     />
                     <p className="text-center custom-register-p">صوره الجهه</p>
                     <div className="interests">
                        <input type="checkbox" id="interest1" name="interest1" value="interest1" />
                        <input type="checkbox" id="interest2" name="interest2" value="interest2" />
                        <input type="checkbox" id="interest3" name="interest3" value="interest3" />
                        <input type="checkbox" id="interest4" name="interest4" value="interest4" />
                        <input type="checkbox" id="interest5" name="interest5" value="interest5" />
                        <label htmlFor="interest1">interest1</label>
                        <label htmlFor="interest2">interests2</label>
                        <label htmlFor="interest3">interests3</label>
                        <label htmlFor="interest4">interests4</label>
                        <label htmlFor="interest5">interests5</label>
                     </div>
                     <p className="text-center custom-register-p">الاهتمامات</p>
                  </div>
                  <div className="text-center custom-register-button">
                     <button className="register-button" type="submit">
                        أنضم الان
                     </button>
                  </div>
               </>
            )}
         </div>
      </div>
   );
}
