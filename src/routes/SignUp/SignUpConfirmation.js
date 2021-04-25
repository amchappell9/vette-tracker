import React, { useEffect, useReducer } from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";

const confirmationReducer = (state, action) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isLoading: true,
        errorMessage: false,
        isSuccess: false,
      };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMessage: false,
        isSuccess: true,
      };
    case "ERROR":
      return {
        ...state,
        isLoading: false,
        errorMessage: action.errorMessage,
        isSuccess: false,
      };

    default:
      throw new Error("Unsupported action type");
  }
};

const SignUpConfirmation = ({ auth }) => {
  const [state, dispatch] = useReducer(confirmationReducer, {
    isLoading: false,
    errorMessage: false,
    isSuccess: false,
  });
  const location = useLocation();

  useEffect(() => {
    const confirmUser = (token) => {
      dispatch({ type: "INIT" });

      auth
        .confirm(token)
        .then((response) => dispatch({ type: "SUCCESS" }))
        .catch((error) => {
          const parsedError = JSON.parse(JSON.stringify(error));

          if (parsedError.json && parsedError.json.msg) {
            dispatch({ type: "ERROR", errorMessage: parsedError.json.msg });
          } else {
            dispatch({ type: "ERROR", errorMessage: "" });
          }
        });
    };

    if (location.hash && location.hash.indexOf("#confirmation_token") !== -1) {
      confirmUser(location.hash.substring(20));
    }
  }, [location, auth]);

  return (
    <div className="min-main-height flex justify-center items-center">
      <div className="max-w-2xl w-full">
        {!state.errorMessage ? (
          <>
            <CheckCircleIcon className="text-green-600 h-24 mx-auto" />
            <h1 className="mt-4 text-center text-3xl font-bold text-gray-900">
              Email Confirmed!
            </h1>
            <p className="mt-2 text-center text-xl">
              Your email has been confirmed and you’re ready to start tracking
              vettes!
            </p>
            <div className="mt-8 text-center">
              <Link
                to="/vettes"
                className="px-8 py-4 mt-8 font-bold text-2xl shadow-md bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Get Started
              </Link>
            </div>
          </>
        ) : (
          <>
            <ExclamationIcon className="text-yellow-500 h-24 mx-auto" />
            <h1 className="mt-4 text-center text-3xl font-bold text-gray-700">
              There's been an issue.
            </h1>
            <p className="mt-2 text-center text-xl">{state.errorMessage}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpConfirmation;
