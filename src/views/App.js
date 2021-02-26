//import "../styles/App.css";
import React, { Component } from "react";
import Header from "../components/header";
import About from "../components/about";
import Gallery from "../components/gallery";
import Footer from "../components/footer";
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
            <Footer />
         </div>
      );
   }
}

export default App;
