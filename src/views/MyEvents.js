import "../styles/MyEvents.css";
import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import Cookies from "js-cookie";
import JsonData from "../data/data.json";
import { MDBDataTableV5, MDBBtn, MDBBadge, MDBNavLink } from "mdbreact";

export default function MyEvents() {
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [myEventsColumns] = useState([
      { label: JsonData.MyEvents.eventName, field: "eventName", width: 150 },
      {
         label: JsonData.MyEvents.registerEndDate,
         field: "endDateReg",
         width: 150,
      },
      {
         label: JsonData.MyEvents.eventEndDate,
         field: "endDate",
         width: 150,
      },

      {
         label: JsonData.MyEvents.eventCount,
         field: "count",
         width: 150,
      },
      {
         label: JsonData.MyEvents.eventStatus,
         field: "active",
         width: 150,
      },
      {
         label: JsonData.MyEvents.moreInfo,
         field: "moreInfo",
         width: 150,
      },
   ]);
   useEffect(() => {
      queryMyEvents();
      console.log(Cookies.getJSON("session").token);
   }, []);

   const transformData = (data) => {
      //console.log(myEvents);
      // const rows = [];
      data.forEach((dataRow) => {
         let tempObject = {
            eventName: dataRow.name,
            endDate: dataRow.end_date,
            endDateReg: dataRow.registration_date,
            active: (
               <>
                  {dataRow.can_register === "working" ? (
                     <MDBBadge color="warning">{JsonData.MyEvents.eventRegOpen}</MDBBadge>
                  ) : dataRow.is_ended === "working" ? (
                     <MDBBadge color="success">{JsonData.MyEvents.eventInWork}</MDBBadge>
                  ) : (
                     <MDBBadge color="danger">{JsonData.MyEvents.eventEnded}</MDBBadge>
                  )}
               </>
            ),
            count: dataRow.volunteers_count,
            moreInfo: (
               <>
                  <MDBNavLink
                     className="waves-effect waves-light"
                     to={{ pathname: `/EventVolunteer`, params: { dataRow } }}>
                     <MDBBtn color="success" size="sm" className="My-events-font">
                        {JsonData.MyEvents.eventMoreBtn}
                     </MDBBtn>
                  </MDBNavLink>
               </>
            ),
         };
         setMyEventsRows((oldArray) => [...oldArray, tempObject]);
      });
   };
   const queryMyEvents = () => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      axios
         .get(serverURL + "/organization/alljobs", config)
         .then(function (response) {
            //console.log(response.data.data);
            transformData(response.data.data);
         })
         .catch(console.log);
   };

   return (
      <>
         <MDBDataTableV5
            hover
            scrollX
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
