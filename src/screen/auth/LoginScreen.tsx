import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import validator from "validator";
import { startGoogleLogin, startLoginEmailPassword } from "../../actions/auth";
import { Formik, Form, Field, FormikErrors } from "formik";
import { RootState } from "../../interfaces/rootState.type";

type loginUserProps = {
  email: string;
  password: string;
};
export const LoginScreen: FC<{}> = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.ui);

  const initialValues: loginUserProps = {
    email: "",
    password: "",
  };
  /* const { email, password } = formValues;
   */
  const validate = (values: loginUserProps) => {
    let errors: FormikErrors<loginUserProps> = {};
    if (!validator.isEmail(values.email)) {
      errors.email = "Invalid email address";
    } else if (values.password.length < 5) {
      errors.password = "Password should be at least 6 characters";
    }
    return errors;
  };

  const handleLogin = ({ email, password }: loginUserProps) => {
    dispatch(startLoginEmailPassword(email, password));
  };
  const handleGoogleLogin = () => {
    dispatch(startGoogleLogin());
  };
  return (
    <div className="animate__animated animate__fadeIn animate__faster">
      <h3 className="auth__title">Login By Retr0 😎</h3>
      <hr />
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleLogin}
      >
        {({ errors, touched }) => (
          <Form>
            <Field
              type="text"
              placeholder="Email"
              name="email"
              className="auth__input"
              autoComplete="new-off"
            />
            {touched.email && errors.email && (
              <div className="auth__alert-error">{errors.email}</div>
            )}
            <Field
              type="password"
              placeholder="Password"
              name="password"
              className="auth__input"
              autoComplete="off"
            />
            {touched.email && errors.password && (
              <div className="auth__alert-error">{errors.password}</div>
            )}
            <button
              type="submit"
              className="btn btn-primary btn-block"
              disabled={loading}
            >
              Login
            </button>

            <div className="auth__social-networks">
              <p>Login with social networks</p>
              <div className="google-btn" onClick={handleGoogleLogin}>
                <div className="google-icon-wrapper">
                  <img
                    className="google-icon"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                    alt="google button"
                  />
                </div>
                <p className="btn-text">
                  <b>Sign in with google</b>
                </p>
              </div>
            </div>

            <Link to="/auth/register" className="link">
              Create new account
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
