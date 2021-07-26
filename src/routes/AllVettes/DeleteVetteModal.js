import React from "react";

const DeleteVetteModal = ({ show, handleClose, vette, deleteVette }) => {
  // const deleteVette = () => {
  //   console.log(`Deleteing vete with id: ${vette.id}`);
  //   handleClose();
  // };

  if (!!vette) {
    return (
      <h2>Delete Vette Modal</h2>
      // <Modal show={show} onHide={handleClose}>
      //   {" "}
      //   <Modal.Header closeButton>
      //     <Modal.Title>Delete Vette</Modal.Title>
      //   </Modal.Header>
      //   <Modal.Body>
      //     Are you sure you want to delete {`the ${vette.year} Vette`}?
      //   </Modal.Body>
      //   <Modal.Footer>
      //     <Button variant="secondary" onClick={handleClose}>
      //       Close
      //     </Button>
      //     <Button variant="primary" onClick={deleteVette}>
      //       Delete Vette
      //     </Button>
      //   </Modal.Footer>
      // </Modal>
    );
  } else {
    return <></>;
  }
};

export default DeleteVetteModal;
