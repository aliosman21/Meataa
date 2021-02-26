/* import React from 'react'
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

  return (
    <Modal

      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={  <MDBBtn className="customButtonFont">سجل العمل</MDBBtn>}
    >
      <Modal.Header className="textRight">تأكيد التسجيل </Modal.Header>
      <Modal.Content>
        <Modal.Description className="descriptionHolder">
          <p className="textRight">
            تم التسجيل بنجاح
          </p>
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() =>  setOpen(false)}>موافق</Button>       
      </Modal.Actions>
    </Modal>
  )
}

export default EventDetails
 */