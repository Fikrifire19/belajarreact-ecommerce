import React, {useState} from "react";
import {Link} from 'react-router-dom';

import AuthWrapper from "../AuthWrapper/AuthWrapper";
import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";

import { auth, signInWithGoogle } from "../../firebase/utils";

import "./styles.scss";

/*const initialState = {
  email: "",
  password: ""
};*/

const SignIn = props => {
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


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      /*this.setState({
        ...initialState
      });*/
      setEmail('');
      setPassword('');
    } catch (err) {}
  };

    const configAuthWrapper = {
      headline: "Login"
    };

    //const { email, password } = this.state;

    return (
      <AuthWrapper {...configAuthWrapper}>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <FormInput
              type="email"
              name="email"
              value={email}
              placholder="Email"
              handleChange={e => setEmail(e.target.value)}
            />
            <FormInput
              type="password"
              name="password"
              value={password}
              placholder="Password"
              handleChange={e => setPassword(e.target.value)}
            />
            <Button type="submit">Login</Button>
            <div className="socialSignin">
              <div className="row">
                <Button onClick={signInWithGoogle}>Sign in with Google</Button>
              </div>
            </div>
            <div className="links">
              <Link to="/recovery">Reset Password</Link>
              </div>
          </form>
        </div>
      </AuthWrapper>
    );
}

export default SignIn;
