import React from "react";
import Cookies from "js-cookie";
import "../styles/newEvent.css";

export default function Profile() {
   return Cookies.getJSON("session").userType === 1 ? (
      <div className="custom-new-event-container">
         <div className="new-event-details">
            <h1 className="new-event-header">اشرح المحتوي</h1>
            <div className="new-event-details-body">
               <textarea
                  className="event-description-fornew"
                  placeholder="اكتب شرح وافي للمحتوي"></textarea>
            </div>
            <div className="new-event-details-footer">
               <button className="submit-event-button">نشر</button>
               <div className="img-btns">
                  <input
                     type="file"
                     id="img"
                     name="img"
                     accept="image/*"
                     className="image-button image-uploader"
                     required
                  />
                  <p className="text-center custom-register-p">اضف صوره للنشاط</p>
               </div>
               <div className="add-tags">
                  <div className="checkBoxes">
                     <input type="checkbox" id="int1" value="" />
                     <input type="checkbox" id="int2" value="" />
                     <input type="checkbox" id="int3" value="" />
                     <input type="checkbox" id="int4" value="" />
                     <input type="checkbox" id="int5" value="" />
                  </div>
                  <div className="checkBoxes-para">
                     <p className="newEvent-para">أيتام</p>
                     <p className="newEvent-para">موؤسسات</p>
                     <p className="newEvent-para">كبار السن</p>
                     <p className="newEvent-para">اخري</p>
                     <p className="newEvent-para">اخري</p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   ) : (
      //404 page
      <div></div>
   );
}
