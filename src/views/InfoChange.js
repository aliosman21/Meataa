import React from "react";
import Cookies from "js-cookie";
import "../styles/setInfo.css";
export default function InfoChange() {
   return (
      <div className="custom-content-changeInfo">
         {Cookies.getJSON("session") ? (
            <>
               <div className="custom-container-changeInfo">
                  {Cookies.getJSON("session").type === "Volunteer" ? (
                     <div className="info-card">
                        <h2 className="info-card-header">تحديث البيانات</h2>
                        <input
                           type="text"
                           className="form-control name-input text-right"
                           required
                        />
                        <p className="text-center txt-para-Info name-para">الأسم بالكامل</p>
                        <input type="text" className="form-control ssn-input text-right" required />
                        <p className="text-center txt-para-Info ssn-para">الرقم القومي</p>
                        <input
                           type="text"
                           className="form-control email-input text-right"
                           required
                        />
                        <p className="text-center txt-para-Info email-para">البريد الالكتروني</p>
                        <input
                           type="password"
                           className="form-control pass-input text-right"
                           required
                        />
                        <p className="text-center txt-para-Info pass-para">كلمه السر</p>
                        <input
                           type="text"
                           className="form-control phone-input text-right"
                           required
                        />
                        <p className="text-center phone-para txt-para-Info">رقم الهاتف</p>
                        <input
                           type="file"
                           id="img"
                           name="img"
                           accept="image/*"
                           className="img-input"
                           required
                        />
                        <p className="text-center img-para txt-para-Info">صورتك الشخصيه</p>
                        <button className="change-settings"> تغير البيانات </button>
                     </div>
                  ) : (
                     <div className="info-card">
                        <h2 className="info-card-header">تحديث البيانات</h2>
                        <input
                           type="text"
                           className="form-control name-input text-right"
                           required
                        />
                        <p className="text-center name-para txt-para-Info">الأسم بالكامل</p>
                        <input type="text" className="form-control ssn-input text-right" required />
                        <p className="text-center ssn-para txt-para-Info">رقم هاتف</p>
                        <input
                           type="text"
                           className="form-control phone-input text-right"
                           required
                        />
                        <p className="text-center phone-para txt-para-Info">رقم هاتف اخر</p>
                        <input
                           type="text"
                           className="form-control email-input text-right"
                           required
                        />
                        <p className="text-center email-para txt-para-Info">البريد الالكتروني</p>
                        <input
                           type="password"
                           className="form-control pass-input text-right"
                           required
                        />
                        <p className="text-center pass-para txt-para-Info">كلمه السر</p>
                        <input
                           type="file"
                           id="img"
                           name="img"
                           accept="image/*"
                           className="img-input"
                           required
                        />
                        <p className="text-center img-para txt-para-Info">صوره الجهه</p>
                        <button className="change-settings"> تغير البيانات </button>
                     </div>
                  )}
               </div>
            </>
         ) : (
            <>
               <div className="Error">
                  <h1>برجاء تسجيل الدخول</h1>
               </div>
            </>
         )}
      </div>
   );
}
