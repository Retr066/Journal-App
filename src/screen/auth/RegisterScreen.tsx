import { FC } from "react";
import { Link } from "react-router-dom";
import { withFormik, FormikProps, FormikErrors, Form, Field } from "formik";
import validator from "validator";
import { startRegisterWithEmailPassName } from "../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../interfaces/rootState.type";

type userRegisterProps = {
  full_name: string;
  email: string;
  password: string;
  password_confirm: string;
};
interface MyFormProps {
  message: string; // if this passed all the way through you might do this or make a union type
}

export const RegisterScreen: FC = () => {
  const dispatch = useDispatch();
  const { loading } = useSelector((state: RootState) => state.ui);

  const InnerForm = (props: MyFormProps & FormikProps<userRegisterProps>) => {
    const { touched, errors, message } = props;
    return (
      <div className="animate__animated animate__fadeIn animate__faster">
        <h3 className="auth__title">{message}</h3>
        <hr />
        <Form>
          <Field
            type="text"
            placeholder="Full name"
            name="full_name"
            className="auth__input"
            autoComplete="new-off"
          />
          {touched.email && errors.full_name && (
            <div className="auth__alert-error">{errors.full_name}</div>
          )}
          <Field
            type="email"
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
          {touched.password && errors.password && (
            <div className="auth__alert-error">{errors.password}</div>
          )}
          <Field
            type="password"
            placeholder="Confirm password"
            name="password_confirm"
            className="auth__input"
            autoComplete="off"
          />
          {touched.password_confirm && errors.password_confirm && (
            <div className="auth__alert-error">{errors.password_confirm}</div>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            Register
          </button>

          <Link to="/auth/login" className="link mt-5">
            Alredy Register?
          </Link>
        </Form>
      </div>
    );
  };

  const MyForm = withFormik<MyFormProps, userRegisterProps>({
    // Transform outer props into form values
    mapPropsToValues: () => {
      return {
        full_name: "",
        email: "",
        password: "",
        password_confirm: "",
      };
    },

    // Add a custom validation function (this can be async too!)
    validate: (values: userRegisterProps) => {
      let errors: FormikErrors<userRegisterProps> = {};
      if (!values.full_name) {
        errors.full_name = "Required";
      } else if (!validator.isEmail(values.email)) {
        errors.email = "Invalid email address";
      } else if (values.password !== values.password_confirm) {
        errors.password_confirm = "Password  match each other";
      } else if (values.password.length < 5) {
        errors.password = "Password should be at least 6 characters";
      }
      return errors;
    },

    handleSubmit: ({ email, password, full_name }) => {
      dispatch(startRegisterWithEmailPassName(email, password, full_name));
    },
  })(InnerForm);

  return (
    <>
      <MyForm message="Register By Retr0 😎" />
    </>
  );
};
