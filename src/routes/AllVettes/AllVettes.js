import React, { useState, useEffect } from "react";
import axios from "axios";
// import { fakeVettes } from '../../data/fakeCorvettes';
import { Spinner } from "react-bootstrap";
import ListOfVettes from "./ListOfVettes";
import DeleteVetteModal from "./DeleteVetteModal";

const AllVettes = () => {
  const [allVettes, setAllVettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vetteToDelete, setVetteToDelete] = useState(null);

  useEffect(() => {
    async function getAllVettes() {
      let response = await axios.get("/.netlify/functions/vettes");
      setIsLoading(false);
      setAllVettes(response.data.vettes);
    }
    setIsLoading(true);

    if (vetteToDelete === null) {
      console.log("Getting vettes");
      getAllVettes();
      // setTimeout(() => {
      //   setIsLoading(false);
      //   setAllVettes(fakeVettes);
      // }, 1000);
    } else {
      setIsLoading(false);
    }
  }, [vetteToDelete]);

  // const handleEditModal = () => {};

  const handleShowDeleteModal = (vette) => {
    console.log(vette);
    setShowDeleteModal(true);
    setVetteToDelete(vette);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setVetteToDelete(null);
  };

  const deleteVette = () => {
    console.log(`Deleteing vete with id: ${vetteToDelete.id}`);

    // Call delete endpoint

    setVetteToDelete(null);
  };

  let output;

  if (isLoading) {
    output = (
      <div className="text-center mt-5">
        <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  } else {
    output = (
      <>
        <ListOfVettes
          vettesArray={allVettes}
          handleShowDeleteModal={handleShowDeleteModal}
        />
        <DeleteVetteModal
          show={showDeleteModal}
          handleClose={handleHideDeleteModal}
          vette={vetteToDelete}
          deleteVette={deleteVette}
        />
      </>
    );
  }

  return (
    <div>
      <h1>All Vettes</h1>
      <p>View all the Vettes you've entered here.</p>
      <pre>
        <code>
          {JSON.stringify(
            {
              allVettes: allVettes,
              isLoading: isLoading,
              showDeleteModal: showDeleteModal,
              vetteToDelete: vetteToDelete,
            },
            null,
            2
          )}
        </code>
      </pre>
      {output}
    </div>
  );
};

export default AllVettes;
