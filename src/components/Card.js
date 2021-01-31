import React from "react";
import {
   MDBBtn,
   MDBCard,
   MDBCardBody,
   MDBCardImage,
   MDBCardTitle,
   MDBCardText,
   MDBCol,
} from "mdbreact";

function Card() {
   return (
      <MDBCol style={{ maxWidth: "22rem" }}>
         <MDBCard className="z-depth-4">
            <MDBCardImage
               className="img-fluid "
               src="https://mdbootstrap.com/img/Mockups/Lightbox/Thumbnail/img%20(67).jpg"
               waves
            />
            <MDBCardBody>
               <MDBCardTitle className="font-weight-bolder">Card title</MDBCardTitle>
               <MDBCardText className="font-weight-bolder fs-2">
                  Some quick example text to build on the card title and make up the bulk of the
                  card's content.
               </MDBCardText>
            </MDBCardBody>
         </MDBCard>
      </MDBCol>
   );
}

export default Card;
