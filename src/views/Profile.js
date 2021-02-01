import "../styles/profile.css";
import pic from "../assets/img.jpg";

function Profile() {
   return (
      <div className="main-content">
         <div className="center-content">
            <div className="name-card">
               <img src={pic} alt="Avatar" />
               <div className="body-container">
                  <h4>Ali Osman</h4>
                  <p>Engineer</p>
               </div>
            </div>
            <div className="achievements-card">
               <h1 className="achievements-header">Achievements</h1>
               <div className="body-container">
                  <div className="container darker">
                     <img src={pic} alt="Avatar" className="right" />
                     <p>Hello. How are you today?</p>
                     <span className="time-right">11:00</span>
                  </div>
               </div>
               <div className="body-container">
                  <div className="container darker">
                     <img src={pic} alt="Avatar" className="right" />
                     <p>Hello. How are you today?</p>
                     <span className="time-right">11:00</span>
                  </div>
               </div>
               <div className="body-container">
                  <div className="container darker">
                     <img src={pic} alt="Avatar" className="right" />
                     <p>Hello. How are you today?</p>
                     <span className="time-right">11:00</span>
                  </div>
               </div>
               <div className="body-container">
                  <div className="container darker">
                     <img src={pic} alt="Avatar" className="right" />
                     <p>Hello. How are you today?</p>
                     <span className="time-right">11:00</span>
                  </div>
               </div>
               <div>Buttons</div>
            </div>
         </div>
      </div>
   );
}

export default Profile;
