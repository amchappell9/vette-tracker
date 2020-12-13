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
    output = (
      <>
        <h1>Add New Vette</h1>
        <p>Here you can enter a new Vette listing.</p>
        <hr />
        {/* <Row className="mt-4">
          <Col md={{ span: 8, offset: 2 }}>
            <AddVetteForm onSubmit={onSubmit} />
          </Col>
        </Row> */}
      </>
    );
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

  return <div className="mb-5">{output}</div>;
};

export default AddVette;
