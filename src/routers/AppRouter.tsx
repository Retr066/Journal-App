import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { login } from "../actions/auth";
import { startLoadingNotes } from "../actions/notes";
import JournalScreen from "../screen/journal/JournalScreen";
import { LoaderSreen } from "../screen/journal/LoaderSreen";

import { AuthRouter } from "./AuthRouter";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";

export default function AppRouter() {
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        setIsLoggedIn(true);

        dispatch(startLoadingNotes(user.uid));
      } else {
        setIsLoggedIn(false);
      }
      setTimeout(() => {
        setChecking(false);
      }, 1000);
    });
  }, [dispatch]);

  if (checking) {
    return <LoaderSreen />;
  }

  return (
    <>
      <HashRouter>
        <Routes>
          <Route
            path="auth/*"
            element={
              <PublicRoute isAuth={isLoggedIn}>
                <AuthRouter />
              </PublicRoute>
            }
          />
          <Route
            path="/"
            element={
              <PrivateRoute isAuth={isLoggedIn}>
                <JournalScreen />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate replace to="auth" />} />
        </Routes>
      </HashRouter>
    </>
  );
}
