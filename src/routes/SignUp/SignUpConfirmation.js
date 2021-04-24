import React, { useEffect } from "react";
import { CheckCircleIcon, ExclamationIcon } from "@heroicons/react/outline";
import { Link } from "react-router-dom";

const SignUpConfirmation = ({
  confirmationToken,
  confirmUser,
  userConfirmationErrorMessage,
}) => {
  useEffect(() => {
    if (confirmationToken) {
      confirmUser(confirmationToken);
    }
  }, [confirmationToken, confirmUser]);

  return (
    <div className="min-main-height flex justify-center items-center">
      <div className="max-w-2xl w-full">
        {!userConfirmationErrorMessage ? (
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
            <p className="mt-2 text-center text-xl">
              {userConfirmationErrorMessage}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpConfirmation;
