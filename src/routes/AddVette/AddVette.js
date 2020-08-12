import React, { useState, useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import AddVetteForm from './AddVetteForm';
import ConfirmationView from './ConfirmationView';

const AddVette = () => {
  const [formValues, setFormValues] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock data
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
  // const [isSubmitting, setIsSubmitting] = useState(true);

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
    output = (
      <div className='text-center mt-5'>
        <Spinner animation='border' role='status' variant='primary'>
          <span className='sr-only'>Loading...</span>
        </Spinner>
      </div>
    );
  } else if (formValues === null) {
    output = (
      <>
        <h1>Add New Vette</h1>
        <p>Here you can enter a new Vette listing.</p>
        <AddVetteForm onSubmit={onSubmit} />
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

  return <div className='mb-5'>{output}</div>;
};

export default AddVette;
