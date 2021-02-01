import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";

class RegForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         email: "",
         pass: "",
      };
   }
   handleClick() {
      console.log("this is:", this);
   }
   handleNameChange(e) {
      this.setState((state) => {
         return { [e.target.name]: e.target.value };
      });
      //console.log(this);
      console.log(this);
   }

   render() {
      return (
         <Form>
            <Form.Label className="float-right">الاسم</Form.Label>
            <Form.Control
               type="text"
               required
               placeholder="Ali amr osman"
               name="name"
               onChange={(e) => {
                  this.handleNameChange(e);
               }}
            />

            <Form.Label className="float-right">البريد الالكتروني</Form.Label>
            <Form.Control
               type="email"
               placeholder="ali@gmail.com"
               name="email"
               onChange={(e) => {
                  this.handleNameChange(e);
               }}
            />

            <Form.Label className="float-right">كلمه السر</Form.Label>
            <Form.Control
               type="password"
               placeholder="foo"
               name="pass"
               onChange={(e) => {
                  this.handleNameChange(e);
               }}
            />

            <br></br>
            <Button variant="success" type="submit" onClick={() => this.handleClick()}>
               <p className="m-0 p-0"> انضم لنا</p>
            </Button>
         </Form>
      );
   }
}

export default RegForm;
