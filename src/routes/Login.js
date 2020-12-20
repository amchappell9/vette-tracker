import React from "react";
import { useHistory, useLocation, Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

export const Login = ({ handleAuth }) => {
  let history = useHistory();
  let location = useLocation();

  let { from } = location.state || { from: { pathname: "/" } };

  return (
    <>
      <div className="min-main-height flex justify-center items-center w-full h-full">
        <div className="max-w-lg w-full space-y-8 -mt-48">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-800">
              Sign In to <span className="">Vette Tracker</span>
            </h1>
            <p className="mt-2 text-xl text-gray-800">
              Don't have an account?{" "}
              <Link to="/sign-up" className="text-red-500">
                Click here to sign up!
              </Link>
            </p>
          </div>
          <div>
            <form>
              <label for="username" className="block mb-2 font-bold text-lg">
                Username:
              </label>
              <Input
                id="username"
                type="text"
                autocomplete="username"
                className="w-full py-1 px-4"
              />
              <label
                for="password"
                className="block mb-2 mt-4 font-bold text-lg"
              >
                Password:
              </label>
              <Input
                id="password"
                type="password"
                autoComplete="current-password"
                className="w-full py-1 px-4"
              />
              <Button
                size="full"
                className="mt-4"
                onClick={() => {
                  handleAuth((response) => {
                    console.log(response);
                    history.replace(from);
                  });
                }}
              >
                Sign In
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
