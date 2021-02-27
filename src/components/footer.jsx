import React from "react";
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import "../styles/colors.css"

const FooterPage = () => {
  return (
    <MDBFooter  className="font-large pt-4 cusColor custFooter">
      <MDBContainer fluid className="text-right text-md-left">
        <MDBRow>
              <MDBCol md="6" className="text-right">
                            
<h1 className="title custom-teamtop">فريق العمل</h1>
                   <p>حسناء المطيري</p>

                   <p>ديمه المطيري</p>
    
                   <p className="cusFooterFont">هيام الشمري</p>

              </MDBCol>
          <MDBCol md="2" className="text-right">
        <h1 className="title  custom-teambot">فريق العمل</h1>
                  
                   <p>سترة العتيبي</p>
       
                   <p>في العنزي</p>
       
  
                   <p className="cusFooterFont">مها الحربي</p>
         
              

          </MDBCol>
          <MDBCol md="3" className="text-right">
            <h1 className="title text-right">تواصل معنا</h1>
                   <p>meataa@gmail.com :البريد الالكتروني</p>
   
                   <p >1234-456-013 :رقم الهاتف</p>

          </MDBCol>
                    <MDBCol md="1" className="text-right">


          </MDBCol>
        </MDBRow>
      </MDBContainer>
      <div className="footer-copyright text-center py-3">
        <MDBContainer fluid>
     
        </MDBContainer>
      </div>
    </MDBFooter>
  );
}

export default FooterPage;