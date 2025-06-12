import React, { useState } from "react";
import Input from "../components/Input";
import CustomAlert from "../components/customAlerts";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import FileUpload from "../components/FileUpload";
import invoice from "../assets/invoice.svg";
import { Eye, EyeOff, Car, Upload, CheckCircle } from "lucide-react";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirm: "",
    terms: false,
    hasEightChars: false,
    hasUpperCase: false,
    hasSpecialChar: false,
    coverImage: null,
    licenseFront: null,
    licenseBack: null,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === "file") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Update file field
      }));
    } else if (type === "password") {
      setFormData((prevData) => {
        const newFormData = {
          ...prevData,
          [name]: value,
        };

        newFormData.hasEightChars = newFormData.password.length >= 8;
        newFormData.hasUpperCase = /[A-Z]/.test(newFormData.password);
        newFormData.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
          newFormData.password
        );

        return newFormData;
      });
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (name, file) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.password ||
      !formData.passwordConfirm
    ) {
      setAlert({
        message: "Please fill out all required fields",
        type: "error",
      });
      return;
    }

    if (formData.password !== formData.passwordConfirm) {
      setAlert({ message: "Passwords do not match", type: "error" });
      return;
    }

    if (
      !formData.hasEightChars ||
      !formData.hasUpperCase ||
      !formData.hasSpecialChar
    ) {
      setAlert({
        message: "Password does not meet all criteria",
        type: "error",
      });
      return;
    }

    if (!formData.terms) {
      setAlert({
        message: "Please accept terms and conditions",
        type: "error",
      });
      return;
    }

    // Create FormData object to handle file uploads
    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("passwordConfirm", formData.passwordConfirm);
    data.append("terms", formData.terms);

    // if (formData.coverImage) {
    //   data.append("coverImage", formData.coverImage);
    // }
    // if (formData.licenseFront) {
    //   data.append("licenseFront", formData.licenseFront);
    // }
    // if (formData.licenseBack) {
    //   data.append("licenseBack", formData.licenseBack);
    // }

    setIsLoading(true);
    try {
      const response = await axios.post(
        "https://auto-lease-backend.onrender.com/api/v1/auth/sign-up",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response.data);

      // Save token to local storage
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      // Navigate to the login page
      navigate("/");
    } catch (error) {
      console.error("There was an error submitting the form!", error);

      // Handle specific error cases
      if (error.response && error.response.status === 500) {
        const errorMessage = error.response.data?.message || "";
        if (
          errorMessage.includes("E11000 duplicate key error") &&
          errorMessage.includes("email")
        ) {
          setAlert({
            message:
              "Email already exists, try logging in or entering a new email address",
            type: "error",
          });
        } else {
          setAlert({
            message: "There was an error submitting the form!",
            type: "error",
          });
        }
      } else {
        setAlert({
          message: "There was an error submitting the form!",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-autolease-pattern min-h-screen bg-gray-100 flex justify-center items-center relative py-10">
      {alert.message && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert({ message: "", type: "" })}
        />
      )}
      <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
      <div className="absolute inset-0 bg-slate-900 opacity-50 z-0"></div>
      <div className="bg-white p-8 rounded-lg shadow-md w-96 relative z-10">
        <div className="flex justify-center items-center pb-6">
          <img src={invoice} alt="" className="w-full" />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            label="Full Name *"
            type="text"
            id="name"
            placeholder="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <Input
            label="Email *"
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* File upload components */}
          <div>
            <div className="relative">
              <div className="font-semibold text-base">
                Front of Driver's License
              </div>
              <input
                type="file"
                name="licenseFront"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange("licenseFront", e.target.files[0])
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="licenseFront"
              />
              <label
                htmlFor="licenseFront"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-500 font-medium text-center">
                    Upload a clear image of the <br /> front of your driver's
                    license
                  </p>
                  <p className="text-xs text-gray-400">
                    Under 5MB, Accepted Formats: .jpg, .jpeg, .png
                  </p>
                </div>
              </label>
            </div>
            {formData.licenseFront && (
              <div className="mt-2">
                {formData.licenseFront.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(formData.licenseFront)}
                    alt="License Front Preview"
                    className="mt-2 w-full max-h-fit object-cover rounded border"
                  />
                )}
                <p className="text-indigo-600 text-sm text-center pt-1">
                  Front of Driver's License uploaded.
                </p>
              </div>
            )}
          </div>

          <div>
            <div className="relative">
              <div className="font-semibold text-base pt-2">
                Back of Driver's License
              </div>
              <input
                type="file"
                name="licenseBack"
                accept="image/*"
                onChange={(e) =>
                  handleFileChange("licenseBack", e.target.files[0])
                }
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="licenseBack"
              />
              <label
                htmlFor="licenseBack"
                className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 mb-2 text-gray-400" />
                  <p className="mb-1 text-sm text-gray-500 font-medium text-center">
                    Upload a clear image of the <br /> back of your driver's
                    license
                  </p>
                  <p className="text-xs text-gray-400">
                    Under 5MB, Accepted Formats: .jpg, .jpeg, .png
                  </p>
                </div>
              </label>
            </div>
            {formData.licenseBack && (
              <div className="mt-2">
                {formData.licenseBack.type.startsWith("image/") && (
                  <img
                    src={URL.createObjectURL(formData.licenseBack)}
                    alt="License Back Preview"
                    className="mt-2 w-full max-h-fit object-cover rounded border"
                  />
                )}
                <p className="text-indigo-600 text-sm text-center pt-1">
                  Back of Driver's License uploaded.
                </p>
              </div>
            )}
          </div>

          <div className="text-xs text-gray-500 text-center">
            Your images will be verified for authenticity
          </div>

          {/* Password field with eye toggle */}
          <div className="relative">
            <Input
              label="Password *"
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="space-y-2">
            <div className="flex items-center">
              <input
                type="radio"
                id="hasEightChars"
                name="hasEightChars"
                checked={formData.hasEightChars}
                readOnly
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="hasEightChars"
                className="ml-2 block text-sm text-gray-700"
              >
                8 Characters
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="hasUpperCase"
                name="hasUpperCase"
                checked={formData.hasUpperCase}
                readOnly
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="hasUpperCase"
                className="ml-2 block text-sm text-gray-700"
              >
                1 upper case character
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="radio"
                id="hasSpecialChar"
                name="hasSpecialChar"
                checked={formData.hasSpecialChar}
                readOnly
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
              />
              <label
                htmlFor="hasSpecialChar"
                className="ml-2 block text-sm text-gray-700"
              >
                1 special character
              </label>
            </div>
          </div>

          {/* Confirm Password field with eye toggle */}
          <div className="relative">
            <Input
              label="Confirm Password *"
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              placeholder="Confirm Password"
              name="passwordConfirm"
              value={formData.passwordConfirm}
              onChange={handleChange}
            />
            <button
              type="button"
              className="absolute right-3 bottom-3 text-gray-500 hover:text-gray-700"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={formData.terms}
              onChange={handleChange}
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
            {isLoading ? <LoadingSpinner /> : "Sign Up"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-600 hover:text-slate-500">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
