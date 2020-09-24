import React, {useState, useEffect} from "react";
import {Link, withRouter} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {signInUser, signInWithGoogle, resetAllAuthForms} from '../../redux/User/user.actions';

import AuthWrapper from "../AuthWrapper/AuthWrapper";
import FormInput from "../Forms/FormInput/FormInput";
import Button from "../Forms/Button/Button";

//import { signInWithGoogle } from "../../firebase/utils";

import "./styles.scss";

/*const initialState = {
  email: "",
  password: ""
};*/

const mapState = ({user}) => ({
  signInSuccess: user.signInSuccess
});

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

  const {signInSuccess} = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState();

  useEffect(() => {
    if(signInSuccess) {
      resetForm();
      dispatch(resetAllAuthForms());
      props.history.push('/');
    }
  }, [signInSuccess]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = /*async*/ e => {
    e.preventDefault();
    dispatch(signInUser({email, password}));
    //const { email, password } = this.state;

    /**/
  };

  const hadleGoogleSignIn = () => {
    dispatch(signInWithGoogle);
  }

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
                <Button onClick={hadleGoogleSignIn}>Sign in with Google</Button>
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

export default withRouter(SignIn);
