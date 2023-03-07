import { ErrorResponseModel } from "@/types";
import GoTrue, { User } from "gotrue-js";

export const auth = new GoTrue({
  APIUrl: "https://your-identity-instance.netlify.com/.netlify/identity",
});

export const storage = {
  getUserInfo: () => {
    if (typeof window === "undefined") {
      return null;
    }

    const userInfo = localStorage.getItem("userInfo");

    if (userInfo != null) {
      return JSON.parse(userInfo) as User;
    }

    return null;
  },
  persistUserInfo: (userInfo: User) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
  clearUserInfo: () => {
    localStorage.removeItem("userInfo");
  },
};

export const login = (
  email: string,
  password: string,
  handleSuccess: (response: User) => void,
  handleError: (error: ErrorResponseModel) => void
) => {
  auth
    .login(email, password, true)
    .then((response) => {
      //  setUserInfo(response);
      handleSuccess(response);
    })
    .catch((error) => handleError(JSON.parse(JSON.stringify(error))));
};

export const logout = () => {
  const user = auth.currentUser();

  if (user) {
    user.logout();
    storage.clearUserInfo();
  }
};

export const signUpNewUser = (
  email: string,
  password: string,
  handleSuccess: (response: User) => void,
  handleError: (error: ErrorResponseModel) => void
) => {
  auth
    .signup(email, password)
    .then((response) => handleSuccess(response))
    .catch((error) => handleError(JSON.parse(JSON.stringify(error))));
};
