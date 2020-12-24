import React from "react";
// import { Link } from "react-router-dom";

const ListOfVettes = ({ vettesArray, handleShowDeleteModal }) => {
  return (
    <h2>Table of Vettes</h2>
    // <Table striped bordered hover>
    //   <thead>
    //     <tr>
    //       <th>Year</th>
    //       <th>Submodel</th>
    //       <th>Miles</th>
    //       <th>Cost</th>
    //       <th>Trim</th>
    //       <th>Exterior Color</th>
    //       <th>Interior Color</th>
    //       <th>Packages</th>
    //       <th>Actions</th>
    //     </tr>
    //   </thead>
    //   <tbody>
    //     {vettesArray.map((value, index) => (
    //       <tr key={value.id}>
    //         <td>{value.year}</td>
    //         <td>{value.submodel}</td>
    //         <td>{value.miles}</td>
    //         <td>{value.cost}</td>
    //         <td>{value.trim}</td>
    //         <td>{value.exteriorColor}</td>
    //         <td>{value.interiorColor}</td>
    //         <td>{value.packages.toString()}</td>
    //         <td>
    //           <Button as={Link} to={`/vettes/${value.id}`} className="mr-2">
    //             Info
    //           </Button>
    //           <Button variant="secondary" className="mr-2">
    //             Edit
    //           </Button>
    //           <Button
    //             variant="outline-danger"
    //             onClick={() => {
    //               handleShowDeleteModal(value);
    //             }}
    //           >
    //             Delete
    //           </Button>
    //         </td>
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
  );
};

export default ListOfVettes;
