import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Input from "../components/Input"; // Ensure correct path
import FileUpload from "../components/FileUpload"; // Ensure correct path

const DealershipApplicationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    summary: "",
    reputation: 0,
    cacCertificate: null,
    dealershipLicence: null,
    coverImage: null,
    photos: [],
  });

  const [fileStatus, setFileStatus] = useState({
    cacCertificate: false,
    dealershipLicence: false,
    coverImage: false,
    photos: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [alert, setAlert] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      if (name === "photos") {
        setFormData((prevData) => ({
          ...prevData,
          [name]: Array.from(files),
        }));
        setFileStatus((prevStatus) => ({
          ...prevStatus,
          photos: files.length > 0,
        }));
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [name]: files[0],
        }));
        setFileStatus((prevStatus) => ({
          ...prevStatus,
          [name]: true,
        }));
      }
    } else if (name === "reputation") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      setAlert({
        message: "You need to be logged in to submit this form.",
        type: "error",
      });
      return;
    }
  
    setIsLoading(true);
    try {
      const form = new FormData();
      for (const key in formData) {
        if (Array.isArray(formData[key])) {
          formData[key].forEach((file) => {
            form.append(key, file);
          });
        } else {
          form.append(key, formData[key]);
        }
      }
  
      const response = await axios.post(
        "https://auto-lease-backend.onrender.com/api/v1/dealerships/users/apply",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
  
      setAlert({
        message: "Application submitted successfully!",
        type: "success",
      });
      
      // Redirect to the dealership dashboard post page
      navigate("/dealership-dashboard/post");
    } catch (error) {
      console.error("There was an error submitting the form!", error);
      setAlert({
        message: "There was an error submitting the form!",
        type: "error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" flex items-center justify-center relative bg-gray-100 min-h-screen p-6 bg-autolease-pattern">
      {/* Overlay with dark blue tint */}
      <div className="absolute inset-0 bg-blue-900 bg-opacity-50"></div>
      
      <div className="relative bg-white shadow-md rounded-lg overflow-hidden w-full max-w-md">
        <div className="px-6 py-4">
          <h2 className="text-xl font-bold mb-4 text-center">
            Dealership Application
          </h2>
          <div className="flex justify-center items-center mt-6">
            <svg
              width="100%" // Adjust width as needed
              height="auto" // Maintain aspect ratio
              viewBox="0 0 908 474"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="max-w-3xl" // Limit maximum width
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 34C0 15.2223 15.2223 0 34 0H727C745.778 0 761 15.2223 761 34V99C761 117.778 776.222 133 795 133H874C892.778 133 908 148.222 908 167V440C908 458.778 892.778 474 874 474H215C196.222 474 181 458.778 181 440V405C181 386.222 165.778 371 147 371H34C15.2223 371 0 355.778 0 337V34Z"
                fill="#36454F"
              />
              <path
                d="M254.83 260L274.08 225.35L278.49 233.4L263.72 260H254.83ZM285.14 221.36L306.49 260H297.67L280.66 229.34L276.25 221.36L280.66 213.38L285.14 221.36ZM338.431 213.52H345.081V243.13C345.081 246.63 343.821 250.06 341.441 252.58C340.531 253.63 339.481 254.54 338.431 255.31C334.511 258.32 329.681 260 324.361 260C319.111 260 314.281 258.25 310.361 255.31C309.241 254.47 308.261 253.56 307.281 252.58C304.901 249.99 303.641 246.56 303.641 243.06V213.52H310.361V239.21C310.361 246.77 316.311 253.07 323.871 253.35C324.081 253.35 324.221 253.35 324.361 253.35C324.571 253.35 324.711 253.35 324.851 253.35C332.481 253.07 338.431 246.77 338.431 239.21V213.52ZM371.364 260H364.644V223.6H371.364V260ZM389.144 220.24H347.634V213.52H389.144V220.24ZM410.289 220.17C401.119 220.17 393.699 227.66 393.699 236.76C393.699 245.93 401.119 253.35 410.289 253.35C419.389 253.35 426.809 245.93 426.809 236.76C426.809 227.66 419.389 220.17 410.289 220.17ZM386.979 236.76C386.979 223.88 397.409 213.52 410.289 213.52C423.099 213.52 433.529 223.88 433.529 236.76C433.529 249.64 423.099 260 410.289 260C397.409 260 386.979 249.64 386.979 236.76ZM442.683 253.35H472.153V260H435.963V213.17H442.683V253.35ZM482.114 238.44V253.35H516.554V260H475.394V223.6H482.114V231.72H512.004V238.44H482.114ZM475.394 213.52H516.554V220.24H475.394V213.52ZM519.064 260L538.314 225.35L542.724 233.4L527.954 260H519.064ZM549.374 221.36L570.724 260H561.904L544.894 229.34L540.484 221.36L544.894 213.38L549.374 221.36ZM597.237 233.4C602.207 233.4 606.547 236.13 608.857 240.12C609.907 242.08 610.607 244.32 610.607 246.7C610.607 249.15 609.907 251.39 608.857 253.35C606.547 257.34 602.207 260 597.237 260H582.817C577.847 260 573.507 257.34 571.197 253.35C570.147 251.46 569.517 249.36 569.447 247.05H576.167C576.377 250.55 579.247 253.35 582.817 253.35H597.237C600.877 253.35 603.887 250.34 603.887 246.7C603.887 243.06 600.877 240.12 597.237 240.12H582.747C579.037 240.12 575.607 238.58 573.227 236.06C572.457 235.29 571.757 234.38 571.197 233.4C570.077 231.51 569.447 229.2 569.447 226.82C569.447 224.44 570.077 222.2 571.197 220.24C573.507 216.25 577.847 213.52 582.747 213.52H596.887C597.027 213.52 597.167 213.52 597.237 213.52C597.377 213.52 597.447 213.52 597.587 213.52C602.417 213.66 606.547 216.32 608.787 220.24C608.857 220.24 608.857 220.24 608.857 220.24C609.907 222.06 610.537 224.23 610.607 226.47H603.887C603.677 223.04 600.947 220.38 597.517 220.24H582.747C579.107 220.24 576.167 223.18 576.167 226.82C576.167 230.25 578.757 233.05 582.117 233.4C582.327 233.4 582.537 233.4 582.817 233.4C583.167 233.4 583.587 233.4 583.937 233.4H597.237ZM620.52 238.44V253.35H654.96V260H613.8V223.6H620.52V231.72H650.41V238.44H620.52ZM613.8 213.52H654.96V220.24H613.8V213.52Z"
                fill="white"
              />
              <rect
                y="378"
                width="173"
                height="93"
                rx="34"
                fill="#36454F"
                fillOpacity="0.5"
              />
              <rect
                x="768"
                width="140"
                height="126"
                rx="34"
                fill="#36454F"
                fillOpacity="0.5"
              />
            </svg>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Dealership Name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            <Input
              label="Summary"
              type="text"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />

            <FileUpload
              label="Upload Your CAC"
              name="cacCertificate"
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {fileStatus.cacCertificate && (
              <p className="text-green-500 text-sm">
                CAC Certificate uploaded.
              </p>
            )}
            <FileUpload
              label="Dealership Licence"
              name="dealershipLicence"
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {fileStatus.dealershipLicence && (
              <p className="text-green-500 text-sm">
                Dealership Licence uploaded.
              </p>
            )}
            <FileUpload
              label="Cover Image"
              name="coverImage"
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {fileStatus.coverImage && (
              <p className="text-green-500 text-sm">Cover Image uploaded.</p>
            )}
            <FileUpload
              label="Photos"
              name="photos"
              multiple={true}
              onChange={handleChange}
              className="block w-full px-3 py-2 border border-gray-300 rounded-md"
            />
            {fileStatus.photos && (
              <p className="text-green-500 text-sm">
                {formData.photos.length} photos uploaded.
              </p>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                name="terms"
                className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
              />
              <label className="ml-2 block text-sm text-gray-900">
                I have read and understood and agree to the{" "}
                <a
                  href="/terms"
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  Terms & Condition
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  target="_blank"
                  className="text-indigo-600 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-500 transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Register"}
            </button>
          </form>
          {alert.message && (
            <p
              className={`mt-4 text-center ${
                alert.type === "error" ? "text-red-500" : "text-green-500"
              }`}
            >
              {alert.message}
            </p>
          )}
          <p className="mt-4 text-center text-sm text-gray-600">
            Already a dealer?{" "}
            <a href="/" className="text-indigo-600 underline">
              Home
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default DealershipApplicationPage;
