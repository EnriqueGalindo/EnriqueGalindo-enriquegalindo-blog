import React, { useState, useEffect } from "react";
import { InputGroup, FormControl, Button, Form } from "react-bootstrap";
import { AiFillCaretRight } from "react-icons/ai";

export default function CustomForm({ status, message, onValidated }) {
  const [email, setEmail] = useState("");
  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // const form = e.currentTargets;
    // console.log(form);
    setValidated(true);
    email &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
      });
    console.log("request");
  };

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setEmail("");
  };
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <InputGroup controlId="validationCustom03" hasValidation>
          <FormControl type="email" placeholder="Enter your email" value={email} required onChange={handleChange} />

          <Button variant="outline-secondary" id="button-addon2" type="submit">
            <AiFillCaretRight />
          </Button>
        </InputGroup>
      </Form>
      {status === "sending" && <div className="mc__alert mc__alert--sending">sending...</div>}
      {status === "error" && (
        <div className="mc__alert mc__alert--error" dangerouslySetInnerHTML={{ __html: message }} />
      )}
      {status === "success" && (
        <div className="mc__alert mc__alert--success" dangerouslySetInnerHTML={{ __html: message }} />
      )}
    </>
  );
}
