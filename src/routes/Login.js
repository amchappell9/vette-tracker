import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Button from "../components/Button";
import Input from "../components/Input";
import FormFieldErrorMessage from "../components/FormFieldErrorMessage";

const LoginFormValidationSchema = Yup.object({
  username: Yup.string().required("Please enter your username"),
  password: Yup.string().required("Please enter your password"),
});

const Login = ({ handleAuth }) => {
  // let history = useHistory();
  // let location = useLocation();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: LoginFormValidationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  // let { from } = location.state || { from: { pathname: "/" } };

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
          <div>
            <form onSubmit={formik.handleSubmit}>
              <label
                htmlFor="username"
                className="block mb-2 font-bold text-lg"
              >
                Username:
              </label>
              <Input
                id="username"
                type="text"
                autoComplete="username"
                className="w-full py-1 px-4"
                {...formik.getFieldProps("username")}
              />
              {formik.touched.username && formik.errors.username ? (
                <FormFieldErrorMessage
                  errorMessage={formik.errors.username}
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
