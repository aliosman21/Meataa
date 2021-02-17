import React, { useState, useEffect } from "react";
import { getTags } from "../Utils/getTagsUtil";
import axios from "axios";
import serverURL from "../Utils/global";
import "../styles/register.css";

export default function Register() {
   const [userReg, setUserReg] = useState(0);
   const [tags, setTags] = useState([]);
   const [usedTags] = useState([]);
   const [img, setImg] = useState("");

   let fullName = React.createRef();
   let SSN = React.createRef();
   let email = React.createRef();
   let password = React.createRef();
   let mobile = React.createRef();
   let mobile2 = React.createRef();

   const changeTags = (userTag) => {
      if (usedTags.includes(userTag.target.id) && usedTags) {
         const index = usedTags.indexOf(userTag.target.id);

         usedTags.splice(index, 1);
      } else {
         usedTags.push(userTag.target.id);
      }
   };

   const getBase64 = async (e) => {
      const reader = new FileReader();
      reader.onload = function (e) {
         setImg(reader.result);
      };
      reader.readAsDataURL(e.target.files[0]);
   };

   const registerVolunteer = async (e) => {
      const newVolunteer = {
         name: fullName.current.value,
         email: email.current.value,
         password: password.current.value,
         mobile: mobile.current.value,
         NID: SSN.current.value,
         img: img,
         tags: usedTags,
      };
      //console.log(newVolunteer);
      axios
         .post(serverURL + "/volunteer/store", newVolunteer)
         .then(function (response) {
            alert("registered Successfully");
            window.location.href = "/";
            console.log(response);
         })
         .catch(function (error) {
            alert("Failed");
            console.log(error);
         });
   };

   const registerOrganization = () => {
      const newOrganization = {
         name: fullName.current.value,
         email: email.current.value,
         password: password.current.value,
         mobile: mobile.current.value,
         mobile2: mobile2.current.value,
         img: img,
         tags: usedTags,
      };
      //console.log(newVolunteer);
      axios
         .post(serverURL + "/organization/store", newOrganization)
         .then(function (response) {
            alert("registered Successfully");
            //window.open("/");
            console.log(response);
         })
         .catch(function (error) {
            alert("Failed");
            console.log(error);
         });
   };
   useEffect(() => {
      getTags().then((tagList) => {
         setTags(tagList);
      });
   }, []);

   return (
      <div className="custom-content-register">
         <div className="custom-container-register col-8">
            <h2 className="text-center mb-4 header-text">أنضم لنا</h2>
            <div className="radio-buttons">
               <div className="radioButtons">
                  <div>
                     <input
                        type="radio"
                        id="volunteer"
                        name="userType"
                        value="volunteer"
                        defaultChecked
                        onClick={() => setUserReg(0)}
                     />
                     <label htmlFor="volunteer" className="radioLabel">
                        متطوع
                     </label>
                  </div>
                  <div>
                     <input
                        type="radio"
                        id="organization"
                        name="userType"
                        value="organization"
                        onClick={() => setUserReg(1)}
                     />
                     <label htmlFor="volunteer" className="radioLabel">
                        مبادره
                     </label>
                  </div>
               </div>
            </div>
            {!userReg ? (
               <>
                  <form>
                     <div className="vol-inputs">
                        <input
                           type="text"
                           ref={fullName}
                           className="form-control text-inputs-reg"
                           required
                        />
                        <p className="text-center custom-register-p">الأسم بالكامل</p>
                        <input
                           type="text"
                           ref={SSN}
                           className="form-control text-inputs-reg"
                           required
                        />
                        <p className="text-center custom-register-p">الرقم القومي</p>
                        <input
                           type="text"
                           ref={email}
                           className="form-control text-inputs-reg"
                           required
                        />
                        <p className="text-center custom-register-p">البريد الالكتروني</p>
                        <input type="password" ref={password} className="form-control" required />
                        <p className="text-center custom-register-p">كلمه السر</p>
                        <input type="text" ref={mobile} className="form-control" required />
                        <p className="text-center custom-register-p">رقم الهاتف</p>
                        <input
                           type="file"
                           id="img"
                           onChange={getBase64}
                           name="img"
                           accept="image/*"
                           className="image-button image-uploader"
                           required
                        />
                        <p className="text-center custom-register-p">صورتك الشخصيه</p>
                        <div className="interests">
                           {tags.map((tag) => (
                              <input
                                 key={tag.id}
                                 id={tag.id}
                                 type="checkbox"
                                 onChange={changeTags}></input>
                           ))}

                           {tags.map((tag) => (
                              <label key={tag.id}>{tag.name}</label>
                           ))}
                        </div>
                        <p className="text-center custom-register-p">الاهتمامات</p>
                     </div>
                     <div className="text-center custom-register-button">
                        <button
                           className="register-button"
                           type="submit"
                           onClick={registerVolunteer}>
                           أنضم الان
                        </button>
                     </div>
                  </form>
               </>
            ) : (
               <>
                  <form>
                     <div className="vol-inputs">
                        <input
                           type="text"
                           ref={fullName}
                           className="form-control text-inputs-reg"
                           required
                        />
                        <p className="text-center custom-register-p">اسم الجهه</p>
                        <input
                           type="text"
                           ref={mobile}
                           className="form-control text-inputs-reg"
                           required
                        />
                        <p className="text-center custom-register-p">رقم هاتف</p>
                        <input type="text" ref={mobile2} className="form-control" />
                        <p className="text-center custom-register-p"> رقم هاتف اخر</p>
                        <input type="text" ref={email} className="form-control text-inputs-reg" />
                        <p className="text-center custom-register-p">البريد الالكتروني</p>
                        <input type="password" ref={password} className="form-control" required />
                        <p className="text-center custom-register-p">كلمه السر</p>
                        <input
                           type="file"
                           id="img"
                           name="img"
                           accept="image/*"
                           onChange={getBase64}
                           className="image-button image-uploader"
                           required
                        />
                        <p className="text-center custom-register-p">صوره الجهه</p>
                        <div className="interests">
                           {tags.map((tag) => (
                              <input
                                 key={tag.id}
                                 id={tag.id}
                                 type="checkbox"
                                 onChange={changeTags}></input>
                           ))}

                           {tags.map((tag) => (
                              <label key={tag.id}>{tag.name}</label>
                           ))}
                        </div>
                        <p className="text-center custom-register-p">الاهتمامات</p>
                     </div>
                     <div className="text-center custom-register-button">
                        <button
                           className="register-button"
                           type="submit"
                           onClick={registerOrganization}>
                           أنضم الان
                        </button>
                     </div>
                  </form>
               </>
            )}
         </div>
      </div>
   );
}
