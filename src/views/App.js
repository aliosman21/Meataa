//import "../styles/App.css";
import React, { Component } from "react";

import Navigation from "../components/navigation";
import Header from "../components/header";
import Features from "../components/features";
import About from "../components/about";
import Gallery from "../components/gallery";
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
            <Features data={this.state.landingPageData.Features} />
            <About data={this.state.landingPageData.About} />
            <Gallery />
            <Team data={this.state.landingPageData.Team} />
            <Contact data={this.state.landingPageData.Contact} />
         </div>
      );
   }
}

export default App;
