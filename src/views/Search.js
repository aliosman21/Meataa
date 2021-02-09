import React, { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import "../styles/search.css";

export default function Profile() {
   const { user, setUser } = useContext(UserContext);
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
                     <img src="/img/team/02.jpg" alt="Avatar" className="profileImg" />
                  </div>
                  <div className="profileText">
                     <h3 className="profile-name">ali :الاسم</h3>
                  </div>
               </div>
            </Link>
         </div>
         <div className="searchQuery">ALI</div>
      </div>
   ) : (
      //404 page
      <div></div>
   );
}
