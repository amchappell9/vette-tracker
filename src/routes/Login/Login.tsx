import { useState } from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import Alert from "../../components/Alert/Alert";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import FormFieldErrorMessage from "../../components/forms/FormFieldErrorMessage/FormFieldErrorMessage";
import { ErrorResponseModel } from "../../App";
import { User } from "gotrue-js";

const LoginFormValidationSchema = Yup.object({
  email: Yup.string().required("Please enter your email address"),
  password: Yup.string().required("Please enter your password"),
});

type LoginProps = {
  handleAuth: (
    email: string,
    password: string,
    handleSuccess: (response: User) => void,
    handleError: (response: ErrorResponseModel) => void
  ) => void;
};

interface HistoryModel {}

interface LocationModel {
  from: string;
  userSignedUp: boolean;
}

const Login = ({ handleAuth }: LoginProps) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  let history = useHistory<HistoryModel>();
  let location = useLocation<LocationModel>();

  let { from, userSignedUp } = location.state || {
    from: { pathname: "/vettes" },
    userSignedUp: false,
  };

  const handleSuccess = () => {
    history.replace(from);
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
    <div className="flex h-full items-center justify-center">
      <div className="max-w-lg space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl">
            Sign In to <span className="">Vette Tracker</span>
          </h1>
          <p className="mt-2 text-lg text-gray-800 sm:text-xl">
            Don't have an account?{" "}
            <Link to="/sign-up" className="text-red-500 hover:underline">
              Click here to sign up!
            </Link>
          </p>
        </div>
        {errorMessage && <Alert alertType={"danger"} message={errorMessage} />}
        {userSignedUp && (
          <Alert
            alertType={"success"}
            message={
              "You've successfully signed up! Sign in with your email address and password below."
            }
          />
        )}
        <div>
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email" className="mb-2 block text-lg font-bold">
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
              className="mb-2 mt-4 block text-lg font-bold"
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
            <Button type="submit" buttonSize="full" className="mt-4">
              Sign In
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
