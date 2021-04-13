import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, Redirect } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/outline";
import AddVetteForm from "./AddVetteForm";
import UserInfoContext from "../../contexts/UserInfoContext";

const AddVette = () => {
  const [formValues, setFormValues] = useState(null);
  const userInfo = useContext(UserInfoContext);

  const onSubmit = async (values) => {
    const response = await axios({
      method: "post",
      url: "/.netlify/functions/vettes",
      data: values,
      headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
    });
    setFormValues(response.data);
  };

  let output;

  if (formValues === null) {
    output = <AddVetteForm onSubmit={onSubmit} />;
  } else if (!!formValues) {
    output = (
      <Redirect
        to={{
          pathname: "/vettes/283581563266925056",
          state: { isConfirmationView: true },
        }}
      />
    );
  } else {
    output = <>Something is wrong</>;
  }

  return (
    <>
      <div className="min-main-height flex justify-center">
        <div className="max-w-4xl w-full -mt-44 mb-8">
          <div className="text-gray-300 hover:underline mb-8">
            <Link to="/vettes">
              <ArrowLeftIcon className="inline align-text-bottom mr-1 w-5 h-5 " />
              Back to All Vettes
            </Link>
          </div>
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
