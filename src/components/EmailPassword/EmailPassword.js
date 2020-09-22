import React, { useState } from "react";
import { withRouter } from "react-router-dom";

import "./styles.scss";

import AuthWrapper from "../AuthWrapper/AuthWrapper";
import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";

import { auth } from "../../firebase/utils";

/*const initialState = {
  email: "",
  errors: ""
};*/

const EmailPassword = (props) => {
  /*constructor(props) {
    super(props);
    this.state = {
      ...initialState
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }*/
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      //const { email } = this.state;

      const config = {
        url: "http://lvwy9.csb.app/login"
      };

      await auth
        .sendPasswordResetEmail(email, config)
        .then(() => {
          //console.log('Password Reset');
          props.history.push("/login");
        })
        .catch(() => {
          //console.log('Something Wrong');
          const err = ["Email not Found, Please try Again"];
          //this.setState({ errors: err });
          setErrors(err);
        });
    } catch (err) {}
  };

  //const { email, errors } = this.state;

  const cinfigAuthWrapper = {
    headline: "Email Password"
  };
  return (
    <AuthWrapper {...cinfigAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Email Password</Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
