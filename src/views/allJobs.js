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
         label: "التقييم",
         field: "rating",
         width: 150,
      },
   ]);

   const handleStars = (dataRow, val) => {
      console.log(data);
      //console.log(eventDetails);
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      const bodyParameters = {
         job_id: eventDetails.id,
         volunteer_id: dataRow.id,
         rating: val.value,
      };
      //console.log(bodyParameters);
      axios
         .post(serverURL + "/organization/ratevolunteer", bodyParameters, config)
         .then(function (response) {
            //window.location.href = "EventVolunteer";
         })
         .catch(console.log);
   };

   useEffect(() => {
      if (starRates.length === dataCallback.length) {
         let i = 0;
         dataCallback.forEach((dataRow) => {
            let tempObject = {
               eventInfo: dataRow.name,
               orgInfo: dataRow.email,
               rating: (
                  <>
                     {eventDetails.is_ended == "working" ? (
                        <MDBBadge color="success">قيد العمل</MDBBadge>
                     ) : (
                        <MDBRating
                           data={starRates[i]}
                           getValue={(val) => handleStars(dataRow, val)}
                        />
                     )}
                  </>
               ),
            };
            i++;
            setMyEventsRows((oldArray) => [...oldArray, tempObject]);
         });
         //console.log(starRates);
      }
   }, [starRates]);

   const transformData = (data) => {
      data.forEach((dataRow) => {
         let rates = [
            {
               tooltip: "Very Bad",
            },
            {
               tooltip: "Poor",
            },
            {
               tooltip: "Ok",
            },
            {
               tooltip: "Good",
            },
            {
               tooltip: "Excellent",
            },
         ];
         if (dataRow.rating == -1) {
            setStarRates((oldArray) => [...oldArray, rates]);
         } else {
            let i = 0;
            rates.forEach((rate) => {
               if (dataRow.rating - 1 == i) {
                  rate["choosed"] = true;
               }
               i++;
            });

            setStarRates((oldArray) => [...oldArray, rates]);
         }
      });
   };
   useEffect(() => {
      queryMyWork();
   }, []);

   const queryMyWork = () => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };

      //console.log(eventDetails);
      /*       const bodyParameters = {
         job_id: eventDetails.id,
      };
      axios
         .post(serverURL + "/jobs/volunteers", bodyParameters, config)
         .then(function (response) {
            setDataCallback(response.data);
            transformData(response.data);
         })
         .catch(console.log); */
   };

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
