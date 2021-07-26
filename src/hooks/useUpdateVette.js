import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";

const ACTION_TYPES = {
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const updateVetteReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        response: action.payload,
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

const useUpdateVette = () => {
  const [vetteUpdateValues, setVetteUpdateValues] = useState(null);
  const [vetteId, setVetteId] = useState(null);
  const [state, dispatch] = useReducer(updateVetteReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    success: false,
    response: {},
  });
  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    let requestCancelled = false;

    const callUpdateVette = async () => {
      dispatch({ type: ACTION_TYPES.INIT });

      try {
        const response = await axios({
          method: "put",
          url: `/.netlify/functions/vettes/${vetteId}`,
          data: vetteUpdateValues,
          headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
        });

        if (requestCancelled) return;

        dispatch({ type: ACTION_TYPES.SUCCESS, payload: response.data });
      } catch (error) {
        if (requestCancelled) return;

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          dispatch({
            type: ACTION_TYPES.ERROR,
            payload: error.response.data.message,
          });
        } else {
          dispatch({ type: ACTION_TYPES.ERROR, payload: error.message });
        }
      }
    };

    if (vetteUpdateValues && vetteId) {
      callUpdateVette();
    }

    return () => {
      requestCancelled = true;
    };
  }, [vetteUpdateValues, vetteId, userInfo]);

  const updateVette = (id, values) => {
    setVetteUpdateValues(values);
    setVetteId(id);
  };

  return [state, updateVette];
};

export default useUpdateVette;
