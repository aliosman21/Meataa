import "../styles/MyEvents.css";

import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBtn, MDBRating, MDBBadge, MDBNavItem, MDBNavLink } from "mdbreact";
import { data } from "jquery";

export default function AllJobs() {
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [eventDetails, setMyEventDetails] = useState({});

   const [starRates, setStarRates] = useState([]);
   const [dataCallback, setDataCallback] = useState({});
   const [myEventsColumns, setMyEventsColumns] = useState([
      { label: "اسم العمل", field: "eventInfo", width: 150 },
      {
         label: "اسم المبادره",
         field: "orgInfo",
         width: 150,
      },
      {
         label: "المدينه",
         field: "city",
         width: 150,
      },
   ]);

   const transformData = (data) => {
      console.log(data);
      data.forEach((dataRow) => {
         let tempObject = {
            eventInfo: dataRow.name,
            orgInfo: dataRow.organization,
            city: dataRow.city,
         };
         setMyEventsRows((oldArray) => [...oldArray, tempObject]);
      });
   };

   useEffect(() => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      axios
         .get(serverURL + "/userdata", config)
         .then(function (response) {
            //console.log(response.data.data.jobs);
            transformData(response.data.data.jobs);
         })
         .catch(console.log);
   }, []);

   return (
      <>
         <MDBDataTableV5
            hover
            entriesOptions={[5, 10, 20, 25]}
            entries={10}
            pagesAmount={4}
            data={{ columns: myEventsColumns, rows: myEventsRows }}
            btn
            className="My-events-font"
            entriesLabel="المبادرات"
            searchLabel="بحث"
         />
      </>
   );
}
