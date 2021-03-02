import React, { useState } from "react";
import Cookies from "js-cookie";
import JsonData from "../data/data.json";
import axios from "axios";
import serverURL from "../Utils/global";
import { useAlert } from "react-alert";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";

export default function AddTag() {
   const alert = useAlert();
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
      if (newTag) {
         // console.log(bodyParameters);
         axios
            .post(serverURL + "/tags/store", bodyParameters, config)
            .then(function (response) {
               if (response.status == 200) {
                  console.log(response);
                  alert.show(JsonData.AddTag.addTagSuccess);
               } else {
                  alert.error(JsonData.AddTag.AddTagFail);
               }
            })
            .catch(console.log);
      } else {
         alert.error(JsonData.AddTag.addTagError);
      }
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
                        <h2 className="h1 display-3">{JsonData.AddTag.addTagHeader}</h2>
                        <form className="form-Sizer">
                           <MDBInput
                              label={JsonData.AddTag.addTagLabel}
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
                                 {JsonData.AddTag.addTagButton}
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
