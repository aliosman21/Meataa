import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import serverURL from "../Utils/global";
import Contact from "../components/contact";
import { Button } from "semantic-ui-react";
import Banner from "../components/banner";
import JsonData from "../data/data.json";
import { Select } from "semantic-ui-react";
import {
   MDBBtn,
   MDBCard,
   MDBCardBody,
   MDBCardImage,
   MDBCardTitle,
   MDBCardText,
   MDBCol,
} from "mdbreact";

import axios from "axios";
import EventDetails from "../components/EventDetails";
import Cookies from "js-cookie";
import { AnimateOnChange } from "react-animation";
import { getTags } from "../Utils/getTagsUtil";
import "../styles/search.css";

export default function Search() {
   const [tags, setTags] = useState([]);
   const [tag1, setTag1] = useState([]);
   const [events, setEvents] = useState([]);
   const [usedTags, setUsedTags] = useState([]);
   const [cities, setCities] = useState([]);
   const [usedCity, setUsedCity] = useState("");
   useEffect(() => {
      getTags().then((tagList) => {
         tag1.length = tagList.length; // set array size
         tag1.fill(false);
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

   useEffect(() => {
      console.log(tag1);
      console.log(usedCity);
      queryEvents();
   }, [tag1, usedCity]);

   const onChangeCity = (e, data) => {
      //console.log(data);
      data.options.forEach((city) => {
         if (data.value == city.value) {
            setUsedCity(city.key);
         }
      });
   };
   const switchActivity = (e, id) => {
      e.preventDefault();
      setTag1((prevState) => prevState.map((item, idx) => (idx === id ? !item : item)));
      //queryEvents();
   };

   const queryEvents = () => {
      //console.log(usedTags);
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      let i = 0;
      for (let tag in tag1) {
         if (tag1[tag] === true && !usedTags.includes(tags[i]["id"])) {
            usedTags.push(tags[i]["id"]);
         }
         i++;
      }

      const bodyParameters = {
         tags: usedTags,
         city_id: usedCity,
      };
      console.log(bodyParameters);
      // console.log(usedCity);
      axios
         .post(serverURL + "/jobs/jobsbytags", bodyParameters, config)
         .then(function (response) {
            //alert("Success");
            setEvents(response.data.data);
            // console.log(response.data.data);
            //console.log(events);
         })
         .catch(console.log);
      setUsedTags([]);
      //setUsedCity("");
      //console.log(bodyParameters);
      //console.log(token);
   };

   return Cookies.getJSON("session") ? (
      <>
         <Banner data={{ header: "الفعاليات الجديده" }} />
         <div className="custom-search-content">
            <div className="searchTagsList">
               <div className="tagsHolder">
                  <span className="mr-3">
                     <Select
                        placeholder={usedCity}
                        key={cities.key}
                        options={cities}
                        className="mt-3"
                        value={usedCity}
                        onChange={onChangeCity}
                     />
                  </span>
                  <span>
                     {tags.map((tag) => (
                        <Button
                           key={tag.id}
                           className="customSearchTagBtn"
                           size="mini"
                           toggle
                           active={tag1[tag.id - 1]}
                           onClick={(e) => switchActivity(e, tag.id - 1)}>
                           {tag.name}
                        </Button>
                     ))}
                  </span>
               </div>
            </div>
            <div className="eventsList">
               {events.map((event) => (
                  <MDBCol style={{ maxWidth: "22rem" }}>
                     <MDBCard className="card-event">
                        <MDBCardImage
                           className="img-fluid customImage"
                           src={serverURL + "/" + event.img}
                           waves
                        />
                        <MDBCardBody>
                           <MDBCardTitle className="customCardFont">{event.name}</MDBCardTitle>
                           <MDBCardText className="customCardFont description-cut">
                              {event.description}
                           </MDBCardText>
                           <div>
                              <EventDetails props={{ event: event }} />
                           </div>
                        </MDBCardBody>
                     </MDBCard>
                  </MDBCol>
                  /* <div key={event.id} className="single-event">
                        <div className="eventDescription">
                           <p className="single-event-p single-event-name">{event.name} </p>
                           <p className="single-event-p single-event-desc">
                              description will go in here
                           </p>
                           <div className="orgAndDate">
                              <p className="single-event-p single-event-org">
                                 {event.organization}
                              </p>
                              <p className="single-event-p single-event-date">2020-3-15</p>
                           </div>
                           <img
                              src={serverURL + "/" + event.img}
                              alt="event"
                              className="single-event-img"></img>
                           <div className="details-button">
                              <EventDetails props={{ event: event }} />
                           </div>
                        </div>
                     </div> */
               ))}
            </div>
         </div>
         <Contact data={JsonData} />
      </>
   ) : (
      //404 page
      <div></div>
   );
}
