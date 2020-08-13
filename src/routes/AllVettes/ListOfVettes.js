import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ListOfVettes = ({ vettesArray, handleShowDeleteModal }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Year</th>
          <th>Submodel</th>
          <th>Miles</th>
          <th>Cost</th>
          <th>Trim</th>
          <th>Exterior Color</th>
          <th>Interior Color</th>
          <th>Packages</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {vettesArray.map((value, index) => (
          <tr key={value.id}>
            <td>{value.year}</td>
            <td>{value.submodel}</td>
            <td>{value.miles}</td>
            <td>{value.cost}</td>
            <td>{value.trim}</td>
            <td>{value.exteriorColor}</td>
            <td>{value.interiorColor}</td>
            <td>{value.packages.toString()}</td>
            <td>
              <Button variant='secondary' className='mr-2'>
                Edit
              </Button>
              <Button
                variant='danger'
                onClick={() => {
                  handleShowDeleteModal(value);
                }}
              >
                Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default ListOfVettes;
