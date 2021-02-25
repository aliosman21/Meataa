import "../styles/MyEvents.css";

import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import Contact from "../components/contact";
import Banner from "../components/banner";
import JsonData from "../data/data.json";
import axios from "axios";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBtn, MDBRating, MDBBadge, MDBNavItem, MDBNavLink } from "mdbreact";

export default function MyEvents() {
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [myEventsColumns, setMyEventsColumns] = useState([
      { label: "اسم الفعاليه", field: "eventName", width: 150 },
      {
         label: "تاريخ انتهاء الفعاليه",
         field: "endDate",
         width: 150,
      },
      {
         label: "تاريخ انتهاء التسجيل",
         field: "endDateReg",
         width: 150,
      },
      {
         label: "عدد المتقدمين",
         field: "count",
         width: 150,
      },
      {
         label: "حاله الفعاليه",
         field: "active",
         width: 150,
      },
      {
         label: "عرض المزيد",
         field: "moreInfo",
         width: 150,
      },
   ]);

   /*    {
            name: "Garrett Winters",
            position: "Accountant",
            office: "Tokyo",
            age: "63",
            date: "2011/07/25",
            salary: <MDBRating data={basic} getValue={handleStars} />,
         }, */
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
            endDateReg: "someval",
            active: (
               <>
                  {dataRow.is_ended == "working" ? (
                     <MDBBadge color="success">يعمل</MDBBadge>
                  ) : (
                     <MDBBadge color="danger">انتهي</MDBBadge>
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
                        المزيد
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
            //alert("Success");
            //console.log(response.data.data);
            transformData(response.data.data);
            //console.log(response.data.data);
         })
         .catch(console.log);
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
