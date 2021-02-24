import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import "../styles/customEventDetails.css"
import Cookies from "js-cookie";
import axios from "axios";
import { MDBDataTableV5,  MDBRating, MDBBadge, MDBNavItem, MDBNavLink } from "mdbreact";
import serverURL from "../Utils/global";

import {
   MDBBtn
} from "mdbreact";


const VolDetails = (props) => {
  const [open, setOpen] = React.useState(false)

  const registerToEvent = () =>{
   };
  console.log(props.props);
  return (
    <Modal

      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={  <a href="#" class="text-decoration-none blue-text">{props.props.vol.name}</a>}
    >
      <Modal.Content scrolling >
        <Modal.Description className="descriptionHolder">
 <MDBDataTableV5
            hover
            entriesOptions={[5, 10, 20, 25]}
            entries={10}
            pagesAmount={4}
           /*  data={{ columns: myEventsColumns, rows: myEventsRows }} */
            btn
            className="My-events-font"
            entriesLabel="المبادرات"
            searchLabel="بحث"
         />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() =>  setOpen(false)}>الغاء</Button>       
      </Modal.Actions>
    </Modal>
  )
}

export default VolDetails
