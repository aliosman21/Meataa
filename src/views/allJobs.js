import "../styles/MyEvents.css";
import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import { Rating } from "semantic-ui-react";
import JsonData from "../data/data.json";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBadge } from "mdbreact";

export default function AllJobs() {
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [myEventsColumns, setMyEventsColumns] = useState([
      {
         label: JsonData.AllJobs.orgName,
         field: "orgInfo",
         width: 150,
      },
      { label: JsonData.AllJobs.eventName, field: "eventInfo", width: 150 },

      {
         label: JsonData.AllJobs.orgEmail,
         field: "orgEmail",
         width: 150,
      },
      {
         label: JsonData.AllJobs.orgPrimaryPhoneNumber,
         field: "orgMobile",
         width: 150,
      },
      {
         label: JsonData.AllJobs.orgSecondaryPhoneNumber,
         field: "orgMobile1",
         width: 150,
      },
      {
         label: JsonData.AllJobs.city,
         field: "city",
         width: 150,
      },
      {
         label: JsonData.AllJobs.status,
         field: "status",
         width: 150,
      },
      {
         label: JsonData.AllJobs.startDate,
         field: "startDate",
         width: 150,
      },
      {
         label: JsonData.AllJobs.endDate,
         field: "endDate",
         width: 150,
      },
      {
         label: JsonData.AllJobs.rating,
         field: "rate",
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
            orgEmail: dataRow.organization_email,
            orgMobile: dataRow.organization_mobile,
            orgMobile1: dataRow.organization_mobile2,
            startDate: dataRow.registration_date,
            endDate: dataRow.end_date,
            status: (
               <>
                  {dataRow.status == "pending" ? (
                     <MDBBadge color="warning" key={dataRow.id}>
                        {JsonData.AllJobs.pending}
                     </MDBBadge>
                  ) : dataRow.status == "rejected" ? (
                     <MDBBadge color="danger" key={dataRow.id}>
                        {JsonData.AllJobs.rejected}
                     </MDBBadge>
                  ) : (
                     <MDBBadge color="success" key={dataRow.id}>
                        {JsonData.AllJobs.accepted}
                     </MDBBadge>
                  )}
               </>
            ),
            rate: (
               <>
                  {dataRow.status == "rejected" ? (
                     <MDBBadge color="danger" key={dataRow.id}>
                        {JsonData.AllJobs.unrated}
                     </MDBBadge>
                  ) : dataRow.is_ended == "working" ? (
                     <MDBBadge color="warning" key={dataRow.id}>
                        {JsonData.AllJobs.notRatedYet}
                     </MDBBadge>
                  ) : (
                     <Rating
                        key={dataRow.id}
                        maxRating={5}
                        size="huge"
                        icon="star"
                        disabled
                        defaultRating={dataRow.stars}
                     />
                  )}
               </>
            ),
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
            console.log(response.data.data.jobs);
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
            scrollX
            data={{ columns: myEventsColumns, rows: myEventsRows }}
            className="My-events-font"
            entriesLabel="المبادرات"
            searchLabel="بحث"
         />
      </>
   );
}
