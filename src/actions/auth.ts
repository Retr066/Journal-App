import { Dispatch } from "redux";
import { actionProps } from "../interfaces/action.interface";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

import { typesActionAuth } from "../types/types";
import { googleAuthProvider } from "../firebase/firebaseConfig";
import { finishLoading, startLoading } from "./ui";
import { Toast } from "../utils/configSwal";
import { noteLogout } from "./notes";

type loginProps = (uid: string, displayName: string | null) => actionProps;

type startLoginEmailPasswordProps = (
  email: string,
  password: string
) => (dispatch: Dispatch) => void;

type startRegisterWithEmailPassName = (
  email: string,
  password: string,
  name: string
) => (dispatch: Dispatch) => void;

export const login: loginProps = (uid, displayName) => ({
  type: typesActionAuth.login,
  payload: {
    uid,
    displayName,
  },
});

export const startGoogleLogin = () => {
  return (dispatch: Dispatch) => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
      })
      .catch((e) => console.error(e));
  };
};

export const startLoginEmailPassword: startLoginEmailPasswordProps = (
  email,
  password
) => {
  return (dispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        dispatch(login(user.uid, user.displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(finishLoading());
        if (errorCode === "auth/user-not-found") {
          Toast.fire({
            icon: "error",
            title: "User not found",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: errorMessage,
          });
        }
      });
  };
};

export const startRegisterWithEmailPassName: startRegisterWithEmailPassName = (
  email,
  password,
  name
) => {
  return (dispatch) => {
    const auth = getAuth();
    dispatch(startLoading());
    createUserWithEmailAndPassword(auth, email, password)
      .then(async ({ user }) => {
        if (auth.currentUser !== null) {
          await updateProfile(auth.currentUser, {
            displayName: name,
          });

          dispatch(login(user.uid, user.displayName));
          dispatch(finishLoading());
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        dispatch(finishLoading());
        if (errorCode === "auth/email-already-in-use") {
          Toast.fire({
            icon: "error",
            title: "Email already in use",
          });
        } else {
          Toast.fire({
            icon: "error",
            title: errorMessage,
          });
        }
      });
  };
};

export const startLogout = () => {
  return async (dispatch: Dispatch) => {
    const auth = getAuth();
    await signOut(auth);
    dispatch(logout());
    dispatch(noteLogout());
  };
};
export const logout = () => ({
  type: typesActionAuth.logout,
});
