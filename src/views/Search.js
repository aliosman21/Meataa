import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import Footer from "../components/footer";
import Banner from "../components/banner";
import { Dropdown } from "semantic-ui-react";
import JsonData from "../data/data.json";
import { MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from "mdbreact";
import axios from "axios";
import EventDetails from "../components/EventDetails";
import Cookies from "js-cookie";
import { getTags } from "../Utils/getTagsUtil";
import "../styles/search.css";

export default function Search() {
   const [tags, setTags] = useState([]);
   const [events, setEvents] = useState([]);
   const [usedTags, setUsedTags] = useState([]);
   const [cities, setCities] = useState([]);
   const [usedCityName, setUsedCityName] = useState("");
   const [usedCity, setUsedCity] = useState("");
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
   }, [cities]);

   useEffect(() => {
      queryEvents();
   }, [usedCity]);

   const switchActivity = (e, data) => {
      for (let tagList in tags) {
         for (let tag in data.value) {
            if (tags[tagList].text === data.value[tag]) {
               usedTags.push(tags[tagList].key);
            }
         }
      }
      queryEvents();
   };

   const queryEvents = () => {
      const bodyParameters = {
         tags: usedTags,
         city_id: usedCity,
      };
      axios
         .post(serverURL + "/jobs/jobsbytags", bodyParameters)
         .then(function (response) {
            setEvents(response.data.data);
         })
         .catch(console.log);
      setUsedTags([]);
   };
   const onChangeCity = (e, data) => {
      if (data.value === "") setUsedCity("");
      else {
         data.options.forEach((city) => {
            if (data.value === city.value) {
               setUsedCity(city.key);
               setUsedCityName(city.name);
            }
         });
      }
   };

   return (
      <>
         <Banner data={{ header: "الفعاليات الجديده" }} />
         <div className="custom-search-content">
            <div className="searchTagsList">
               <div className="tagsHolder">
                  <span className="mr-3">
                     <Dropdown
                        className="mt-3"
                        placeholder={JsonData.Search.city}
                        fluid
                        selection
                        clearable
                        selection
                        options={cities}
                        onChange={onChangeCity}
                     />
                  </span>
                  <span>
                     <Dropdown
                        className="mt-3"
                        placeholder={JsonData.Search.tags}
                        options={tags}
                        search
                        selection
                        fluid
                        multiple
                        allowAdditions
                        onChange={(e, data) => switchActivity(e, data)}
                     />
                  </span>
               </div>
            </div>
            <div className="eventsList">
               {events.map((event) => (
                  <MDBCol md="3" key={event.id}>
                     <MDBCard className="card-event">
                        <MDBCardImage
                           className="img-fluid customImage"
                           src={serverURL + "/" + event.img}
                           waves
                        />
                        <MDBCardBody>
                           <MDBCardTitle className="customCardFont description-cut">
                              {event.name}
                           </MDBCardTitle>
                           <MDBCardText className="customCardFont description-cut">
                              {event.description}
                           </MDBCardText>
                           <div>
                              <EventDetails props={{ event: event }} />
                           </div>
                        </MDBCardBody>
                     </MDBCard>
                  </MDBCol>
               ))}
            </div>
         </div>
         <Footer />
      </>
   );
}
