import "../styles/MyEvents.css";
import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBtn, MDBBadge } from "mdbreact";
import { Rating } from "semantic-ui-react";
import { useAlert } from "react-alert";
import JsonData from "../data/data.json";
import OrgDetails from "../components/OrgDetails";

export default function AllOrganizations() {
   const alert = useAlert();
   const [volRows, setVolRows] = useState([]);
   const [dataCallback, setDataCallback] = useState({});
   const [volColumns, setVolColumns] = useState([
      { label: JsonData.AllOrganizations.orgName, field: "userName", width: 150 },
      {
         label: JsonData.AllOrganizations.orgEmail,
         field: "userEmail",
         width: 150,
      },
      {
         label: JsonData.AllOrganizations.orgPrimaryPhoneNumber,
         field: "userMobile",
         width: 150,
      },
      {
         label: JsonData.AllOrganizations.orgSecondaryPhoneNumber,
         field: "userMobile1",
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
                     <OrgDetails props={{ org: dataRow }} />
                  </div>
               ),
               userEmail: dataRow.email,
               userMobile: dataRow.mobile,
               userMobile1: dataRow.mobile2,
            };

            setVolRows((oldArray) => [...oldArray, tempObject]);
         });
      } //console.log(starRates);
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
         .get(serverURL + "/organization/list", config)
         .then(function (response) {
            //console.log(response);
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
