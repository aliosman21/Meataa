import React, { useState, useEffect } from "react";
import { getTags } from "../Utils/getTagsUtil";
import { MDBInput } from "mdbreact";
import { Button } from "semantic-ui-react";
import axios from "axios";
import serverURL from "../Utils/global";
import Banner from "../components/banner";
import { MDBBtn } from "mdbreact";
import { Dropdown } from "semantic-ui-react";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import Footer from "../components/footer";
import { useAlert } from "react-alert";
import JsonData from "../data/data.json";
import "../styles/register.css";

export default function Register() {
   const alert = useAlert();
   const [volunteer, setVolunteer] = useState(true);
   const [tags, setTags] = useState([]);
   const [usedTags, setUsedTags] = useState([]);
   const [img, setImg] = useState("");
   const [fullName, setFullName] = useState("");
   const [NID, setNID] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [mobile, setMobile] = useState("");
   const [mobile1, setMobile1] = useState("");

   const getBase64 = async (e) => {
      const reader = new FileReader();
      reader.onload = function (e) {
         setImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
   };

   const switchVolunteer = () => {
      setVolunteer(!volunteer);
   };
   const onChangeFullname = (event) => {
      setFullName(event.target.value);
   };
   const onChangeEmail = (event) => {
      setEmail(event.target.value);
   };
   const onChangePassword = (event) => {
      setPassword(event.target.value);
   };
   const onChangeNID = (event) => {
      setNID(event.target.value);
   };
   const onChangeMobile = (event) => {
      setMobile(event.target.value);
   };
   const onChangeMobile1 = (event) => {
      setMobile1(event.target.value);
   };
   const registerNewUser = async (e) => {
      e.preventDefault();
      console.log("Tags should be here");
      console.log(usedTags);

      const newEntity = {
         name: fullName,
         email: email,
         password: password,
         mobile: mobile,
         mobile2: mobile1,
         NID: NID,
         img: img,
         tags: usedTags,
      };
      //console.log(newEntity);
      let requestURL;
      volunteer
         ? (requestURL = serverURL + "/volunteer/store")
         : (requestURL = serverURL + "/organization/store");
      if (fullName && email && password && mobile && img && usedTags && (NID || mobile1)) {
         axios
            .post(requestURL, newEntity)
            .then(function (response) {
               alert.show(JsonData.Register.successAlert);
               setTimeout(() => {
                  console.log("");
                  window.location.href = "/";
               }, 2000);
            })
            .catch(function (error) {
               alert.error(JsonData.Register.failAlert);
               console.log(error);
            });
      } else {
         alert.error(JsonData.Register.correctInfoAlert);
      }
   };

   const switchActivity = (e, data) => {
      e.preventDefault();
      setUsedTags([]);
      //console.log(data);
      let taggies = [];
      for (let tagList in data.options) {
         for (let tag in data.value) {
            if (data.options[tagList].text === data.value[tag]) {
               taggies.push(tags[tagList].key);
            }
         }
      }
      setUsedTags(taggies);
      //console.log(usedTags);
   };

   useEffect(() => {
      getTags().then((tagList) => {
         setTags(tagList);
      });
   }, []);

   return (
      <>
         <Banner data={{ header: "تسجيل حساب جديد" }} />
         <div className="custom-content-register">
            <div className="custom-container-register">
               <MDBContainer>
                  <MDBRow>
                     <MDBCol md="12" className="d-flex justify-content-center">
                        <form>
                           <p className="text-center mb-4 mt-4 headerText">
                              {JsonData.Register.header}
                           </p>
                           <Button
                              toggle
                              type="button"
                              active={true}
                              className="register-label-button"
                              onClick={switchVolunteer}>
                              {volunteer ? JsonData.Register.vol : JsonData.Register.org}
                           </Button>
                           <div className="">
                              <MDBInput
                                 label={JsonData.Register.fullName}
                                 className="textDirection"
                                 icon="user"
                                 group
                                 onChange={onChangeFullname}
                                 type="text"
                                 size="lg"
                                 validate
                                 error="wrong"
                                 success="right"
                              />
                              <MDBInput
                                 label={JsonData.Register.email}
                                 className="textDirection"
                                 icon="envelope"
                                 group
                                 onChange={onChangeEmail}
                                 type="email"
                                 size="lg"
                                 validate
                                 error="wrong"
                                 success="right"
                              />
                              <MDBInput
                                 label={JsonData.Register.password}
                                 icon="lock"
                                 className="textDirection"
                                 onChange={onChangePassword}
                                 group
                                 size="lg"
                                 type="password"
                                 validate
                              />
                              <MDBInput
                                 label={JsonData.Register.phone}
                                 className="textDirection"
                                 icon="mobile-alt"
                                 onChange={onChangeMobile}
                                 group
                                 size="lg"
                                 type="text"
                                 validate
                              />
                              {volunteer ? (
                                 <MDBInput
                                    label={JsonData.Register.NID}
                                    icon="address-card"
                                    className="textDirection"
                                    group
                                    onChange={onChangeNID}
                                    type="text"
                                    validate
                                    size="lg"
                                    error="wrong"
                                    success="right"
                                 />
                              ) : (
                                 <MDBInput
                                    label={JsonData.Register.phone2}
                                    className="textDirection"
                                    icon="mobile-alt"
                                    onChange={onChangeMobile1}
                                    group
                                    size="lg"
                                    type="text"
                                    validate
                                 />
                              )}

                              <input
                                 type="file"
                                 id="img"
                                 onChange={getBase64}
                                 name="img"
                                 accept="image/*"
                                 className="image-button image-uploader"
                                 required
                              />
                              <Dropdown
                                 className="mt-3"
                                 placeholder={JsonData.Register.tags}
                                 options={tags}
                                 search
                                 selection
                                 fluid
                                 multiple
                                 allowAdditions
                                 onChange={(e, data) => switchActivity(e, data)}
                              />
                           </div>
                           <div className="text-center ">
                              <MDBBtn
                                 color="green"
                                 className="registerBtn"
                                 type="submit"
                                 onClick={registerNewUser}>
                                 {JsonData.Register.regBtn}
                              </MDBBtn>
                           </div>
                        </form>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
            </div>
         </div>
         <Footer />
      </>
   );
}
