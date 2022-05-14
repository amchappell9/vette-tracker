import { useState, useEffect, useReducer, useContext } from "react";
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
  success: boolean;
  hasError: boolean;
  errorMessage: string;
  submissionResponse: VetteObject | null;
};

const addVetteReducer = (state: StateObject, action: ActionType) => {
  switch (action.type) {
    case "INIT":
      return { ...state, isLoading: true };

    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: true,
        submissionResponse: action.payload,
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

const useAddVette = () => {
  const [vetteInfo, setVetteInfo] = useState<VetteObject | null>(null);
  const [state, dispatch] = useReducer(addVetteReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    success: false,
    submissionResponse: null,
  });
  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    let requestCancelled = false;

    const callAddVette = async () => {
      dispatch({ type: "INIT" });

      try {
        const response = await axios({
          method: "post",
          url: "/.netlify/functions/vettes",
          data: vetteInfo,
          headers: { Authorization: `Bearer ${userInfo?.token.access_token}` },
        });

        if (requestCancelled) return;

        dispatch({ type: "SUCCESS", payload: response.data });
      } catch (error: unknown) {
        if (requestCancelled) return;

        dispatch({ type: "ERROR", payload: getErrorMessage(error) });
      }
    };

    if (vetteInfo) {
      callAddVette();
    }

    return () => {
      requestCancelled = true;
    };
  }, [vetteInfo, userInfo]);

  const addVette = (vette: VetteObject) => {
    setVetteInfo(vette);
  };

  return [state, addVette] as const;
};

export default useAddVette;
