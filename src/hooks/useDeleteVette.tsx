import { useContext, useEffect, useReducer, useState } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";
import { VetteObject } from "../types/types";
import { getErrorMessage } from "../utils/utils";

type ActionType =
  | {
      type: "INIT";
    }
  | {
      type: "SUCCESS";
      payload: {
        msg: string;
      };
    }
  | {
      type: "ERROR";
      payload: string;
    }
  | {
      type: "RESET";
    };

const initialState = {
  isLoading: false,
  hasError: false,
  errorMessage: "",
  success: false,
  submissionResponse: {},
};

const deleteVetteReducer = (state: typeof initialState, action: ActionType) => {
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

    case "RESET":
      return initialState;

    default:
      throw new Error("Undefined action type");
  }
};

const useDeleteVette = () => {
  const [vetteInfo, setVetteInfo] = useState<VetteObject | null>(null);
  const [state, dispatch] = useReducer(deleteVetteReducer, initialState);
  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    let requestCancelled = false;

    const callDeleteVette = async () => {
      dispatch({ type: "INIT" });

      try {
        const response = await axios({
          method: "DELETE",
          url: "/.netlify/functions/vettes",
          data: vetteInfo,
          headers: { Authorization: `Bearer ${userInfo?.token.access_token}` },
        });

        if (requestCancelled) return;

        dispatch({ type: "SUCCESS", payload: response.data });
      } catch (error) {
        if (requestCancelled) return;

        dispatch({ type: "ERROR", payload: getErrorMessage(error) });
      }
    };

    if (vetteInfo) {
      callDeleteVette();
    }

    return () => {
      requestCancelled = true;
    };
  }, [vetteInfo, userInfo]);

  const deleteVette = (vette: VetteObject) => {
    if (!vetteInfo) {
      setVetteInfo(vette);
    } else {
      // On retry reset the state, then set vette info to a "new" object so it triggers useEffect
      dispatch({ type: "RESET" });
      setVetteInfo({ ...vette });
    }
  };

  return [state, deleteVette] as const;
};

export default useDeleteVette;
