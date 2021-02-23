import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import "../styles/customEventDetails.css"
import Cookies from "js-cookie";
import axios from "axios";
import serverURL from "../Utils/global";

import {
   MDBBtn
} from "mdbreact";


const EventDetails = (props) => {
  const [open, setOpen] = React.useState(false)

  const registerToEvent = () =>{
  const token = Cookies.getJSON("session").token;
  const config = {
         headers: { Authorization: `bearer ${token}` },
      };

      //console.log("Ya hady")
      //console.log(props.props.event)

     const bodyParameters = {
         job_id: props.props.event.id
      }; 
      console.log(bodyParameters);
      axios
         .post(serverURL + "/volunteer/request", bodyParameters, config)
         .then(function (response) {
            alert("تم التسجيل بنجاح");
            //console.log(response);
         })
         .catch(console.log);
      //console.log(bodyParameters);
      //console.log(token);  
   };
  //console.log(props.props);
  return (
    <Modal

      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={  <MDBBtn className="customButtonFont">عرض المزيد</MDBBtn>}
    >
      <Modal.Header className="textRight">{props.props.event.name}</Modal.Header>
      <Modal.Content image scrolling >
        <Image size='medium'  src={serverURL+props.props.event.img}  wrapped />
        <Modal.Description className="descriptionHolder">
          <p className="textRight">
            {props.props.event.organization}
          </p>
            <p className="textRight">تاريخ الانتهاء: {props.props.event.end_date}</p>
            <p className="textRight">المحتوي</p>
            <p className="descriptionFonter">{props.props.event.description}</p>
         <Image
            src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
            style={{ marginBottom: 10 }}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() =>  setOpen(false)}>الغاء</Button>
         {Cookies.getJSON('session').type !== "Organization"?( <Button onClick={() => {
           registerToEvent();
          setOpen(false)}} positive>
          تسجيل
        </Button>):(<></>)}
       
      </Modal.Actions>
    </Modal>
  )
}

export default EventDetails
