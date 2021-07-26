import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Input from "../../components/Input";
import Button from "../../components/Button";
import FormFieldErrorMessage from "../../components/FormFieldErrorMessage";
import Alert, { ALERT_TYPES } from "../../components/Alert";

const signUpFormValidationSchema = Yup.object({
  firstName: Yup.string().required("This field is required"),
  lastName: Yup.string().required("This field is required"),
  emailAddress: Yup.string()
    .email("Please enter a valid email address")
    .required("This field is required"),
  password: Yup.string().required("This field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("This field is required"),
});

const SignUp = ({ handleSignUp }) => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSuccess = () => {
    setSignUpSuccess(true);
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
      firstName: "",
      lastName: "",
      emailAddress: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpFormValidationSchema,
    onSubmit: (values) => {
      setErrorMessage(null);
      handleSignUp(
        values.emailAddress,
        values.password,
        handleSuccess,
        handleError
      );
    },
  });

  if (signUpSuccess) {
    return (
      <Redirect
        to={{
          pathname: `/sign-in}`,
        }}
      />
    );
  } else {
    return (
      <div className="min-main-height mb-8 flex justify-center items-center">
        <div className="block max-w-4xl w-full">
          <h1 className="text-3xl font-bold text-gray-700">Sign Up</h1>
          {errorMessage && (
            <Alert
              alertType={ALERT_TYPES.DANGER}
              message={errorMessage}
              className="mt-4"
            />
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4 mb-8 px-8 bg-white rounded shadow-lg grid grid-cols-3 gap-8">
              <div className="pt-8">
                <h2 className="font-bold text-xl text-gray-600">Profile</h2>
                <p className="text-gray-500">
                  Enter information about yourself.
                </p>
              </div>
              <div className="col-span-2 py-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="">
                    <label className="block mb-2 font-gray-600">
                      First Name
                    </label>
                    <Input
                      name="firstName"
                      className="w-full bg-gray-50 py-1 px-4"
                      {...formik.getFieldProps("firstName")}
                    />
                    {formik.touched.firstName && formik.errors.firstName ? (
                      <FormFieldErrorMessage
                        errorMessage={formik.errors.firstName}
                        className="mt-1"
                      />
                    ) : null}
                  </div>
                  <div className="">
                    <label className="block mb-2 font-gray-600">
                      Last Name
                    </label>
                    <Input
                      name="lastName"
                      className="w-full bg-gray-50 py-1 px-4"
                      {...formik.getFieldProps("lastName")}
                    />
                    {formik.touched.lastName && formik.errors.lastName ? (
                      <FormFieldErrorMessage
                        errorMessage={formik.errors.lastName}
                        className="mt-1"
                      />
                    ) : null}
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block mb-2 font-gray-600">
                    Email Address
                  </label>
                  <Input
                    name="emailAddress"
                    className="w-full bg-gray-50 py-1 px-4"
                    {...formik.getFieldProps("emailAddress")}
                  />
                  {formik.touched.emailAddress && formik.errors.emailAddress ? (
                    <FormFieldErrorMessage
                      errorMessage={formik.errors.emailAddress}
                      className="mt-1"
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <label className="block mb-2 font-gray-600">Password</label>
                  <Input
                    type="password"
                    name="password"
                    className="w-full bg-gray-50 py-1 px-4"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormFieldErrorMessage
                      errorMessage={formik.errors.password}
                      className="mt-1"
                    />
                  ) : null}
                </div>
                <div className="mt-4">
                  <label className="block mb-2 font-gray-600">
                    Confirm Password
                  </label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    className="w-full bg-gray-50 py-1 px-4"
                    {...formik.getFieldProps("confirmPassword")}
                  />
                  {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword ? (
                    <FormFieldErrorMessage
                      errorMessage={formik.errors.confirmPassword}
                      className="mt-1"
                    />
                  ) : null}
                </div>
              </div>
            </div>
            <div className="text-right">
              <Link
                to="/"
                className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-2 text-lg mr-2"
              >
                Cancel
              </Link>
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }
};

export default SignUp;
