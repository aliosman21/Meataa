import React, { useState } from "react";
import "../styles/profile.css";
import serverURL from "../Utils/global";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
export default function Profile() {
   const getDataFromCookie = () => {
      //will call database and fill the data object 4 reviews at atime
      // will need to pass the cookie to the profile page when the backend is done

      let profileData = Cookies.getJSON("session");
      console.log(profileData);

      let data = {
         name: profileData.name,
         ssn: profileData.NID,
         mobile: profileData.mobile,
         pic: serverURL + profileData.img,
         email: profileData.email,
         Reviews: {
            1: { img: "sora", review: "rev1" },
            2: { img: "sora", review: "rev2" },
            3: { img: "sora", review: "rev3" },
            4: { img: "sora", review: "rev4" },
         },
      };
      console.log(data.pic);
      //setPageId(1); to change pages in request to DB
      return data;
   };

   const getAllAchievments = () => {
      console.log("Will go to achievements page");
   };

   const history = useHistory();
   const ChangeInfo = () => history.push("/setInfo");

   const [data] = useState(() => getDataFromCookie());

   return Cookies.getJSON("session") ? (
      <div className="custom-content-profile">
         <div className="custom-container-profile col">
            <div className="profileImgHolder">
               <img src={data.pic} alt="Avatar" className="profileImg" />
            </div>
            <div className="profileText">
               <h3 className="profile-name">{data.name} :الاسم</h3>
               <h3 className="profile-email">{data.email} :البريد الالكتروني</h3>
               <h3 className="profile-ssn">{data.ssn} :رقم الضمان الاجتماعي</h3>
               <h3 className="profile-mobile">{data.mobile} :رقم الهاتف</h3>
               <button className="change-settings" onClick={ChangeInfo}>
                  {" "}
                  تغير البيانات{" "}
               </button>
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
            <button className="paging next" onClick={getAllAchievments}>
               {" "}
               الكامل{" "}
            </button>
         </div>
      </div>
   ) : (
      //404 page
      <div></div>
   );
}
