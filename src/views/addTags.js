import React, { useState } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import serverURL from "../Utils/global";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

export default function AddTag() {
   const [newTag, setNewTag] = useState("");
   const onChangeTag = (event) => {
      console.log(event.target.value);
      setNewTag(event.target.value);
   };

   const handleNewTag = () => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      const bodyParameters = {
         name: newTag,
      };
      // console.log(bodyParameters);
      axios
         .post(serverURL + "/tags/store", bodyParameters, config)
         .then(function (response) {
            if (response.status == 200) {
               console.log(response);
               alert("تم تسجيل الفئه بنجاح");
            } else {
               alert("لا يمكنك اضافه فئه");
            }
         })
         .catch(console.log);
      //console.log(bodyParameters);
      //console.log(token);
   };

   return (
      <div className="custom-new-event-container">
         <div></div>
         <div className="newEvent">
            <MDBContainer className="mt-5 text-center">
               <MDBRow>
                  <MDBCol>
                     <MDBJumbotron>
                        <h2 className="h1 display-3">قم بأضافه فئه جديده</h2>
                        <form className="form-Sizer">
                           <MDBInput
                              label="اسم الفئه"
                              className="textDirection"
                              onChange={onChangeTag}
                              type="text"
                              size="lg"
                              validate
                              error="wrong"
                              success="right"
                           />

                           <p className="lead mt-3">
                              <MDBBtn
                                 color="primary"
                                 className="textformatter"
                                 onClick={handleNewTag}>
                                 اضف فئه
                              </MDBBtn>
                           </p>
                        </form>
                     </MDBJumbotron>
                  </MDBCol>
               </MDBRow>
            </MDBContainer>
         </div>
      </div>
   );
}
