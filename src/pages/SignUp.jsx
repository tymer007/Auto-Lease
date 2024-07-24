import React, { useRef } from "react";
import Input from "../components/Input";
import axios from "axios";
// import LogoHeader from '../components/';

const SignUp = () => {
  const name = useRef();
  const email = useRef();
  const password = useRef();
  const passwordConfirm = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    console.log(data.entries());
    try {
        const response = await axios.post('https://auto-lease-backend.onrender.com/api/v1/auth/sign-up',data);
        console.log(response.data);
      } catch (error) {
        console.error('There was an error submitting the form!', error);
      }
    };
  
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        {/* <LogoHeader /> */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name"
            type="text"
            id="name"
            placeholder="Full Name"
            name="name"
            ref={name}
          />
          <Input
            label="Email"
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            ref={email}
          />
          <Input
            label="Password"
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            ref={password}
          />
          <Input
            label="Confirm Password "
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            name="passwordConfirm"
            ref={passwordConfirm}
          />

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
              I have read and understood and agree to the{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Terms & Condition
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-500">
                Privacy Policy
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a
            href="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
