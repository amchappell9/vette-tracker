import React from "react";

const SignUpConfirmation = ({ confirmationToken, confirmUser }) => {
  return (
    <div>
      You signed up!{console.log(confirmationToken)}
      {console.log(confirmUser)}
    </div>
  );
};

export default SignUpConfirmation;
