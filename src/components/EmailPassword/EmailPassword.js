import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword, resetAllAuthForms } from "../../redux/User/user.actions";

import "./styles.scss";

import AuthWrapper from "../AuthWrapper/AuthWrapper";
import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";

//import { auth } from "../../firebase/utils";

/*const initialState = {
  email: "",
  errors: ""
};*/
const mapState = ({ user }) => ({
  resetPasswordSuccess: user.resetPasswordSuccess,
  resetPasswordError: user.resetPasswordError
});

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

  const { resetPasswordSuccess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSuccess) {
      dispatch(resetAllAuthForms());
      props.history.push("/login");
    }
  }, [resetPasswordSuccess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
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
