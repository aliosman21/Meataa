import "../styles/MyEvents.css";
import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBtn, MDBBadge } from "mdbreact";
import VolDetails from "../components/VolunteerDetails";
import JsonData from "../data/data.json";

export default function AllVolunteers() {
   const [volRows, setVolRows] = useState([]);
   const [dataCallback, setDataCallback] = useState({});
   const [volColumns, setVolColumns] = useState([
      { label: JsonData.AllVolunteers.volName, field: "userName", width: 150 },
      {
         label: JsonData.AllVolunteers.volEmail,
         field: "userEmail",
         width: 150,
      },
      {
         label: JsonData.AllVolunteers.volPhone,
         field: "userMobile",
         width: 150,
      },
      {
         label: JsonData.AllVolunteers.volNID,
         field: "NID",
         width: 150,
      },
      {
         label: JsonData.AllVolunteers.volTags,
         field: "tags",
         width: 150,
      },
   ]);

   useEffect(() => {
      transformData();
      //console.log(dataCallback);
   }, [dataCallback]);
   const transformData = () => {
      if (Object.keys(dataCallback).length) {
         dataCallback.forEach((dataRow) => {
            //console.log(dataRow);
            let tempObject = {
               userName: (
                  <div>
                     <VolDetails props={{ vol: dataRow }} />
                  </div>
               ),
               userEmail: dataRow.email,
               userMobile: dataRow.mobile,
               NID: dataRow.NID,
               tags: setTagsAsString(dataRow.tags),
            };

            setVolRows((oldArray) => [...oldArray, tempObject]);
         });
      } //console.log(starRates);
   };
   const setTagsAsString = (tags) => {
      console.log(tags);
      let allTags = "";
      tags.forEach((tag) => {
         allTags += tag.text;
         allTags += " , ";
      });
      allTags = allTags.substring(0, allTags.length - 2);
      return allTags;
   };
   useEffect(() => {
      queryMyVolunteers();
   }, []);

   const queryMyVolunteers = () => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      axios
         .get(serverURL + "/volunteer/list", config)
         .then(function (response) {
            //console.log(response.data.message);
            setDataCallback(response.data.message);
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
            scrollX
            data={{ columns: volColumns, rows: volRows }}
            btn
            className="My-events-font"
            entriesLabel="المتطوعين"
            searchLabel="بحث"
         />
      </>
   );
}
