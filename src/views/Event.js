import React from "react";
import "../styles/eventPage.css";
import Cookies from "js-cookie";
export default function Event(props) {
   /*   const [pageId, setPageId] = useState(
      props.location.query.event != undefined ? props.location.query.event : -1
   ); */
   //will wait for db to set events to cookies

   Cookies.set("event", { event: props.location.query.event });
   //console.log(pageId);
   /*    const getAchievementsFromDatabase = () => {
      //will call database and fill the data object 4 reviews at atime
      // will need to pass the cookie to the profile page when the backend is done

      let test = Cookies.getJSON("session");
      console.log(test);
      //setPageId(1); to change pages in request to DB
      return data;
   }; */
   return Cookies.getJSON("event") ? (
      <div className="eventMainContent">
         <div className="eventDesc">{Cookies.getJSON("event").event}</div>
      </div>
   ) : (
      <h1>Ali</h1>
   );
}
