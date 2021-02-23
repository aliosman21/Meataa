import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import Banner from "../components/banner";
import serverURL from "../Utils/global";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import axios from "axios";
import { Button } from "semantic-ui-react";
import SVG from "../components/svg";
export default function Profile() {
   const [isFlipped, setIsFlipped] = useState(false);
   const getDataFromCookie = () => {
      //will call database and fill the data object 4 reviews at atime
      // will need to pass the cookie to the profile page when the backend is done

      let profileData = Cookies.getJSON("session");
      //console.log(profileData);

      let data = {
         name: profileData.name,
         ssn: profileData.NID,
         mobile: profileData.mobile,
         pic: serverURL + profileData.img,
         email: profileData.email,
         mobile2: profileData.mobile2,
         Reviews: {
            1: { img: "sora", review: "rev1" },
            2: { img: "sora", review: "rev2" },
            3: { img: "sora", review: "rev3" },
            4: { img: "sora", review: "rev4" },
         },
      };
      //console.log(data.pic);
      //setPageId(1); to change pages in request to DB
      return data;
   };

   const handleFlip = (e) => {
      e.preventDefault();
      setIsFlipped(!isFlipped);
   };

   useEffect(() => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      if (!isFlipped) {
         axios
            .get(serverURL + "/userdata", config)
            .then(function (response) {
               console.log(response);
            })
            .catch(console.log);
      }
   }, [isFlipped]);
   const getAllAchievments = () => {
      console.log("Will go to achievements page");
   };

   const history = useHistory();
   const ChangeInfo = () => history.push("/setInfo");

   const allJobs = () => {
      history.push("/allJobs");
   };
   const [data] = useState(() => getDataFromCookie());

   return Cookies.getJSON("session") ? (
      <>
         <Banner data={{ header: "الحساب الشخصي" }} />
         <div className="custom-content-profile">
            <div></div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
               <div className="FrontCard">
                  <div className="information">
                     <p className="profileFont"> {data.name} :الاسم</p>
                     <p className="profileFont">{data.email} :البريد الالكتروني</p>
                     <p className="profileFont">رقم الهاتف:{data.mobile}</p>
                     {Cookies.getJSON("session").type == "Volunteer" ? (
                        <p className="profileFont">الرقم القومي:{data.ssn}</p>
                     ) : (
                        <p className="profileFont">رقم اخر:{data.mobile}</p>
                     )}
                  </div>
                  <div className="imageHolder">
                     <img src={data.pic} alt="profile" className="profileImage" />
                  </div>
                  <div className="editButtonHolder">
                     <Button content="تحديث البيانات" secondary onClick={ChangeInfo} />
                  </div>
                  {Cookies.getJSON("session").type == "Volunteer" ? (
                     <div className="flipButtonHolder">
                        <Button content="الأعمال" primary onClick={handleFlip} />
                     </div>
                  ) : (
                     <></>
                  )}
               </div>

               <div className="BackCard">
                  <div className="Works">
                     <p>عمل1</p>
                     <p>عمل2</p>
                  </div>
                  <Button content="المعلومات الشخصيه" primary onClick={handleFlip} />
                  <Button content="عرض كل الأعمال" primary onClick={allJobs} />
               </div>
            </ReactCardFlip>
         </div>
      </>
   ) : (
      //404 page
      <div></div>
   );
}
