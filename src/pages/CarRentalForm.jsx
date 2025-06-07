import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import invoice from "../assets/invoice.svg";

const CarRentalForm = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [car, setCar] = useState(null);
  const [step, setStep] = useState(1);
  const [pickupDate, setPickupDate] = useState("");
  const [pickupTime, setPickupTime] = useState("");
  const [dropoffDate, setDropoffDate] = useState("");
  const [dropoffTime, setDropoffTime] = useState("");
  const [address, setAddress] = useState("");
  const [subTotal, setSubTotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [paymentReference, setPaymentReference] = useState(null);
  const navigate = useNavigate();

  const receiptRef = useRef(null);

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-GB");
  const dateToday = formattedDate.replace(/\//g, "-");

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await axios.get(
          `https://auto-lease-backend.onrender.com/api/v1/cars/${id}`
        );
        setCar(response.data.data.car);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
      }
    };
    fetchCar();
  }, [id]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setMessage("No token found. Please log in.");
        return;
      }

      try {
        const response = await axios.get(
          "https://auto-lease-backend.onrender.com/api/v1/users/me",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUserData(response.data.data.user);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (pickupDate && dropoffDate && car) {
      const startDate = new Date(pickupDate);
      const endDate = new Date(dropoffDate);
      const days = Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24));
      let cost = days * car.price;
      const undiscountedRate = days * car.price;
      setSubTotal(undiscountedRate);
      if (car.discount > 0) {
        cost *= 1 - car.discount / 100;
        const totalCost = cost + car.fee;
        setTotal(totalCost);
      } else {
        const totalCost = undiscountedRate + car.fee;
        setTotal(totalCost);
      }
    }
  }, [pickupDate, dropoffDate, car]);

  const publicKey = "pk_test_279b0e2e9b08ff41a42327effe88a9f1ba904a5e";
  const email = userData?.email;
  const amount = total * 100; // Amount in kobo

  const handleNext = () => {
    if (
      step === 1 &&
      (!pickupDate || !pickupTime || !address || !dropoffDate || !dropoffTime)
    ) {
      alert("All fields are required.");
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  const componentProps = {
    email,
    amount,
    publicKey,
    text: `Checkout ₦${total.toFixed(2)}`,
    onSuccess: (reference) => {
      console.log("Payment successful", reference);
      handlePaymentSuccess(reference);
    },
    onClose: () => {
      console.log("Payment closed");
    },
  };

  const handlePaymentSuccess = (reference) => {
    console.log("Payment Reference:", reference);
    setPaymentReference(reference.reference); // Store the reference
    setStep(3); // Move to the next step
  };

  const handleDownloadImage = () => {
    if (receiptRef.current) {
      toPng(receiptRef.current)
        .then((dataUrl) => {
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "receipt.png";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        })
        .catch((err) => {
          console.error("Error generating image:", err);
        });
    }
  };

  if (!car) return <div>Loading...</div>;

  return (
    <div className="p-4">
      {step === 1 && (
        <div>
          <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden md:max-w-md mt-8">
            <div className="p-4 flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-800">
                {car.name}
              </h2>
              <span className="text-base text-gray-500 border p-1 rounded-lg">
                {car.category}
              </span>
            </div>
            <div className="flex justify-center p-4 rounded-xl shadow-2xl border-2 z-10">
              <img
                src={car.coverImage.url}
                alt={car.name}
                className="w-full h-48 object-cover rounded"
              />
              {/* <img src={car.coverImage.url} alt={car.name} className="w-full h-48 object-cover rounded" /> */}
            </div>
            <div className="px-4 pb-4">
              <p className="text-gray-700 mt-4 text-center pt-2">
                <strong>Dealership:</strong> {car.dealership}
              </p>
              <p className="text-gray-700 mb-4 text-center">{car.model}</p>
              <div className="space-y-4">
                <form className="space-y-4">
                  <label className="block">
                    Pick-Up Date
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="date"
                      value={pickupDate}
                      onChange={(e) => setPickupDate(e.target.value)}
                      required
                    />
                  </label>
                  <label className="block">
                    Pick-Up Time
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="time"
                      value={pickupTime}
                      onChange={(e) => setPickupTime(e.target.value)}
                      min="09:00"
                      max="17:00"
                      required
                    />
                  </label>
                  <label className="block">
                    Drop-Off Date
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="date"
                      value={dropoffDate}
                      onChange={(e) => setDropoffDate(e.target.value)}
                      required
                    />
                  </label>
                  <label className="block">
                    Drop-0ff Time
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="time"
                      value={dropoffTime}
                      onChange={(e) => setDropoffTime(e.target.value)}
                      min="09:00"
                      max="17:00"
                      required
                    />
                  </label>
                  <label className="block">
                    Address
                    <input
                      className="border rounded px-2 py-1 w-full"
                      type="text"
                      value={address}
                      placeholder="Address"
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </label>
                </form>
              </div>
              <div className="flex items-center justify-between mt-6 gap-1">
                <span className="w-fit text-xs p-0.5 text-white text-center bg-gray-800 rounded">
                  Rental Fee
                </span>
                <span className="text-xl py-1 font-bold border w-full text-center border-gray-800 rounded">
                  ₦ {car.price}
                </span>
              </div>
              <div className="flex items-center justify-between gap-1 pt-2">
                <button
                  className="w-fit text-xs p-0.5 text-center rounded border-gray-800 border"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel Booking
                </button>
                <button
                  className="text-xl py-1 font-bold border w-full text-center border-gray-800 rounded bg-gray-800 text-white"
                  type="button"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {step === 2 && (
        <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden md:max-w-md mt-8">
          <h1 className="text-2xl text-center font-bold">Invoice</h1>
          <div className="w-12/12 shadow-2xl px-2 rounded-lg p-3">
            <img src={invoice} alt="" className="" />
            <div className="flex justify-between text-gray-500">
              <div>Ikon Allah Invoice</div>
              <div>Date: {dateToday}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Car Name</div>
              <div>{car.name}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Car Model</div>
              <div>{car.model}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Pick-Up Date</div>
              <div>{pickupDate}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Drop Off Date</div>
              <div>{dropoffDate}</div>
            </div>
            <hr className="my-3 border-slate-900 mx-1" />
            <div className="flex justify-between px-1">
              <div>Price Per Day x Number of Days</div>
              <div>
                ₦ {car.price} x{" "}
                {Math.ceil(
                  (new Date(dropoffDate) - new Date(pickupDate)) /
                    (1000 * 60 * 60 * 24)
                )}
              </div>
            </div>
            <div className="flex justify-between px-1">
              <div>Subtotal</div>
              <div>
                <span
                  className={`${
                    car.discount > 0 ? "text-gray-700 line-through" : ""
                  }`}
                >
                  ₦ {subTotal}
                </span>
              </div>
            </div>
            {car.discount > 0 && (
              <>
                <div className="flex justify-between px-1">
                  <div>Applied Discount</div>
                  <div>- {car.discount}%</div>
                </div>
              </>
            )}
            <div className="flex justify-between px-1">
              <div>Delivery fee</div>
              <div>+ ₦{car.fee}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Total</div>
              <div>₦{total.toFixed(2)}</div>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1 pt-4">
            <button
              className="w-fit text-xs p-2.5 text-center rounded border-gray-800 border"
              type="button"
              onClick={handleBack}
            >
              Back
            </button>
            <PaystackButton
              className="text-xl py-1 font-bold border w-full text-center border-gray-800 rounded bg-gray-800 text-white px-4 cursor-pointer"
              {...componentProps}
            />
          </div>
        </div>
      )}
      {step === 3 && (
        <div className="max-w-sm mx-auto bg-white rounded-lg overflow-hidden md:max-w-md mt-8 flex flex-col items-center">
          <h1 className="text-2xl font-bold mb-4 text-center text-slate-700">
            Payment Successful!
          </h1>
          {/* div below to image */}
          <div
            ref={receiptRef}
            className="w-11/12 shadow-2xl px-2 rounded-lg p-3 bg-white"
          >
            <img src={invoice} alt="picture" className="" />
            <div className="flex justify-between text-gray-500">
              <div>Ikon-Allah Reciept</div>
              <div>Date: {dateToday}</div>
            </div>
            <div className="flex justify-between pt-2 px-1">
              <div>Name</div>
              <div>{userData.name}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Email</div>
              <div>{userData.email}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Address</div>
              <div>{address}</div>
            </div>
            {/* <div className="flex justify-between px-1">
              <div>Order No.</div>
              <div>From id of boooking</div>
            </div> */}
            <div className="flex justify-between px-1">
              <div>Payment Reference</div>
              <div>{paymentReference}</div>
            </div>
            <hr className="my-2 border-slate-900 mx-1" />
            <div className="flex justify-between px-1">
              <div>Car Name</div>
              <div>{car.name}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Car Model</div>
              <div>{car.model}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Pick-Up Date</div>
              <div>{pickupDate}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Drop Off Date</div>
              <div>{dropoffDate}</div>
            </div>
            <hr className="my-3 border-slate-900 mx-1" />
            <div className="flex justify-between px-1">
              <div>Price Per Day x Number of Days</div>
              <div>
                ₦ {car.price} x{" "}
                {Math.ceil(
                  (new Date(dropoffDate) - new Date(pickupDate)) /
                    (1000 * 60 * 60 * 24)
                )}
              </div>
            </div>
            <div className="flex justify-between px-1">
              <div>Subtotal</div>
              <div>
                <span
                  className={`${
                    car.discount > 0 ? "text-gray-700 line-through" : ""
                  }`}
                >
                  ₦ {subTotal}
                </span>
              </div>
            </div>
            <div className="flex justify-between px-1">
              <div>Applied Discount</div>
              <div>- {car.discount}%</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Delivery fee</div>
              <div>+ ₦ {car.fee}</div>
            </div>
            <div className="flex justify-between px-1">
              <div>Total Paid</div>
              <div>₦{total.toFixed(2)}</div>
            </div>
          </div>
          <button
            className="mt-4 bg-autoPurple font-extrabold text-white py-2 px-4 rounded"
            onClick={handleDownloadImage}
          >
            Download Receipt as PNG
          </button>
        </div>
      )}
    </div>
  );
};

export default CarRentalForm;