import React from 'react';
// import { Form, Button } from 'react-bootstrap';
import AddVetteForm from './AddVetteForm';

const AddVette = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div className='mb-5'>
      <h1>Add New Vette</h1>
      <p>Here you can add a new Vette to track.</p>
      <AddVetteForm onSubmit={onSubmit} />
    </div>
  );
};

export default AddVette;
