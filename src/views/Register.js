import React, { useState, useEffect } from "react";
import { getTags } from "../Utils/getTagsUtil";
import { MDBInput } from "mdbreact";
import { Button } from "semantic-ui-react";
import axios from "axios";
import serverURL from "../Utils/global";
import Contact from "../components/contact";
import Banner from "../components/banner";
import { MDBBtn, MDBIcon } from "mdbreact";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import JsonData from "../data/data.json";
import SVG from "../components/svg";
import "../styles/register.css";
import { act } from "react-dom/test-utils";

export default function Register() {
   const [volunteer, setVolunteer] = useState(true);
   const [tags, setTags] = useState([]);
   const [tag1, setTag1] = useState([]);
   const [usedTags] = useState([]);
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
      let i = 0;
      for (let tag in tag1) {
         if (tag1[tag] === true) {
            console.log(tag);
            usedTags.push(tags[i]["id"]);
         }
         i++;
      }
      const newEntity = {
         name: fullName,
         email: email,
         password: password,
         mobile: mobile,
         mobile1: mobile1,
         NID: NID,
         img: img,
         tags: usedTags,
      };
      console.log(newEntity);
      let requestURL;
      volunteer
         ? (requestURL = serverURL + "/volunteer/store")
         : (requestURL = serverURL + "/organization/store");
      if (fullName && email && password && mobile && NID && img && usedTags) {
         axios
            .post(requestURL, newEntity)
            .then(function (response) {
               alert("registered Successfully");
               window.location.href = "/";
               console.log(response);
            })
            .catch(function (error) {
               alert("Failed");
               console.log(error);
            });
      } else {
         alert("ادخل بيانات صحيحه");
      }
   };

   const switchActivity = (e, id) => {
      e.preventDefault();
      setTag1((prevState) => prevState.map((item, idx) => (idx === id ? !item : item)));
   };
   useEffect(() => {
      getTags().then((tagList) => {
         tag1.length = tagList.length; // set array size
         tag1.fill(false);
         setTags(tagList);
      });
   }, []);

   return (
      <>
         <Banner data={{ header: "تسجيل حساب جديد" }} />
         <SVG />
         <div className="custom-content-register">
            <div className="custom-container-register">
               <MDBContainer>
                  <MDBRow>
                     <MDBCol md="12" className="d-flex justify-content-center">
                        <form>
                           <p className="text-center mb-4 headerText">انضم لنا</p>
                           <Button
                              size="mini"
                              toggle
                              type="button"
                              active={true}
                              onClick={switchVolunteer}>
                              {volunteer ? "Volunteer" : "Organization"}
                           </Button>
                           <div className="">
                              <MDBInput
                                 label="الاسم بالكامل"
                                 className="textDirection"
                                 icon="user"
                                 iconSize
                                 group
                                 onChange={onChangeFullname}
                                 type="text"
                                 size="lg"
                                 validate
                                 error="wrong"
                                 success="right"
                              />
                              <MDBInput
                                 label="البريد الالكتروني"
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
                                 label="كلمه السر"
                                 icon="lock"
                                 className="textDirection"
                                 onChange={onChangePassword}
                                 group
                                 size="lg"
                                 type="password"
                                 validate
                              />
                              <MDBInput
                                 label="رفم الهاتف"
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
                                    label="الرقم القومي"
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
                                    label="رفم هاتف اخر"
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
                              <div className="registerTagList mt-4 mb-4">
                                 {tags.map((tag) => (
                                    <Button
                                       key={tag.id}
                                       size="mini"
                                       toggle
                                       active={tag1[tag.id - 1]}
                                       onClick={(e) => switchActivity(e, tag.id - 1)}>
                                       {tag.name}
                                    </Button>
                                 ))}
                              </div>
                           </div>
                           <div className="text-center ">
                              <MDBBtn
                                 color="primary"
                                 className="registerBtn"
                                 type="submit"
                                 onClick={registerNewUser}>
                                 انضم لنا
                              </MDBBtn>
                           </div>
                        </form>
                     </MDBCol>
                  </MDBRow>
               </MDBContainer>
            </div>
         </div>
         <Contact data={JsonData} />
      </>
   );
}
