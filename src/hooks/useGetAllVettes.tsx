import { useReducer, useEffect, useContext } from "react";
import axios from "axios";
import UserInfoContext from "../contexts/UserInfoContext";
import { VetteObject } from "../types/types";

type ActionType =
  | { type: "INIT" }
  | { type: "SUCCESS"; payload: VetteObject[] }
  | { type: "ERROR"; payload: string };

type StateObject = {
  isLoading: boolean;
  hasError: boolean;
  errorMessage: string;
  vettes: VetteObject[];
};

const getVettesReducer = (state: StateObject, action: ActionType) => {
  switch (action.type) {
    case "INIT":
      return { ...state, isLoading: true };

    case "SUCCESS":
      return { ...state, isLoading: false, vettes: action.payload };

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
      dispatch({ type: "INIT" });

      try {
        let response = await axios({
          url: "/.netlify/functions/vettes",
          method: "get",
          headers: { Authorization: `Bearer ${userInfo?.token.access_token}` },
        });

        if (requestCancelled) return;

        dispatch({ type: "SUCCESS", payload: response.data.vettes });
      } catch (error) {
        if (requestCancelled) return;

        if (error instanceof Error) {
          dispatch({ type: "ERROR", payload: error.message });
        } else {
          dispatch({ type: "ERROR", payload: "An error has happened" });
        }
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
