import React, { Component } from "react";
import Modal from "react-bootstrap/Modal";
import LogForm from "./loginModal";
import Regform from "./regModal";

class Modalvertical extends Component {
   constructor(props) {
      super(props);
      console.log(props);
   }
   /*    componentDidMount() {
      console.log("HO");
      this.props.loginhandler();
   } */
   loginCallBack = (e) => {
      console.log("HO");
      this.props.onHide();
      this.props.loginhandler();
   };
   //console.log("this is props of vertical Modal " + props.loginhandler);
   render() {
      return (
         <Modal
            show={this.props.show}
            onHide={this.props.onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered>
            <Modal.Header closeButton>
               <Modal.Title id="contained-modal-title-vcenter">
                  <p className="p-0 m-0">Modal heading</p>
               </Modal.Title>
            </Modal.Header>
            <Modal.Body>{this.props.modal ? <Regform /> : <LogForm />}</Modal.Body>
            <Modal.Footer></Modal.Footer>
         </Modal>
      );
   }
}

export default Modalvertical;
