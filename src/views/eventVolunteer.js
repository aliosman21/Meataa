import "../styles/MyEvents.css";
import React, { useState, useEffect } from "react";
import serverURL from "../Utils/global";
import axios from "axios";
import Cookies from "js-cookie";
import { MDBDataTableV5, MDBBtn, MDBBadge } from "mdbreact";
import { Rating } from "semantic-ui-react";
import { useAlert } from "react-alert";
import VolDetails from "../components/VolunteerDetails";
import JsonData from "../data/data.json";

export default function EventVolunteer(props) {
   const alert = useAlert();
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [eventDetails, setMyEventDetails] = useState({});
   const [starRates, setStarRates] = useState([]);
   const [dataCallback, setDataCallback] = useState({});
   const [myEventsColumns, setMyEventsColumns] = useState([
      { label: JsonData.eventVol.volName, field: "userName", width: 150 },
      {
         label: JsonData.eventVol.volEmail,
         field: "userEmail",
         width: 150,
      },
      {
         label: JsonData.eventVol.volPhone,
         field: "userMobile",
         width: 150,
      },
      {
         label: JsonData.eventVol.volNID,
         field: "NID",
         width: 150,
      },
      {
         label: JsonData.eventVol.volStatus,
         field: "active",
         width: 150,
      },
      {
         label: JsonData.eventVol.volRate,
         field: "rating",
         width: 150,
      },
   ]);

   const handleStars = (dataRow, event) => {
      console.log(dataRow);
      console.log(event.target.ariaPosInSet);
      //console.log(eventDetails);
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      const bodyParameters = {
         job_id: eventDetails.id,
         volunteer_id: dataRow.id,
         rating: event.target.ariaPosInSet,
      };
      //console.log(bodyParameters);
      axios
         .post(serverURL + "/organization/ratevolunteer", bodyParameters, config)
         .then(function (response) {
            console.log(response);
         })
         .catch(console.log);
   };

   const handleAccept = (data) => {
      //console.log(data);
      //console.log(eventDetails);
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      const bodyParameters = {
         job_id: eventDetails.id,
         volunteer_id: data.id,
         value: "accepted",
      };
      console.log(bodyParameters);
      axios
         .post(serverURL + "/organization/updaterequest", bodyParameters, config)
         .then(function (response) {
            window.location.href = "EventVolunteer";
         })
         .catch(console.log);
   };
   const handleReject = (data) => {
      //console.log(data);
      //console.log(eventDetails);
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      const bodyParameters = {
         job_id: eventDetails.id,
         volunteer_id: data.id,
         value: "rejected",
      };
      console.log(bodyParameters);
      axios
         .post(serverURL + "/organization/updaterequest", bodyParameters, config)
         .then(function (response) {
            window.location.href = "EventVolunteer";
         })
         .catch(console.log);
   };

   useEffect(() => {
      if (starRates.length === dataCallback.length) {
         dataCallback.forEach((dataRow) => {
            console.log(dataRow);
            let tempObject = {
               userName: (
                  <div>
                     <VolDetails props={{ vol: dataRow }} />
                  </div>
               ),
               userEmail: dataRow.email,
               userMobile: dataRow.mobile,
               NID: dataRow.NID,
               active: (
                  <>
                     {dataRow.status == "pending" && eventDetails.is_ended == "working" ? (
                        <>
                           <MDBBtn
                              color="success"
                              size="sm"
                              className="My-events-font"
                              onClick={() => handleAccept(dataRow)}>
                              {JsonData.eventVol.volAcceptBtn}
                           </MDBBtn>
                           <MDBBtn
                              color="danger"
                              size="sm"
                              className="My-events-font"
                              onClick={() => handleReject(dataRow)}>
                              {JsonData.eventVol.volRejectBtn}
                           </MDBBtn>
                        </>
                     ) : (
                        <MDBBadge color="success">{JsonData.eventVol.volAccepted}</MDBBadge>
                     )}
                  </>
               ),
               rating: (
                  <>
                     {eventDetails.is_ended == "working" ? (
                        <MDBBadge color="success">{JsonData.eventVol.volWorking}</MDBBadge>
                     ) : (
                        <Rating
                           maxRating={5}
                           size="huge"
                           icon="star"
                           defaultRating={dataRow.rating}
                           onRate={(event) => handleStars(dataRow, event)}
                        />
                     )}
                  </>
               ),
            };

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
      props.location.params
         ? localStorage.setItem("eventInfo", JSON.stringify(props.location.params.dataRow))
         : console.log();
      queryMyVolunteers();
   }, []);

   const queryMyVolunteers = () => {
      const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };
      let retrievedObject;
      if (localStorage.getItem("eventInfo")) {
         retrievedObject = localStorage.getItem("eventInfo");
         //console.log("retrievedObject: ", JSON.parse(retrievedObject));
         Object.assign(eventDetails, JSON.parse(retrievedObject));
      } else {
         alert.error(JsonData.eventVol.volAlertError);
         window.location.href("/MyEvents");
      }
      //console.log(eventDetails);
      const bodyParameters = {
         job_id: eventDetails.id,
      };
      axios
         .post(serverURL + "/jobs/volunteers", bodyParameters, config)
         .then(function (response) {
            // console.log(response);
            setDataCallback(response.data);
            transformData(response.data);
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
            data={{ columns: myEventsColumns, rows: myEventsRows }}
            btn
            className="My-events-font"
            entriesLabel="المبادرات"
            searchLabel="بحث"
         />
      </>
   );
}
