import { useState, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";

const ACTION_TYPES = {
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const getVetteReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT:
      return { ...state, isLoading: true };
    case ACTION_TYPES.SUCCESS:
      return {
        ...state,
        isLoading: false,
        success: true,
        vetteData: action.payload,
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

const useGetVette = (vetteIdParam) => {
  const [vetteId, setVetteId] = useState(vetteIdParam);
  const userInfo = useContext(UserInfoContext);
  const [state, dispatch] = useReducer(getVetteReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    success: false,
    vetteData: {},
  });

  useEffect(() => {
    let requestCancelled = false;
    const getVette = async () => {
      dispatch({ type: ACTION_TYPES.INIT });

      try {
        let response = await axios({
          url: `/.netlify/functions/vettes/${vetteId}`,
          method: "get",
          headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
        });

        if (requestCancelled) return;

        if (response.data.msg) {
          dispatch({
            type: ACTION_TYPES.ERROR,
            payload: response.data.msg,
          });
        } else {
          dispatch({
            type: ACTION_TYPES.SUCCESS,
            payload: response.data,
          });
        }
      } catch (error) {
        if (requestCancelled) return;

        dispatch({ type: ACTION_TYPES.ERROR, payload: error.message });
      }
    };

    getVette();

    return () => {
      requestCancelled = true;
    };
  }, [vetteId, userInfo]);

  return [state, setVetteId];
};

export default useGetVette;
