import { useState, useEffect, useReducer, useContext } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";
import { VetteObject } from "../types/types";
import { getErrorMessage } from "../utils/utils";

// interface ErrorResponse extends Error {
//   response?: {
//     data?: {
//       message: string;
//     };
//   };
// }

type ActionType =
  | { type: "INIT" }
  | { type: "SUCCESS"; payload: VetteObject }
  | { type: "ERROR"; payload: string };

type StateObject = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  success: boolean;
  response: VetteObject | null;
};

const updateVetteReducer = (state: StateObject, action: ActionType) => {
  switch (action.type) {
    case "INIT":
      return { ...state, isLoading: true };
    case "SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: true,
        response: action.payload,
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

const useUpdateVette = () => {
  const [vetteUpdateValues, setVetteUpdateValues] =
    useState<VetteObject | null>(null);
  const [vetteId, setVetteId] = useState<string | null>(null);
  const [state, dispatch] = useReducer(updateVetteReducer, {
    isLoading: false,
    hasError: false,
    errorMessage: "",
    success: false,
    response: null,
  });
  const userInfo = useContext(UserInfoContext);

  useEffect(() => {
    let requestCancelled = false;

    const callUpdateVette = async () => {
      dispatch({ type: "INIT" });

      try {
        const response = await axios({
          method: "put",
          url: `/.netlify/functions/vettes/${vetteId}`,
          data: vetteUpdateValues,
          headers: { Authorization: `Bearer ${userInfo?.token.access_token}` },
        });

        if (requestCancelled) return;

        dispatch({ type: "SUCCESS", payload: response.data });
      } catch (error) {
        if (requestCancelled) return;

        dispatch({ type: "ERROR", payload: getErrorMessage(error) });
      }
    };

    if (vetteUpdateValues && vetteId) {
      callUpdateVette();
    }

    return () => {
      requestCancelled = true;
    };
  }, [vetteUpdateValues, vetteId, userInfo]);

  const updateVette = (id: string, values: VetteObject) => {
    setVetteUpdateValues(values);
    setVetteId(id);
  };

  return [state, updateVette] as const;
};

export default useUpdateVette;
