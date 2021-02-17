import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import serverURL from "../Utils/global";
import Cookies from "js-cookie";
import { getTags } from "../Utils/getTagsUtil";
import "../styles/search.css";

export default function Search() {
   const [tags, setTags] = useState([]);
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
      console.log(usedTags);
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
                     <tr>
                        <td>
                           <Link
                              to={{
                                 pathname: `/Event`,
                                 query: { event: 1 },
                              }}
                              className="event-description">
                              التعريف
                           </Link>
                        </td>
                        <td>عمل1</td>
                        <td>جهه 1</td>
                     </tr>
                     <tr>
                        <td>
                           <Link
                              to={{
                                 pathname: `/Event`,
                                 query: { event: 2 },
                              }}
                              className="event-description">
                              {" "}
                              التعريف
                           </Link>
                        </td>
                        <td>عمل2</td>
                        <td>جهه 2</td>
                     </tr>
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
                  <>
                     <p className="tagLabel" key={`name ${tag.id} `}>
                        {tag.name}
                     </p>
                     <input
                        key={`input ${tag.id} `}
                        id={tag.id}
                        onChange={changeTags}
                        type="checkbox"></input>
                  </>
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
