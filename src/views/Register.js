import React, { useState, useEffect } from "react";
import imageToBase64 from "image-to-base64";
import { getTags } from "../Utils/getTagsUtil";
import "../styles/register.css";

export default function Register() {
   const [userReg, setUserReg] = useState(0);
   const [tags, setTags] = useState([]);
   const [usedTags] = useState([]);

   let fullName = React.createRef();
   let SSN = React.createRef();
   let email = React.createRef();
   let password = React.createRef();
   let mobile = React.createRef();
   let mobile2 = React.createRef();
   let userImage = React.createRef();

   const changeTags = (userTag) => {
      if (usedTags.includes(userTag.target.id)) {
         const index = usedTags.indexOf(userTag.target.id);
         usedTags.splice(index, 1);
      } else {
         usedTags.push(userTag.target.id);
      }
      //console.log(usedTags);
   };

   const registerVolunteer = () => {
      imageToBase64(userImage.current.value) // Path to the image
         .then((response) => {
            console.log("Image " + response); // "cGF0aC90by9maWxlLmpwZw=="
         })
         .catch((error) => {
            console.log(error); // Logs an error if there was one
         });
      console.log(fullName.current.value);
      console.log(password.current.value);
      console.log(email.current.value);
      console.log(SSN.current.value);
      console.log(mobile.current.value);
      // console.log(userImage.current.value);
      console.log(usedTags);
   };

   const registerOrganization = () => {
      console.log("DONZO");
   };
   useEffect(() => {
      getTags().then((taglist) => {
         setTags(taglist);
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
                        ref={userImage}
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
                     <button className="register-button" type="submit" onClick={registerVolunteer}>
                        أنضم الان
                     </button>
                  </div>
               </>
            ) : (
               <>
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
                        ref={userImage}
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
               </>
            )}
         </div>
      </div>
   );
}
