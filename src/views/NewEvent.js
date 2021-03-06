import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { getTags } from "../Utils/getTagsUtil";
import axios from "axios";
import { Dropdown } from "semantic-ui-react";
import serverURL from "../Utils/global";
import { useAlert } from "react-alert";
import { MDBJumbotron, MDBBtn, MDBContainer, MDBRow, MDBCol, MDBInput } from "mdbreact";
import SemanticDatepicker from "react-semantic-ui-datepickers";
import "react-semantic-ui-datepickers/dist/react-semantic-ui-datepickers.css";
import { Select } from "semantic-ui-react";
import JsonData from "../data/data.json";
import "../styles/newEvent.css";

export default function Profile() {
   const alert = useAlert();
   const [tags, setTags] = useState([]);
   const [cities, setCities] = useState([]);
   const [img, setImg] = useState("");
   const [usedTag, setUsedTag] = useState("");
   const [usedCity, setUsedCity] = useState("");
   const [title, setTitle] = useState("");
   const [description, setDescription] = useState("");
   const [endDate, setEndDate] = useState("");
   const [endDateReg, setEndDateReg] = useState("");

   const onChangeDescription = (event) => {
      setDescription(event.target.value);
   };
   const onChangeTitle = (event) => {
      setTitle(event.target.value);
   };
   const onChangeEndDate = (event, data) => {
      let endingDate = new Date(data.value).toISOString().slice(0, 10);
      setEndDate(endingDate);
   };
   const onChangeEndDateReg = (event, data) => {
      let endingDate = new Date(data.value).toISOString().slice(0, 10);
      setEndDateReg(endingDate);
   };
   const onChangeCity = (e, data) => {
      //console.log(data);
      data.options.forEach((city) => {
         if (data.value === city.value) {
            setUsedCity(city.key);
         }
      });
      console.log(usedCity);
   };
   useEffect(() => {
      getTags().then((tagList) => {
         setTags(tagList);
      });
      axios
         .get(serverURL + "/cities/list")
         .then(function (response) {
            //console.log(response.data.message);
            setCities(response.data.message);
         })
         .catch(console.log);
   }, []);
   useEffect(() => {
      //console.log(tags);
      cities.forEach((city) => {
         Object.defineProperty(city, "key", Object.getOwnPropertyDescriptor(city, "id"));
         delete city["id"];
         Object.defineProperty(city, "text", Object.getOwnPropertyDescriptor(city, "name"));
         delete city["name"];
         city.value = city["text"];
      });
      // console.log(tags);
   }, [cities]);

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
         city_id: usedCity,
         tag_id: usedTag,
         registration_date: endDateReg,
      };
      //console.log(bodyParameters);
      axios
         .post(serverURL + "/jobs/store", bodyParameters, config)
         .then(function (response) {
            alert.show(JsonData.NewEvent.successAlert);
            setTimeout(() => {
               window.location.href = "/";
            }, 2000);
         })
         .catch((err) => {
            alert.error(JsonData.NewEvent.failAlert);
         });
      //console.log(bodyParameters);
      //console.log(token);
   };
   const switchActivity = (e, data) => {
      data.options.forEach((opt) => {
         if (data.value === opt.text) {
            setUsedTag(opt.key);
         }
      });
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
                        <h2 className="h1 display-3">{JsonData.NewEvent.header}</h2>
                        <form className="form-Sizer">
                           <MDBInput
                              label={JsonData.NewEvent.eventName}
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
                              label={JsonData.NewEvent.eventDescription}
                              onChange={onChangeDescription}
                              rows="8"
                              size="lg"
                              className="textDirection"
                           />
                           <div className="input-group mb-3">
                              <div className="input-group-prepend">
                                 <span className="input-group-text" id="inputGroupFileAddon01">
                                    {JsonData.NewEvent.upload}
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
                                    {JsonData.NewEvent.eventPhoto}
                                 </label>
                              </div>
                           </div>
                           <div className="mb-4">
                              <SemanticDatepicker
                                 onChange={onChangeEndDateReg}
                                 datePickerOnly
                                 pointing="top left"
                                 format="YYYY-MM-DD"
                                 filterDate={(date) => {
                                    const now = new Date();
                                    return date >= now;
                                 }}
                              />
                              <span>{JsonData.NewEvent.eventRegEndDate}</span>
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
                              <span>{JsonData.NewEvent.eventEndDate}</span>
                           </div>
                           <Dropdown
                              className="mt-3"
                              placeholder={JsonData.NewEvent.tag}
                              options={tags}
                              search
                              selection
                              fluid
                              onChange={(e, data) => switchActivity(e, data)}
                           />
                           <Select
                              placeholder={JsonData.NewEvent.city}
                              key={cities.key}
                              options={cities}
                              className="mt-3"
                              onChange={onChangeCity}
                           />
                           <p className="lead mt-3">
                              <MDBBtn
                                 color="primary"
                                 className="textformatter"
                                 onClick={handleNewEvent}>
                                 {JsonData.NewEvent.addEventBtn}
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
