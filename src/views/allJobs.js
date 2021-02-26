import "../styles/MyEvents.css";
import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import { Rating } from "semantic-ui-react";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBadge } from "mdbreact";

export default function AllJobs() {
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [myEventsColumns, setMyEventsColumns] = useState([
      {
         label: "اسم المبادره",
         field: "orgInfo",
         width: 150,
      },
      { label: "اسم العمل", field: "eventInfo", width: 150 },

      {
         label: "بريد المبادره الالكتروني",
         field: "orgEmail",
         width: 150,
      },
      {
         label: "رقم المبادره",
         field: "orgMobile",
         width: 150,
      },
      {
         label: "رقم اخر",
         field: "orgMobile1",
         width: 150,
      },
      {
         label: "المدينه",
         field: "city",
         width: 150,
      },
      {
         label: "الحاله",
         field: "status",
         width: 150,
      },
      {
         label: "تاريخ البدايه",
         field: "startDate",
         width: 150,
      },
      {
         label: "تاريخ الانتهاء",
         field: "endDate",
         width: 150,
      },
      {
         label: "التقيم",
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
                        لم يتم التأكيد
                     </MDBBadge>
                  ) : dataRow.status == "rejected" ? (
                     <MDBBadge color="danger" key={dataRow.id}>
                        مرفوض
                     </MDBBadge>
                  ) : (
                     <MDBBadge color="success" key={dataRow.id}>
                        مشترك
                     </MDBBadge>
                  )}
               </>
            ),
            rate: (
               <>
                  {dataRow.status == "rejected" ? (
                     <MDBBadge color="danger" key={dataRow.id}>
                        غير قابل للتقيم
                     </MDBBadge>
                  ) : dataRow.is_ended == "working" ? (
                     <MDBBadge color="warning" key={dataRow.id}>
                        لم يقيم
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
