import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddVette = () => {
  const [validated, setValidated] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;

    if (form.checkValidity() === true) {
      setValidated(true);
      console.log(event);
      console.log(form);
    } else {
      setValidated(false);
    }
  };

  return (
    <div className='mb-5'>
      <h1>Add New Vette</h1>
      <p>Here you can add a new Vette to track.</p>
      <Form onSubmit={handleSubmit} validated={validated} noValidate>
        <Form.Group>
          <Form.Label>Year</Form.Label>
          <Form.Control as='select'>
            <option>2014</option>
            <option>2015</option>
            <option>2016</option>
            <option>2017</option>
            <option>2018</option>
            <option>2019</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Miles</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Miles'
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Cost</Form.Label>
          <Form.Control
            type='number'
            placeholder='Enter Cost'
            required
          ></Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Exterior Color</Form.Label>
          <Form.Control as='select'>
            <option>Artic White</option>
            <option>Torch Red</option>
            <option>Black</option>
            <option>Cyber Grey</option>
            <option>Laguna Blue</option>
            <option>Crystal Red</option>
            <option>Velocity Yellow</option>
            <option>Blade Silver</option>
            <option>Night Race Blue</option>
            <option>Lime Rock Green</option>
            <option>Daytona Sunrise Orange</option>
            <option>Shark Grey</option>
            <option>Admrial Blue</option>
            <option>Corvette Racing Yellow</option>
            <option>Long Beach Red</option>
            <option>Watkins Glen Grey</option>
            <option>Sterling Blue</option>
            <option>Black Rose</option>
            <option>Ceramic Matrix Grey</option>
            <option>Sebring Orange</option>
            <option>Shadow Grey</option>
            <option>Elkhart Lake Blue</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Interior Color</Form.Label>
          <Form.Control as='select'>
            <option>Red</option>
            <option>Black</option>
            <option>Grey</option>
            <option>Kalahari</option>
            <option>Tension Blue</option>
            <option>Twillight Blue</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Submodel</Form.Label>
          <Form.Control as='select'>
            <option>Base</option>
            <option>Z51</option>
            <option>Grand Sport</option>
            <option>Z06</option>
            <option>ZR1</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Trim</Form.Label>
          <Form.Control as='select'>
            <option>1LT</option>
            <option>2LT</option>
            <option>3LT</option>
          </Form.Control>
        </Form.Group>
        <Form.Group>
          <Form.Label>Packages</Form.Label>
          <Form.Check type='checkbox' id='npp' label='NPP' />
          <Form.Check type='checkbox' id='mrc' label='MRC' />
          <Form.Check type='checkbox' id='pdr' label='PDR' />
        </Form.Group>
        <Form.Group>
          <Form.Label>Listing Link</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter a link to the listing'
            required
          ></Form.Control>
        </Form.Group>
        <Button type='submit'>Add Vette</Button>
      </Form>
    </div>
  );
};

export default AddVette;
