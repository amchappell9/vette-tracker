import { User } from "gotrue-js";

const storage = {
  getUserInfo: () => {
    const userInfo = localStorage.getItem("userInfo");

    if (userInfo != null) {
      return JSON.parse(userInfo) as User;
    }

    return null;
  },
  persistUserInfo: (userInfo: User) => {
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
  },
};

export default storage;
