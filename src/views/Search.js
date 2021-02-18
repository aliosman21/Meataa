import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import serverURL from "../Utils/global";
import Contact from "../components/contact";
import Banner from "../components/banner";
import JsonData from "../data/data.json";
import axios from "axios";
import Cookies from "js-cookie";
import { getTags } from "../Utils/getTagsUtil";
import "../styles/search.css";

export default function Search() {
   const [tags, setTags] = useState([]);
   const [events, setEvents] = useState([]);
   const [usedTags] = useState([]);
   useEffect(() => {
      getTags().then((tagList) => {
         setTags(tagList);
      });
   }, []);

   const changeTags = (userTag) => {
      if (usedTags.includes(userTag.target.id) && usedTags) {
         const index = usedTags.indexOf(userTag.target.id);

         usedTags.splice(index, 1);
      } else {
         usedTags.push(userTag.target.id);
      }
   };

   const queryEvents = () => {
      //console.log(usedTags);
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };

      const bodyParameters = {
         tags: usedTags,
      };
      axios
         .post(serverURL + "/jobs/jobsbytags", bodyParameters, config)
         .then(function (response) {
            //alert("Success");
            setEvents(response.data.data);
            console.log(response.data.data);
            console.log(events);
         })
         .catch(console.log);
      console.log(bodyParameters);
      //console.log(token);
   };

   /*  {
       tags.map((tag) => (
          <div key={tag.id} className="search-tags">
             <p className="tagLabel">{tag.name}</p>
             <input id={tag.id} onChange={changeTags} type="checkbox"></input>
          </div>
       ));
    } */
   //function returns tr>3td
   return Cookies.getJSON("session") ? (
      <>
         <Banner data={{ header: "الفعاليات الجديده" }} />
         <div className="custom-search-content">
            <div className="searchTagsList">
               <div className="tagsHolder">
                  {tags.map((tag) => (
                     <div key={tag.id} className="search-tags">
                        <p className="tagLabel">{tag.name}</p>
                        <input id={tag.id} onChange={changeTags} type="checkbox"></input>
                     </div>
                  ))}
               </div>
               <button className="search-button" type="button" onClick={queryEvents}>
                  بحث
               </button>
            </div>
            <div className="eventsList">
               {events.map((event) => (
                  <div key={event.id} className="single-event">
                     <div className="eventDescription">
                        <p className="single-event-p single-event-name">{event.name} </p>
                        <p className="single-event-p single-event-desc">
                           description will go in here
                        </p>
                        <div className="orgAndDate">
                           <p className="single-event-p single-event-org">{event.organization}</p>
                           <p className="single-event-p single-event-date">2020-3-15</p>
                        </div>
                        <img
                           src={serverURL + "/" + event.img}
                           alt="event"
                           className="single-event-img"></img>
                        <Link
                           className="details-button"
                           to={{ pathname: `/Event`, query: { event: event.id } }}>
                           معرفه المزيد
                        </Link>
                     </div>
                  </div>
               ))}
            </div>
            <div className="nextPrevBtns">
               <button className="search-button prev" type="button">
                  الاخير
               </button>
               <button className="search-button next" type="button">
                  التالي
               </button>
            </div>
         </div>
         <Contact data={JsonData} />
      </>
   ) : (
      //404 page
      <div></div>
   );
}
