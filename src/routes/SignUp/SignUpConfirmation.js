import React, { useEffect } from "react";

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
    <div>
      {userConfirmationErrorMessage
        ? userConfirmationErrorMessage
        : "You signed up!"}
    </div>
  );
};

export default SignUpConfirmation;
