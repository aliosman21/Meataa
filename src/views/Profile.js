import React, { useState, useContext } from "react";
import "../styles/profile.css";
import { UserContext } from "../context/UserContext";
export default function Profile() {
   const { user, setUser } = useContext(UserContext);
   const [pageId, setPageId] = useState(1);
   const getAchievementsFromDatabase = () => {
      //will call database and fill the data object 4 reviews at atime

      let data = {
         name: "Ali",
         pic: "afiasre",
         email: "ali@gmail.com",
         Reviews: {
            1: { img: "sora", review: "rev1" },
            2: { img: "sora", review: "rev2" },
            3: { img: "sora", review: "rev3" },
            4: { img: "sora", review: "rev4" },
         },
      };
      //setPageId(1); to change pages in request to DB
      return data;
   };

   const [data, setData] = useState(() => getAchievementsFromDatabase());

   console.log(pageId);
   return user ? (
      <div className="custom-content-profile">
         <div className="custom-container-profile col">
            <div className="profileImgHolder">
               <img src="/img/team/02.jpg" alt="Avatar" className="profileImg" />
            </div>
            <div className="profileText">
               <h3>{data.name} :الاسم</h3>
               <h3>{data.email} :البريد الالكتروني</h3>
            </div>
         </div>
         <div className="custom-container-achievements col">
            <div className="all-achievements">
               <div className="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" className="right" />
                  <p className="reviews-text">{data.Reviews[1].review}</p>
               </div>
               <div className="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" className="right" />
                  <p className="reviews-text">{data.Reviews[2].review}</p>
               </div>
               <div className="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" className="right" />
                  <p className="reviews-text">{data.Reviews[3].review}</p>
               </div>
               <div className="single-achievement darker">
                  <img src="/img/team/01.jpg" alt="Avatar" className="right" />
                  <p className="reviews-text">{data.Reviews[4].review}</p>
               </div>
            </div>
            {pageId !== 1 ? (
               <button className="paging prev"> السابق </button>
            ) : (
               <div className="prev"></div>
            )}
            <button className="paging next"> التالي </button>
         </div>
      </div>
   ) : (
      //404 page
      <div></div>
   );
}
