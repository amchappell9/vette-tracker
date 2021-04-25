import React, { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert, { ALERT_TYPES } from "../components/Alert";
import Button from "../components/Button";
import Input from "../components/Input";
import FormFieldErrorMessage from "../components/FormFieldErrorMessage";

const LoginFormValidationSchema = Yup.object({
  email: Yup.string().required("Please enter your email address"),
  password: Yup.string().required("Please enter your password"),
});

const Login = ({ handleAuth }) => {
  const [errorMessage, setErrorMessage] = useState(null);

  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/vettes" } };

  const handleSuccess = (response) => {
    history.replace(from);
  };

  const handleError = (error) => {
    if (error.json && error.json.error_description) {
      setErrorMessage(error.json.error_description);
    } else if (error.json && error.json.msg) {
      setErrorMessage(error.json.msg);
    } else {
      setErrorMessage("An error has happened.");
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginFormValidationSchema,
    onSubmit: (values) => {
      setErrorMessage(null);
      handleAuth(values.email, values.password, handleSuccess, handleError);
    },
  });

  return (
    <>
      <div className="min-main-height flex justify-center items-center w-full h-full">
        <div className="max-w-lg w-full space-y-8 -mt-48">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Sign In to <span className="">Vette Tracker</span>
            </h1>
            <p className="mt-2 text-xl text-gray-800">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-red-500">
                Click here to sign up!
              </Link>
            </p>
          </div>
          {errorMessage && (
            <Alert alertType={ALERT_TYPES.DANGER} message={errorMessage} />
          )}
          <div>
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="email" className="block mb-2 font-bold text-lg">
                Email Address:
              </label>
              <Input
                id="email"
                type="text"
                autoComplete="email"
                className="w-full py-1 px-4"
                {...formik.getFieldProps("email")}
              />
              {formik.touched.email && formik.errors.email ? (
                <FormFieldErrorMessage
                  errorMessage={formik.errors.email}
                  className="mt-1"
                />
              ) : null}
              <label
                htmlFor="password"
                className="block mb-2 mt-4 font-bold text-lg"
              >
                Password:
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full py-1 px-4"
                {...formik.getFieldProps("password")}
              />
              {formik.touched.password && formik.errors.password ? (
                <FormFieldErrorMessage
                  errorMessage={formik.errors.password}
                  className="mt-1"
                />
              ) : null}
              <Button type="submit" size="full" className="mt-4">
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
