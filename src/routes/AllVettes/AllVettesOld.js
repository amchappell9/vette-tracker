import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
// import { fakeVettes } from '../../data/fakeCorvettes';
import ListOfVettes from "./ListOfVettes";
import DeleteVetteModal from "./DeleteVetteModal";
import UserInfoContext from "../../contexts/UserInfoContext";

const AllVettes = () => {
  const [allVettes, setAllVettes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vetteToDelete, setVetteToDelete] = useState(null);

  const userInfo = useContext(UserInfoContext);

  console.log("Context in all vettes", userInfo);

  useEffect(() => {
    async function getAllVettes() {
      try {
        let response = await axios({
          url: "/.netlify/functions/vettes",
          method: "get",
          headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
        });
        setIsLoading(false);
        setAllVettes(response.data.vettes);
      } catch (error) {
        console.error(error);
      }
    }

    setIsLoading(true);

    if (vetteToDelete === null) {
      getAllVettes();
    } else {
      setIsLoading(false);
    }
  }, [vetteToDelete, userInfo.token.access_token]);

  const handleShowDeleteModal = (vette) => {
    console.log(vette);
    setShowDeleteModal(true);
    setVetteToDelete(vette);
  };

  const handleHideDeleteModal = () => {
    setShowDeleteModal(false);
    setVetteToDelete(null);
  };

  const deleteVette = async () => {
    console.log(`Deleteing vete with id: ${vetteToDelete.id}`);

    // Call delete endpoint
    try {
      await axios({
        method: "delete",
        url: "/.netlify/functions/vettes",
        data: {
          id: vetteToDelete.id,
        },
        headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
      });
    } catch (error) {
      console.error(error);
    }

    setVetteToDelete(null);
  };

  let output;

  if (isLoading) {
    output = (
      <div className="text-center mt-5">
        {/* <Spinner animation="border" role="status" variant="primary">
          <span className="sr-only">Loading...</span>
        </Spinner> */}
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
      {false && process.env.NODE_ENV === "development" && (
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
      )}
      {output}
    </div>
  );
};

export default AllVettes;
