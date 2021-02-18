import React, { useEffect, useState } from "react";
import axios from "axios";
import serverURL from "../Utils/global";
import "../styles/eventPage.css";
import Cookies from "js-cookie";
export default function Event(props) {
   const [eventDetails, seteventDetails] = useState([]);
   //console.log(props);

   Cookies.getJSON("event")
      ? console.log("set")
      : Cookies.set("event", { event: props.location.query.event });

   useEffect(() => {
      return () => {
         Cookies.remove("event");
      };
   }, []);

   useEffect(() => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };

      axios
         .get(serverURL + `/jobs/show/${Cookies.getJSON("event").event}`, config)
         .then(function (response) {
            console.log("id is");
            console.log(Cookies.getJSON("event").event);
            seteventDetails(response.data.data);
            console.log(response.data.data);
         })
         .catch(console.log);
   }, []);
   //{Cookies.getJSON("event").event}

   return Cookies.getJSON("event") ? (
      <div className="eventMainContent">
         <div className="eventDescCard"></div>
      </div>
   ) : (
      <h1>wrong page</h1>
   );
}
