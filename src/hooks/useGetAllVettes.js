import { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";

const ACTION_TYPES = {
  INIT: "INIT",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
};

const getVettesReducer = (state, action) => {
  switch (action.type) {
    case ACTION_TYPES.INIT:
      return { ...state, isLoading: true };

    case ACTION_TYPES.SUCCESS:
      return { ...state, isLoading: false, vettes: action.payload };

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

const useGetAllVettes = () => {
  const userInfo = useContext(UserInfoContext);
  const [state, dispatch] = useReducer(getVettesReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    vettes: [],
  });

  useEffect(() => {
    let requestCancelled = false;

    const getAllVettes = async () => {
      dispatch({ type: ACTION_TYPES.INIT });

      try {
        let response = await axios({
          url: "/.netlify/functions/vettes",
          method: "get",
          headers: { Authorization: `Bearer ${userInfo.token.access_token}` },
        });

        if (requestCancelled) return;

        dispatch({ type: ACTION_TYPES.SUCCESS, payload: response.data.vettes });
      } catch (error) {
        if (requestCancelled) return;
        dispatch({ type: ACTION_TYPES.ERROR, payload: error.message });
      }
    };

    getAllVettes();

    return () => {
      requestCancelled = true;
    };
  }, [userInfo]);

  return state;
};

export default useGetAllVettes;
