import userTypes from "./user.types";
import { auth, handleUserProfile, GoogleProvider } from "../../firebase/utils";

export const setCurrentUser = (user) => ({
  type: userTypes.SET_CURRENT_USER,
  payload: user
});

export const resetAllAuthForms = () => ({
  type: userTypes.RESET_AUTH_FORMS
});

export const signInUser = ({ email, password }) => async (dispatch) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
    dispatch({
      type: userTypes.SIGN_IN_SUCCESS,
      payload: true
    });
  } catch (err) {}
};

export const signUpUser = ({
  displayName,
  email,
  password,
  confirmPassword
}) => async (dispatch) => {
  if (password !== confirmPassword) {
    const err = ["Password Don't Match"];
    dispatch({
      type: userTypes.SIGN_UP_ERROR,
      payload: err
    });
    //setErrors(err);
    return;
  }

  try {
    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    await handleUserProfile(user, { displayName });
    dispatch({
      type: userTypes.SIGN_UP_SUCCESS,
      payload: true
    });
  } catch (err) {}
};

export const resetPassword = ({ email }) => async (dispatch) => {
  const config = {
    url: "http://lvwy9.csb.app/login"
  };
  try {
    //const { email } = this.state;

    await auth
      .sendPasswordResetEmail(email, config)
      .then(() => {
        //console.log('Password Reset');

        dispatch({
          type: userTypes.RESET_PASSWORD_SUCCESS,
          payload: true
        });
      })
      .catch(() => {
        //console.log('Something Wrong');
        const err = ["Email not Found, Please try Again"];
        //this.setState({ errors: err });
        //setErrors(err);
        dispatch({
          type: userTypes.RESET_PASSWORD_ERROR,
          payload: err
        });
      });
  } catch (err) {}
};

export const signInWithGoogle = () => async (dispatch) => {
  try {
    await auth.signInWithPopup(GoogleProvider).then(() => {
      dispatch({
        type: userTypes.SIGN_IN_SUCCESS,
        payload: true
      });
    });
  } catch (err) {}
};
