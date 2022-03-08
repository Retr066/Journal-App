import { Navigate, Route, Routes } from "react-router-dom";
import { LoginScreen } from "../screen/auth/LoginScreen";
import { RegisterScreen } from "../screen/auth/RegisterScreen";

export const AuthRouter = () => {
  return (
    <div className="auth__main">
      <div className="auth__box-container">
        <Routes>
          <Route path="login" element={<LoginScreen />} />
          <Route path="register" element={<RegisterScreen />} />
          <Route path="*" element={<Navigate replace to="login" />} />
        </Routes>
      </div>
    </div>
  );
};