import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";

const ACTION_TYPES = {
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const addVetteReducer = (state, action) => {
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

    default:
      throw new Error("Undefined action type");
  }
};

const useAddVette = () => {
  const [vetteInfo, setVetteInfo] = useState(null);
  const [state, dispatch] = useReducer(addVetteReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    success: false,
    submissionResponse: {},
  });
  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    let requestCancelled = false;

    const addVette = async () => {
      dispatch({ type: ACTION_TYPES.INIT });

      try {
        const response = await axios({
          method: "post",
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
      addVette();
    }

    return () => {
      requestCancelled = true;
    };
  }, [vetteInfo, userInfo]);

  return [state, setVetteInfo];
};

export default useAddVette;
