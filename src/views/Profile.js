import React, { useState, useEffect } from "react";
import "../styles/profile.css";
import Banner from "../components/banner";
import serverURL from "../Utils/global";
import Cookies from "js-cookie";
import { useHistory } from "react-router-dom";
import { MDBNavLink } from "mdbreact";
import ReactCardFlip from "react-card-flip";
import axios from "axios";
import { Button } from "semantic-ui-react";

export default function Profile() {
   const [isFlipped, setIsFlipped] = useState(false);
   const getDataFromCookie = () => {
      let profileData = Cookies.getJSON("session");
      let data = {
         name: profileData.name,
         ssn: profileData.NID,
         mobile: profileData.mobile,
         pic: serverURL + profileData.img,
         email: profileData.email,
         mobile2: profileData.mobile2,
      };
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
            .then(function (response) {})
            .catch(console.log);
      }
   }, [isFlipped]);

   const history = useHistory();
   const ChangeInfo = () => history.push("/setInfo");

   const [data] = useState(() => getDataFromCookie());

   return Cookies.getJSON("session") ? (
      <>
         <Banner data={{ header: "الحساب الشخصي" }} />
         <div className="custom-content-profile">
            <div></div>
            <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
               <div className="FrontCard">
                  <div className="information">
                     <p className="profileFont"> الاسم: {data.name} </p>
                     <p className="profileFont">{data.email} :البريد الالكتروني</p>
                     <p className="profileFont">رقم الهاتف: {data.mobile}</p>
                     {Cookies.getJSON("session").type === "Volunteer" ? (
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
                  {Cookies.getJSON("session").type === "Volunteer" ? (
                     <div className="flipButtonHolder">
                        <Button content="الأعمال" primary onClick={handleFlip} />
                     </div>
                  ) : (
                     <></>
                  )}
               </div>

               <div className="BackCard">
                  <MDBNavLink
                     className="waves-effect waves-light navShortner"
                     to={{ pathname: `#` }}>
                     <Button content="المعلومات الشخصيه" primary onClick={handleFlip} />
                  </MDBNavLink>
                  <MDBNavLink
                     className="waves-effect waves-light navShortner"
                     to={{ pathname: `/allJobs` }}>
                     <Button content="عرض كل الأعمال" primary />
                  </MDBNavLink>
               </div>
            </ReactCardFlip>
         </div>
      </>
   ) : (
      //404 page
      <div></div>
   );
}
