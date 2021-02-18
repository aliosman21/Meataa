import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import serverURL from "../Utils/global";
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
   const getDataFromCookie = () => {
      //will call database and fill the data object 4 reviews at atime
      // will need to pass the cookie to the profile page when the backend is done

      let profileData = Cookies.getJSON("session");
      console.log(profileData);

      let data = {
         name: profileData.name,
         pic: serverURL + "/" + profileData.img,
         email: profileData.email,
      };
      //setPageId(1); to change pages in request to DB
      return data;
   };
   const [profileData] = useState(() => getDataFromCookie());
   //function returns tr>3td
   return Cookies.getJSON("session") ? (
      <div className="custom-search-content">
         <div className="main-search-container">
            <div className="custom-posts-table">
               <table>
                  <thead>
                     <tr>
                        <th>العمل</th>
                        <th>الاسم</th>
                        <th>الجهه</th>
                     </tr>
                  </thead>
                  <tbody>
                     {events.map((event) => (
                        <tr key={event.id}>
                           <td>
                              <Link
                                 to={{
                                    pathname: `/Event`,
                                    query: { event: event.id },
                                 }}
                                 className="event-description">
                                 {event.name}
                              </Link>
                           </td>
                           <td>{event.organization}</td>
                           <td className="search-img-row">
                              <img className="search-row-img" src={serverURL + "/" + event.img} />
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         <div className="profile-card">
            <Link to="/profile" className="event-description">
               <div className="custom-container-profile-search">
                  <div className="profileImgHolder">
                     <img src={profileData.pic} alt="Avatar" className="profileImg" />
                  </div>
                  <div className="profileText">
                     <h1 className="profile-name">{profileData.name} :الاسم</h1>
                     <h1 className="profile-name">{profileData.email} :البريد الالكتروني</h1>
                  </div>
               </div>
            </Link>
         </div>
         <div className="searchQuery">
            <div className="upper-grid-search">
               {tags.map((tag) => (
                  <div key={tag.id} className="search-tags">
                     <p className="tagLabel">{tag.name}</p>
                     <input id={tag.id} onChange={changeTags} type="checkbox"></input>
                  </div>
               ))}
            </div>
            <div className="lower-grid-search">
               <button className="search-button" type="button" onClick={queryEvents}>
                  بحث
               </button>
            </div>
         </div>
      </div>
   ) : (
      //404 page
      <div></div>
   );
}
