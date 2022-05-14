import { useState, useContext, useReducer, useEffect } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";
import { VetteObject } from "../types/types";
import { getErrorMessage } from "../utils/utils";

type ActionType =
  | { type: "INIT" }
  | { type: "SUCCESS"; payload: VetteObject }
  | { type: "ERROR"; payload: string };

type StateObject = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  success: boolean;
  vetteData: VetteObject | null;
};

const getVetteReducer = (state: StateObject, action: ActionType) => {
  switch (action.type) {
    case "INIT":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: true,
        vetteData: action.payload,
      };
    case "ERROR":
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

const useGetVette = (vetteIdParam: string | undefined) => {
  const [vetteId, setVetteId] = useState(vetteIdParam);
  const userInfo = useContext(UserInfoContext);
  const [state, dispatch] = useReducer(getVetteReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    success: false,
    vetteData: null,
  });

  useEffect(() => {
    let requestCancelled = false;
    const getVette = async () => {
      dispatch({ type: "INIT" });

      try {
        let response = await axios({
          url: `/.netlify/functions/vettes/${vetteId}`,
          method: "get",
          headers: { Authorization: `Bearer ${userInfo?.token.access_token}` },
        });

        if (requestCancelled) return;

        if (response.data.msg) {
          dispatch({
            type: "ERROR",
            payload: response.data.msg,
          });
        } else {
          dispatch({
            type: "SUCCESS",
            payload: response.data,
          });
        }
      } catch (error) {
        if (requestCancelled) return;

        dispatch({ type: "ERROR", payload: getErrorMessage(error) });
      }
    };

    getVette();

    return () => {
      requestCancelled = true;
    };
  }, [vetteId, userInfo]);

  return [state, setVetteId] as const;
};

export default useGetVette;
