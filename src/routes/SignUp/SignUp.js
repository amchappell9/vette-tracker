import React from "react";
import { Link } from "react-router-dom";
import Input from "../../components/Input";
import Button from "../../components/Button";

const SignUp = () => {
  return (
    <div className="min-main-height mb-8 flex justify-center items-center">
      <div className="block max-w-4xl w-full">
        <h1 className="text-3xl font-bold text-gray-700">Sign Up</h1>
        <div className="mt-4 mb-8 px-8 bg-white rounded shadow-lg grid grid-cols-3 gap-8">
          <div className="pt-8">
            <h2 className="font-bold text-xl text-gray-600">Profile</h2>
            <p className="text-gray-500">Enter information about yourself.</p>
          </div>
          <div className="col-span-2 py-8">
            <form>
              <div className="grid grid-cols-2 gap-4">
                <div className="">
                  <label className="block mb-2 font-gray-600">First Name</label>
                  <Input className="w-full bg-gray-50 py-1 px-4" />
                </div>
                <div className="">
                  <label className="block mb-2 font-gray-600">Last Name</label>
                  <Input className="w-full bg-gray-50 py-1 px-4" />
                </div>
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-gray-600">
                  Email Address
                </label>
                <Input className="w-full bg-gray-50 py-1 px-4" />
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-gray-600">Password</label>
                <Input className="w-full bg-gray-50 py-1 px-4" />
              </div>
              <div className="mt-4">
                <label className="block mb-2 font-gray-600">
                  Confirm Password
                </label>
                <Input className="w-full bg-gray-50 py-1 px-4" />
              </div>
            </form>
          </div>
        </div>
        <div className="text-right">
          {/* <Button variant="secondary" className="mr-2">
            Cancel
          </Button> */}
          <Link
            to="/"
            className="bg-white hover:bg-gray-100 text-gray-800 border border-gray-300 px-6 py-2 text-lg mr-2"
          >
            Cancel
          </Link>
          <Button>Sign Up</Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
