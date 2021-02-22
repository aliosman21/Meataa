import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getTags } from "../Utils/getTagsUtil";
import axios from "axios";
import serverURL from "../Utils/global";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Select } from "semantic-ui-react";
import "../styles/newEvent.css";

export default function Profile() {
   const [tags, setTags] = useState([]);
   const [img, setImg] = useState("");
   const [usedTag, setUsedTag] = useState("");
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [endDate, setEndDate] = useState("");

   const onChangeDescription = (event) => {
      setDescription(event.target.value);
   };
   const onChangeTitle = (event) => {
      setTitle(event.target.value);
   };
   const onChangeEndDate = (event, data) => {
      let endingDate = new Date(data.value).toISOString().slice(0, 10);
      // console.log(endingDate);
      setEndDate(endingDate);
   };
   const onChangeTag = (e, data) => {
      //console.log(data);
      data.options.forEach((tag) => {
         //console.log(tag);
         if (data.value == tag.value) {
            setUsedTag(tag.key);
         }
      });
   };
   useEffect(() => {
      getTags().then((tagList) => {
         setTags(tagList);
      });
   }, []);
   useEffect(() => {
      //console.log(tags);
      tags.forEach((element) => {
         Object.defineProperty(element, "key", Object.getOwnPropertyDescriptor(element, "id"));
         delete element["id"];
         Object.defineProperty(element, "text", Object.getOwnPropertyDescriptor(element, "name"));
         delete element["name"];
         element.value = element["text"];
      });
      // console.log(tags);
   }, [tags]);

   const handleNewEvent = () => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };

      const bodyParameters = {
         name: title,
         description: description,
         end_date: endDate,
         img: img,
         tag_id: usedTag,
      };
      console.log(bodyParameters);
      axios
         .post(serverURL + "/jobs/store", bodyParameters, config)
         .then(function (response) {
            alert("Success");
            window.location.href = "/";
            console.log(response);
         })
         .catch(console.log);
      console.log(bodyParameters);
      console.log(token);
   };

   const getBase64 = async (e) => {
      const reader = new FileReader();
      reader.onload = function (e) {
         setImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
   };

   return Cookies.getJSON("session").type === "Organization" ? (
      <div className="custom-new-event-container">
         <div></div>
         <div className="newEvent">
            <MDBContainer className="mt-5 text-center">
               <MDBRow>
                  <MDBCol>
                     <MDBJumbotron>
                        <h2 className="h1 display-3">قم بأضافه فعاليه جديده</h2>
                        <form className="form-Sizer">
                           <MDBInput
                              label="اسم العمل"
                              className="textDirection"
                              onChange={onChangeTitle}
                              type="text"
                              size="lg"
                              validate
                              error="wrong"
                              success="right"
                           />
                           <MDBInput
                              type="textarea"
                              label="اشرح المحتوي"
                              onChange={onChangeDescription}
                              rows="8"
                              size="lg"
                              className="textDirection"
                           />
                           <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                 <span className="input-group-text" id="inputGroupFileAddon01">
                                    أرفع
                                 </span>
                              </div>
                              <div className="custom-file">
                                 <input
                                    type="file"
                                    className="custom-file-input"
                                    id="inputGroupFile01"
                                    onChange={getBase64}
                                    aria-describedby="inputGroupFileAddon01"
                                 />
                                 <label className="custom-file-label" htmlFor="inputGroupFile01">
                                    اختر صوره للفعاليه
                                 </label>
                              </div>
                           </div>
                           <div className="mb-4">
                              <SemanticDatepicker
                                 onChange={onChangeEndDate}
                                 datePickerOnly
                                 pointing="top left"
                                 format="YYYY-MM-DD"
                                 filterDate={(date) => {
                                    const now = new Date();
                                    return date >= now;
                                 }}
                              />
                              <span> تاريخ الانتهاء</span>
                           </div>
                           <Select
                              placeholder="حدد نوع الفعاليه"
                              options={tags}
                              onChange={onChangeTag}
                           />

                           <p className="lead mt-3">
                              <MDBBtn
                                 color="primary"
                                 className="textformatter"
                                 onClick={handleNewEvent}>
                                 سجل العمل
                              </MDBBtn>
                           </p>
                        </form>
                     </MDBJumbotron>
                  </MDBCol>
               </MDBRow>
            </MDBContainer>
         </div>
      </div>
   ) : (
      //404 page
      <div></div>
   );
}
