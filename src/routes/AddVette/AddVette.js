import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AddVetteForm from "./AddVetteForm";
import ConfirmationView from "./ConfirmationView";
import UserInfoContext from "../../contexts/UserInfoContext";

const AddVette = () => {
  const [formValues, setFormValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    if (!!formValues) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  }, [formValues]);

  const onSubmit = async (values) => {
    const response = await axios({
      method: "post",
      url: "/.netlify/functions/vettes",
      data: values,
      headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
    });
    setFormValues(response.data);
  };

  const handleSubmitAnother = () => {
    setFormValues(null);
  };

  let output;

  if (isSubmitting) {
    output = (
      <div className="text-center mt-5">
        {/* <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner> */}
      </div>
    );
  } else if (formValues === null) {
    output = <AddVetteForm onSubmit={onSubmit} />;
  } else if (!!formValues) {
    output = (
      <ConfirmationView
        formValues={formValues}
        handleSubmitAnother={handleSubmitAnother}
      />
    );
  } else {
    output = <>Something is wrong</>;
  }

  return (
    <>
      <div className="min-main-height flex justify-center">
        <div className="max-w-4xl w-full -mt-32 mb-8">
          <div className="flex justify-between items-center">
            <h1 className="text-white text-3xl font-bold">Add Vettes</h1>
          </div>
          <div className="rounded bg-white w-full shadow-lg mt-4">{output}</div>
        </div>
      </div>
    </>
  );
};

export default AddVette;
