import React,{useEffect,useState} from 'react'
import { Button, Modal } from 'semantic-ui-react'
import "../styles/customEventDetails.css"
import Cookies from "js-cookie";
import axios from "axios";
import { MDBDataTableV5, MDBBadge } from "mdbreact";
import { Rating } from "semantic-ui-react";
import serverURL from "../Utils/global";

const OrgDetails = (props) => {
  const [open, setOpen] = React.useState(false)
   const [myEventsRows, setMyEventsRows] = useState([]);
   const [myEventsColumns] = useState([
      { label: "اسم العمل", field: "eventInfo", width: 100 },
      {
         label: "المدينه",
         field: "city",
         width: 100,
      },
      {
         label: "تاريخ البدايه",
         field: "startDate",
         width: 100,
      },
      {
         label: "تاريخ الانتهاء",
         field: "endDate",
         width: 100,
      },
      {
         label: "الحاله",
         field: "status",
         width: 100,
      },
   ]);

    const transformData = (data) => {
      //console.log(data);
      data.forEach((dataRow) => {
         let tempObject = {
            eventInfo: dataRow.name,
            orgInfo: dataRow.organization,
            city: dataRow.city,
            startDate: dataRow.registration_date,
            endDate: dataRow.end_date,
                       status: (
               <>
                  {dataRow.can_register === "working" ? (
                     <MDBBadge color="warning" key={dataRow.id}>
                        التسجيل مفتوح
                     </MDBBadge>
                  ) : (
                    dataRow.is_ended === "working" ? (
                    <MDBBadge color="success" key={dataRow.id}>
                        يعمل
                     </MDBBadge>
                    ):
                    (<MDBBadge color="danger" key={dataRow.id}>
                        انتهي
                     </MDBBadge>)
                  )}
               </>
            ),
 
         };
         setMyEventsRows((oldArray) => [...oldArray, tempObject]);
      });
   };

useEffect(()=>{      
  
  const token = Cookies.getJSON("session").token;
      const config = {
         headers: { Authorization: `bearer ${token}` },
      };

        axios
         .get(serverURL + "/organization/show/"+props.props.org.id, config)
         .then(function (response) {
          // console.log("THIS IS RESPONSE")
            //console.log(response.data.message.jobs);
            transformData(response.data.message.jobs)
         })
         .catch(console.log);
},[])

  //console.log(props.props);
  return (
    <Modal

      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      trigger={  <a href="#" className="text-decoration-none blue-text">{props.props.org.name}</a>}
    >
      <Modal.Content scrolling >
        <Modal.Description className="descriptionHolder">
 <MDBDataTableV5
            hover
            entriesOptions={[5, 10, 20, 25]}
            entries={10}
            pagesAmount={4}
            data={{ columns: myEventsColumns, rows: myEventsRows }} 
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

export default OrgDetails
