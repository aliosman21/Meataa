import React from 'react'
import { Button, Icon, Image, Modal } from 'semantic-ui-react'
import "../styles/customEventDetails.css"
import serverURL from "../Utils/global";

const EventDetails = (props) => {
  const [open, setOpen] = React.useState(false)

  console.log(props.props);
  return (
    <Modal

      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={<Button>معرفه المزيد</Button>}
    >
      <Modal.Header className="textRight">{props.props.event.name}</Modal.Header>
      <Modal.Content image scrolling >
        <Image size='medium'  src={serverURL+props.props.event.img}  wrapped />
        <Modal.Description>
          <p className="textRight">
            {props.props.event.organization}
          </p>
            <p className="textRight">تاريخ الانتهاء: 2020-2-23</p>
         <Image
            src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
            style={{ marginBottom: 10 }}
          />
                <Image
            src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
            style={{ marginBottom: 10 }}
          />
                <Image
            src='https://react.semantic-ui.com/images/wireframe/paragraph.png'
            style={{ marginBottom: 10 }}
          />
        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button onClick={() => setOpen(false)}>الغاء</Button>
        <Button onClick={() => setOpen(false)} positive>
          تسجيل
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export default EventDetails
