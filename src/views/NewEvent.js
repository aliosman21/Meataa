import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getTags } from "../Utils/getTagsUtil";
import axios from "axios";
import serverURL from "../Utils/global";
import "../styles/newEvent.css";

export default function Profile() {
   const [tags, setTags] = useState([]);
   const [img, setImg] = useState("");
   const [usedTags] = useState([]);
   let title = React.createRef();
   let description = React.createRef();
   let endDate = React.createRef();
   useEffect(() => {
      getTags().then((tagList) => {
         setTags(tagList);
      });
   }, []);

   const handleNewEvent = () => {
      if (usedTags.length !== 1) alert("too many tags");
      else {
         let tag = usedTags[0];
         const token = Cookies.getJSON("session").token;
         const config = {
            headers: { Authorization: `bearer ${token}` },
         };

         const bodyParameters = {
            name: title.current.value,
            description: description.current.value,
            end_date: endDate.current.value,
            img: img,
            tag_id: tag,
         };
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
      }
   };

   const getBase64 = async (e) => {
      const reader = new FileReader();
      reader.onload = function (e) {
         setImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
   };
   const changeTags = (userTag) => {
      if (usedTags.includes(userTag.target.id) && usedTags) {
         const index = usedTags.indexOf(userTag.target.id);

         usedTags.splice(index, 1);
      } else {
         usedTags.push(userTag.target.id);
      }
   };
   return Cookies.getJSON("session").type === "Organization" ? (
      <div className="custom-new-event-container">
         <div className="new-event-details">
            <h1 className="new-event-header">اشرح المحتوي</h1>
            <div className="new-event-title">
               <input
                  type="text"
                  ref={title}
                  className="form-control custom-input-title"
                  required
               />
               <p className="text-center custom-title-p">أسم المحتوي</p>
            </div>
            <div className="new-event-details-body">
               <textarea
                  className="event-description-fornew"
                  ref={description}
                  placeholder="اكتب شرح وافي للمحتوي"></textarea>
            </div>
            <div className="new-event-details-footer">
               <input
                  type="date"
                  className="end-date-input"
                  id="endDate"
                  name="endDate"
                  ref={endDate}
               />
               <button className="submit-event-button" onClick={handleNewEvent}>
                  نشر
               </button>
               <div className="img-btns">
                  <input
                     type="file"
                     id="img"
                     name="img"
                     accept="image/*"
                     onChange={getBase64}
                     className="image-button image-uploader"
                     required
                  />
                  <p className="text-center custom-register-p">اضف صوره للنشاط</p>
               </div>
               <div className="add-tags">
                  <div className="checkBoxes">
                     {tags.map((tag) => (
                        <input
                           key={tag.id}
                           id={tag.id}
                           type="checkbox"
                           onChange={changeTags}></input>
                     ))}
                  </div>
                  <div className="checkBoxes-para">
                     {tags.map((tag) => (
                        <p className="newEvent-para" key={tag.id}>
                           {tag.name}
                        </p>
                     ))}
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
