import "../styles/MyEvents.css";
import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBtn, MDBBadge, MDBNavLink } from "mdbreact";

export default function MyEvents() {
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [myEventsColumns] = useState([
      { label: "اسم الفعاليه", field: "eventName", width: 150 },
      {
         label: "تاريخ انتهاء التسجيل",
         field: "endDateReg",
         width: 150,
      },
      {
         label: "تاريخ انتهاء الفعاليه",
         field: "endDate",
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
                     <MDBBadge color="warning">التسجيل مفتوح</MDBBadge>
                  ) : dataRow.is_ended === "working" ? (
                     <MDBBadge color="success">قيد العمل</MDBBadge>
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
            console.log(response.data.data);
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
