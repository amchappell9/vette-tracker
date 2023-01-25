import { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { User } from "gotrue-js";
import Input from "../../../components/Input";
import Button from "../../../components/Button";
import FormFieldErrorMessage from "../../../components/forms/FormFieldErrorMessage";
import Alert from "../../../components/Alert";
import { ErrorResponseModel } from "../../../App";

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

type SignUpProps = {
  handleSignUp: (
    email: string,
    password: string,
    handleSuccess: (response: User) => void,
    handleError: (error: ErrorResponseModel) => void
  ) => void;
};

const SignUp = ({ handleSignUp }: SignUpProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [signUpSuccess, setSignUpSuccess] = useState(false);

  const handleSuccess = () => {
    setSignUpSuccess(true);
  };

  const handleError = (error: ErrorResponseModel) => {
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
          pathname: `/sign-in`,
          state: { userSignedUp: true },
        }}
      />
    );
  } else {
    return (
      <div className="mb-8 flex items-center justify-center">
        <div className="block w-full max-w-4xl">
          <h1 className="text-3xl font-bold text-gray-700">Sign Up</h1>
          {errorMessage && (
            <Alert
              alertType={"danger"}
              message={errorMessage}
              className="mt-4"
            />
          )}
          <form onSubmit={formik.handleSubmit}>
            <div className="mt-4 mb-8 grid grid-cols-1 rounded bg-white px-8 drop-shadow-md md:grid-cols-3 md:gap-x-8">
              <div className="border-b border-gray-200 pt-8 pb-4 md:border-none">
                <h2 className="text-xl font-bold text-gray-600">Profile</h2>
                <p className="text-gray-500">
                  Enter information about yourself.
                </p>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4 py-8">
                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="firstName"
                    className="font-gray-600 mb-2 block"
                  >
                    First Name
                  </label>
                  <Input
                    {...formik.getFieldProps("firstName")}
                    id="firstName"
                    name="firstName"
                    className="w-full bg-gray-50 py-1 px-4"
                  />
                  {formik.touched.firstName && formik.errors.firstName ? (
                    <FormFieldErrorMessage
                      errorMessage={formik.errors.firstName}
                      className="mt-1"
                    />
                  ) : null}
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label
                    htmlFor="lastName"
                    className="font-gray-600 mb-2 block"
                  >
                    Last Name
                  </label>
                  <Input
                    {...formik.getFieldProps("lastName")}
                    id="lastName"
                    name="lastName"
                    className="w-full bg-gray-50 py-1 px-4"
                  />
                  {formik.touched.lastName && formik.errors.lastName ? (
                    <FormFieldErrorMessage
                      errorMessage={formik.errors.lastName}
                      className="mt-1"
                    />
                  ) : null}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="emailAddress"
                    className="font-gray-600 mb-2 block"
                  >
                    Email Address
                  </label>
                  <Input
                    {...formik.getFieldProps("emailAddress")}
                    id="emailAddress"
                    name="emailAddress"
                    className="w-full bg-gray-50 py-1 px-4"
                  />
                  {formik.touched.emailAddress && formik.errors.emailAddress ? (
                    <FormFieldErrorMessage
                      errorMessage={formik.errors.emailAddress}
                      className="mt-1"
                    />
                  ) : null}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="password"
                    className="font-gray-600 mb-2 block"
                  >
                    Password
                  </label>
                  <Input
                    {...formik.getFieldProps("password")}
                    type="password"
                    id="password"
                    name="password"
                    className="w-full bg-gray-50 py-1 px-4"
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormFieldErrorMessage
                      errorMessage={formik.errors.password}
                      className="mt-1"
                    />
                  ) : null}
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="confirmPassword"
                    className="font-gray-600 mb-2 block"
                  >
                    Confirm Password
                  </label>
                  <Input
                    {...formik.getFieldProps("confirmPassword")}
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="w-full bg-gray-50 py-1 px-4"
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
            <div className="flex flex-col-reverse gap-2 md:flex-row md:justify-end">
              <Link
                to="/"
                className="flex items-center justify-center rounded border border-gray-300 bg-white px-6 py-2 text-lg text-gray-800 hover:bg-gray-100"
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
