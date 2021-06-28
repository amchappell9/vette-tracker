import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";

const ACTION_TYPES = {
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RESET: "RESET",
};

const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  success: false,
  submissionResponse: {},
};

const deleteVetteReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        submissionResponse: action.payload,
      };
    case ACTION_TYPES.ERROR:
      return {
        ...state,
        isLoading: false,
        hasError: true,
        errorMessage: action.payload,
      };
    case ACTION_TYPES.RESET:
      return initialState;

    default:
      throw new Error("Undefined action type");
  }
};

const useDeleteVette = () => {
  const [vetteInfo, setVetteInfo] = useState(null);
  const [state, dispatch] = useReducer(deleteVetteReducer, initialState);
  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    let requestCancelled = false;

    const callDeleteVette = async () => {
      dispatch({ type: ACTION_TYPES.INIT });

      try {
        const response = await axios({
          method: "DELETE",
          url: "/.netlify/functions/vettes",
          data: vetteInfo,
          headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
        });

        if (requestCancelled) return;

        dispatch({ type: ACTION_TYPES.SUCCESS, payload: response.data });
      } catch (error) {
        if (requestCancelled) return;

        dispatch({ type: ACTION_TYPES.ERROR, payload: error.message });
      }
    };

    if (vetteInfo) {
      callDeleteVette();
    }

    return () => {
      requestCancelled = true;
    };
  }, [vetteInfo, userInfo]);

  const deleteVette = (vette) => {
    if (!vetteInfo) {
      setVetteInfo(vette);
    } else {
      // On retry reset the state, then set vette info to a "new" object so it triggers useEffect
      dispatch({ type: ACTION_TYPES.RESET });
      setVetteInfo({ ...vette });
    }
  };

  return [state, deleteVette];
};

export default useDeleteVette;
