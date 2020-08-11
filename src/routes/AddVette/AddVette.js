import React, { useState, useEffect } from 'react';
// import { Form, Button } from 'react-bootstrap';
import AddVetteForm from './AddVetteForm';
import ConfirmationView from './ConfirmationView';

const AddVette = () => {
  const [formValues, setFormValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // const [formValues, setFormValues] = useState({
  //   cost: '40000',
  //   exteriorColor: 'Artic White',
  //   interiorColor: 'Red',
  //   link: 'www.google.com',
  //   miles: '12345',
  //   packages: [],
  //   submodel: 'Base',
  //   trim: '1LT',
  //   year: '2014',
  // });
  // const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!!formValues) {
      setIsSubmitting(true);

      setTimeout(() => {
        setIsSubmitting(false);
      }, 1000);
    }
  }, [formValues]);

  const onSubmit = (values) => {
    console.log('Form submitted', values);
    setFormValues(values);
  };

  const handleSubmitAnother = () => {
    setFormValues(null);
  };

  let output;

  if (isSubmitting) {
    output = <div>Loading...</div>;
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

  return <div className='mb-5'>{output}</div>;
};

export default AddVette;
