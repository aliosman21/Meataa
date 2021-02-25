//import "../styles/App.css";
import React, { Component } from "react";
import Header from "../components/header";
import Features from "../components/features";
import About from "../components/about";
import Gallery from "../components/gallery";
import Footer from "../components/footer";
import Team from "../components/Team";
import Contact from "../components/contact";
import JsonData from "../data/data.json";

class App extends Component {
   state = {
      landingPageData: {},
   };
   getlandingPageData() {
      this.setState({ landingPageData: JsonData });
   }

   componentDidMount() {
      this.getlandingPageData();
   }
   render() {
      return (
         <div>
            <Header data={this.state.landingPageData.Header} />
            <About data={this.state.landingPageData.About} />
            <Gallery />
            {/* <Contact data={this.state.landingPageData.Contact} /> */}
            <Footer />
         </div>
      );
   }
}

export default App;
