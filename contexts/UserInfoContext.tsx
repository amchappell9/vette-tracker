import React from "react";
import { User } from "gotrue-js";

const UserInfoContext = React.createContext<User | null>(null);

export default UserInfoContext;
