import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useNavigate, useParams } from "react-router-dom";
import { PaystackButton } from "react-paystack";
import invoice from "../assets/invoice.svg";
import Navbar from "../components/Navbar";

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

  console.log("car:", car);

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
    metadata: {
      name: userData?.name,
      email: userData?.email,
      address,
      carName: car?.name,
      carModel: car?.model,
      dealership: car?.dealership,
      category: car?.category,
      pickupDate,
      pickupTime,
      dropoffDate,
      dropoffTime,
      pricePerDay: car?.price,
      days: Math.ceil(
        (new Date(dropoffDate) - new Date(pickupDate)) / (1000 * 60 * 60 * 24)
      ),
      discount: car?.discount,
      deliveryFee: car?.fee,
      subTotal,
      total,
    },
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
    <>
      <Navbar />
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
              </div>
              {/* <div className="flex justify-center p-4 rounded-xl shadow-2xl border-2 z-10">
                <img
                  src={car.photos[0].url}
                  alt={car.name}
                  className="w-full h-48 object-cover rounded"
                />
              </div> */}
              <div className="px-4 pb-4">
                <p className="text-gray-700 mt-4 text-center pt-2">
                  <strong>Dealership:</strong> {car.dealership}
                </p>
                <p className="text-gray-700 text-center"><span className="font-semibold">{car.name}&nbsp;</span>{car.model}</p>
                <p className="text-gray-700 mb-4 text-center text-sm">{car.summary}</p>
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
                        placeholder="Delivery address e.g. Abuja Park"
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </label>
                  </form>
                </div>
                <div className="flex items-center justify-between mt-6 gap-1">
                  <span className="w-3/12 text-xs p-0.5 text-white text-center bg-gray-800 rounded">
                    Rental Fee <br />
                    Per Day
                  </span>
                  <span className="text-xl py-1 font-bold border w-9/12 text-center border-gray-800 rounded">
                    ₦ {car.price.toLocaleString()}
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
              <img src={invoice} alt="" />
              <div className="flex justify-between text-gray-500">
                <div>AUTOLEASE Invoice</div>
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
                  ₦ {Number(car.price).toLocaleString()} x{" "}
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
                    ₦{" "}
                    {Number(subTotal).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
              {car.discount > 0 && (
                <div className="flex justify-between px-1">
                  <div>Applied Discount</div>
                  <div>- {car.discount}%</div>
                </div>
              )}
              <div className="flex justify-between px-1">
                <div>Delivery fee</div>
                <div>+ ₦ {Number(car.fee).toLocaleString()}</div>
              </div>
              <div className="flex justify-between px-1 font-bold text-black">
                <div>Total</div>
                <div>
                  ₦&nbsp;
                  {Number(total).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </div>
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
            <div
              ref={receiptRef}
              className="w-11/12 shadow-2xl px-4 rounded-lg p-4 bg-white text-sm text-gray-800"
            >
              <img src={invoice} alt="Receipt header" className="mb-2" />
              <div className="text-center font-bold text-xl mb-2">
                AUTOLEASE RECEIPT
              </div>
              <div className="flex justify-between text-gray-500 text-sm mb-2">
                <span>Date</span>
                <span>{dateToday}</span>
              </div>

              <div className="border-t pt-2">
                <div className="flex justify-between mb-1">
                  <span>Reference</span>
                  <span>{paymentReference}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Name</span>
                  <span>{userData?.name}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Email</span>
                  <span>{userData?.email}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Address</span>
                  <span>{address}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Car</span>
                  <span>
                    {car.name} ({car.model})
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Category</span>
                  <span>{car.category}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Dealership</span>
                  <span>{car.dealership}</span>
                </div>
              </div>

              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between mb-1">
                  <span>To be Delivered</span>
                  <span>
                    {pickupDate} at {pickupTime}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>To be returned</span>
                  <span>
                    {dropoffDate} at {dropoffTime}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Days</span>
                  <span>
                    {Math.ceil(
                      (new Date(dropoffDate) - new Date(pickupDate)) /
                        (1000 * 60 * 60 * 24)
                    )}{" "}
                    day(s)
                  </span>
                </div>
              </div>

              <div className="border-t pt-2 mt-2 font-semibold">
                <div className="flex justify-between mb-1">
                  <span>Price Per Day</span>
                  <span>₦ {Number(car.price).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Subtotal</span>
                  <span
                    className={
                      car.discount > 0 ? "line-through text-gray-500" : ""
                    }
                  >
                    ₦&nbsp;
                    {Number(subTotal).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
                {car.discount > 0 && (
                  <div className="flex justify-between mb-1 text-indigo-500">
                    <span>Discount ({car.discount}%)</span>
                    <span>
                      - ₦&nbsp;
                      {Number(
                        ((subTotal * car.discount) / 100).toFixed(2)
                      ).toLocaleString()}
                    </span>
                  </div>
                )}
                <div className="flex justify-between mb-1">
                  <span>Delivery Fee</span>
                  <span>₦ {Number(car.fee).toLocaleString()}</span>
                </div>
                <div className="flex justify-between mb-1 text-xl text-black">
                  <span>Total</span>
                  <span>
                    ₦&nbsp;
                    {Number(total).toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="mt-4 bg-autoPurple font-extrabold text-white py-2 px-4 rounded"
              onClick={handleDownloadImage}
            >
              <p>Download Receipt</p>
            </button>
            <span className="text-sm font-medium text-center pt-2">
              Your car will be delivered to your address on pick up date.
            </span>
            <span className="text-sm font-medium text-center">
              Show your receipt to our Valet to claim rental car
            </span>
            <span className="text-sm font-medium text-center">
              Thanks for choosing us! 💜
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default CarRentalForm;
