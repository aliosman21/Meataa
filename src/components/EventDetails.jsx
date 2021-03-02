import React from 'react'
import { Button, Image, Modal } from 'semantic-ui-react'
import "../styles/customEventDetails.css"
import Cookies from "js-cookie";
import axios from "axios";
import JsonData from "../data/data.json";
import serverURL from "../Utils/global";
import { useAlert } from 'react-alert'

import {
   MDBBtn
} from "mdbreact";


const EventDetails = (props) => {
  const alert = useAlert()
  const [open, setOpen] = React.useState(false)
//console.log(props.props.event)
  const registerToEvent = () =>{
  const token = Cookies.getJSON("session").token;
  const config = {
         headers: { Authorization: `bearer ${token}` },
      };

      //console.log("Ya hady")
      

     const bodyParameters = {
         job_id: props.props.event.id
      }; 

      axios
         .post(serverURL + "/volunteer/request", bodyParameters, config)
         .then(function (response) {
            alert.show(JsonData.EventDetails.successAlert);
            console.log(response);
         })
      //console.log(bodyParameters);
      //console.log(token);  
   };
  //console.log(props.props);
  return (
    <Modal

      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={  <MDBBtn className="customButtonFont">{JsonData.EventDetails.moreInfo}</MDBBtn>}
    >
      <Modal.Header className="textRight">{props.props.event.name}</Modal.Header>
      <Modal.Content image scrolling >
        <Image size='medium'  src={serverURL+props.props.event.img}  wrapped />
        <Modal.Description className="descriptionHolder">
          <p className="textRight">
            {props.props.event.organization}
          </p>
          <p className="textRight">{JsonData.EventDetails.regEndDate} {props.props.event.registration_date}</p>
            <p className="textRight">{JsonData.EventDetails.eventEndDate} {props.props.event.end_date}</p>
            <p className="textRight">{JsonData.EventDetails.city} {props.props.event.city}</p>
            <p className="textRight">{JsonData.EventDetails.tag} {props.props.event.tag}</p>
            <p className="textRight">{JsonData.EventDetails.description}</p>
            <p className="descriptionFonter">{props.props.event.description}</p>

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() =>  setOpen(false)}>{JsonData.EventDetails.cancelBtn}</Button>
         {Cookies.getJSON('session') && Cookies.getJSON('session').type === "Volunteer"?( <Button onClick={() => {
           registerToEvent();
          setOpen(false)}} positive>
          {JsonData.EventDetails.regBtn}
        </Button>):(<></>)}
       
      </Modal.Actions>
    </Modal>
  )
}

export default EventDetails
