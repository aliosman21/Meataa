import "../styles/App.css";
import Pic1 from "../assets/LP1.jpg";
import Slider from "../components/slideShow";
import Cards from "../components/Card";
function App() {
   return (
      <div className="main-content">
         <div className="slideShowHolder">
            <Slider />
         </div>
         <div className="landingPageBreak "></div>
         <div className="bottomCardSection ">
            <Cards />
            <Cards />
            <Cards />
         </div>
         <div className="footer"></div>
      </div>
   );
}

export default App;
