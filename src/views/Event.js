import React from "react";
import "../styles/eventPage.css";
import Cookies from "js-cookie";
export default function Event(props) {
   //will wait for db to set events to cookies

   Cookies.set("event", { event: props.location.query.event });

   return Cookies.getJSON("event") ? (
      <div className="eventMainContent">
         <div className="eventDesc">{Cookies.getJSON("event").event}</div>
      </div>
   ) : (
      <h1>Ali</h1>
   );
}
