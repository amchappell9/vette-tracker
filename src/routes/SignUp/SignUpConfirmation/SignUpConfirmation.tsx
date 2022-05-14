import { useEffect, useReducer } from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import { Link, useLocation } from "react-router-dom";
import GoTrue from "gotrue-js";

type StateTypes = "INIT" | "SUCCESS" | "ERROR";

type ActionObject = {
  type: StateTypes;
  errorMessage?: string | null;
};

type StateObject = {
  isLoading: boolean;
  errorMessage?: string | null;
  isSuccess: boolean;
};

const confirmationReducer = (state: StateObject, action: ActionObject) => {
  switch (action.type) {
    case "INIT":
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        isSuccess: false,
      };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        errorMessage: null,
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

type SignUpConfirmationProps = {
  auth: GoTrue;
};

const SignUpConfirmation = ({ auth }: SignUpConfirmationProps) => {
  const [state, dispatch] = useReducer(confirmationReducer, {
    isLoading: false,
    errorMessage: null,
    isSuccess: false,
  });
  const location = useLocation();

  useEffect(() => {
    const confirmUser = (token: string) => {
      dispatch({ type: "INIT" });

      auth
        .confirm(token)
        .then(() => dispatch({ type: "SUCCESS" }))
        .catch((error) => {
          const parsedError = JSON.parse(JSON.stringify(error));

          if (parsedError.json && parsedError.json.msg) {
            dispatch({ type: "ERROR", errorMessage: parsedError.json.msg });
          } else {
            dispatch({
              type: "ERROR",
              errorMessage: "An error has happened with your confirmation",
            });
          }
        });
    };

    if (location.hash && location.hash.indexOf("#confirmation_token") !== -1) {
      confirmUser(location.hash.substring(20));
    }
  }, [location, auth]);

  return (
    <div className="min-main-height flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {!state.errorMessage ? (
          <>
            <CheckCircleIcon className="mx-auto h-24 text-green-600" />
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
                className="mt-8 rounded bg-red-500 px-8 py-4 text-2xl font-bold text-white shadow-md hover:bg-red-600"
              >
                Get Started
              </Link>
            </div>
          </>
        ) : (
          <>
            <ExclamationIcon className="mx-auto h-24 text-yellow-500" />
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
