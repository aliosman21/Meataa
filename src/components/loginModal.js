import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React from "react";

class LoginForm extends React.Component {
   constructor(props) {
      super(props);
      //console.log("THIS IS LOGIN PROPS " + props.loginhandler);
      this.state = { email: "", pass: "" };
   }

   handleClick(e) {
      //console.log("this will send this object to the backend", this);
      e.preventDefault();
      console.log("Props of handle click " + this.props);
      this.props.loginhandler(e);
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
         <Form onSubmit={(e) => this.handleClick(e)}>
            <Form.Label className="float-right">البريد الالكتروني</Form.Label>
            <Form.Control
               type="email"
               placeholder="ali@gmail.com"
               name="email"
               required
               onChange={(e) => {
                  this.handleNameChange(e);
               }}
            />

            <Form.Label className="float-right">كلمه السر</Form.Label>
            <Form.Control
               type="password"
               placeholder="foo"
               name="pass"
               required
               onChange={(e) => {
                  this.handleNameChange(e);
               }}
            />

            <br></br>
            <Button variant="primary" type="submit">
               تسجيل الدخول
            </Button>
         </Form>
      );
   }
}

export default LoginForm;
