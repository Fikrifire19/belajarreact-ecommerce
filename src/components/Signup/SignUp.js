import React, {useState} from "react";
import {withRouter} from 'react-router-dom';

import { auth, handleUserProfile } from "../../firebase/utils";

import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";
import AuthWrapper from "../AuthWrapper/AuthWrapper";

import "./styles.scss";

/*const initialState = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
  errors: []
};*/

const SignUp = props => {
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
  const [displayName, setDisplayName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const resetForm = () => {
    setDisplayName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setErrors([]);
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    /*const {
      displayName,
      email,
      password,
      confirmPassword,
      errors
    } = this.state;*/

    setPassword();
    setConfirmPassword();
    
    if (password !== confirmPassword) {
      const err = ["Password Don't Match"];
      /*this.setState({
        errors: err
      });*/
      setErrors(err);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      await handleUserProfile(user, { displayName });

      /*this.setState({
        ...initialState
      });*/
      resetForm();
      props.history.push('/');
    } catch (err) {}
  };

  
    const configAuthWrapper = {
      headline: "Registration"
    };

    /*const {
      displayName,
      email,
      password,
      confirmPassword,
      errors
    } = this.state;*/

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          {errors.length > 0 && (
            <ul>
              {errors.map((err, index) => {
                return <li key={index}>{err}</li>;
              })}
            </ul>
          )}
          <form onSubmit={handleFormSubmit}>
            <FormInput
              type="text"
              name="displayName"
              value={displayName}
              placeholder="Full Name"
              handleChange={e => setDisplayName(e.target.value)}
            />

            <FormInput
              type="email"
              name="email"
              value={email}
              placeholder="Email"
              handleChange={e => setEmail(e.target.value)}
            />

            <FormInput
              type="password"
              name="password"
              value={password}
              placeholder="Password"
              handleChange={e => setPassword(e.target.value)}
            />

            <FormInput
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              placeholder="Confirm Password"
              handleChange={e => setConfirmPassword(e.target.value)}
            />
            <Button type="submit">Register</Button>
          </form>
        </div>
      </AuthWrapper>
    );
}

export default withRouter(SignUp);
