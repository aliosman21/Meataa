import "../styles/App.css";
import Slider from "../components/slideShow";
import Cards from "../components/Card";
function App() {
   return (
      <div className="main-content">
         <div className="slideShowHolder">
            <Slider />
         </div>
         <div className="landingPageBreak z-depth-4"></div>
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