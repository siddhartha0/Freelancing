import React, { useState, useCallback, useEffect } from "react";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ApplicationVerifier,
  ConfirmationResult,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import axios from "axios";

const firebaseConfig = {
  apiKey: "AIzaSyAyWbY3csVAqhiYu5eQnhfaPAta_BzRztI",
  authDomain: "chalau-5c46e.firebaseapp.com",
  projectId: "chalau-5c46e",
  storageBucket: "chalau-5c46e.appspot.com",
  messagingSenderId: "543950509836",
  appId: "1:543950509836:web:5dd4146d918ab406dc9b29",
  measurementId: "G-SPV1GCHKZ9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

declare global {
  interface Window {
    recaptchaVerifier?: ApplicationVerifier;
  }
}

interface AlertProps {
  type: "error" | "success";
  message: string;
}

const Alert: React.FC<AlertProps> = ({ type, message }) => (
  <div
    className={`mb-4 p-4 ${
      type === "error"
        ? "bg-red-100 border-red-500 text-red-700"
        : "bg-green-100 border-green-500 text-green-700"
    } border-l-4`}
  >
    <p className="font-bold">{type === "error" ? "Error" : "Success"}</p>
    <p>{message}</p>
  </div>
);

export const DashboardPage: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [confirmationResult, setConfirmationResult] =
    useState<ConfirmationResult | null>(null);
  const [alert, setAlert] = useState<AlertProps | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setupRecaptcha();
  }, []);

  const setupRecaptcha = useCallback(() => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        auth,
        "recaptcha-container",
        {
          size: "normal",
          callback: () => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          },
          "expired-callback": () => {
            setAlert({
              type: "error",
              message: "reCAPTCHA expired. Please try again.",
            });
          },
        }
      );
    }
  }, []);

  const sendOtp = useCallback(async () => {
    setAlert(null);
    setIsLoading(true);
    try {
      const appVerifier = window.recaptchaVerifier;
      if (!appVerifier) throw new Error("reCAPTCHA not set up correctly");

      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        appVerifier
      );
      setConfirmationResult(confirmationResult);
      setAlert({ type: "success", message: "OTP sent successfully!" });
    } catch (error: any) {
      console.error("Error during phone number verification:", error);
      if (error.code === "auth/billing-not-enabled") {
        setAlert({
          type: "error",
          message:
            "Phone authentication is not enabled. Please check your Firebase project settings and ensure billing is set up.",
        });
      } else {
        setAlert({
          type: "error",
          message: error.message || "Failed to send OTP. Please try again.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }, [phoneNumber]);

  const verifyOtp = useCallback(async () => {
    setAlert(null);
    setIsLoading(true);
    if (!confirmationResult) {
      setAlert({ type: "error", message: "Please send OTP first" });
      setIsLoading(false);
      return;
    }
    try {
      const result = await confirmationResult.confirm(otp);
      setAlert({
        type: "success",
        message: "Phone number verified successfully!",
      });
      console.log("User verified successfully:", result.user?.accessToken);
      const backendData = await axios.post(
        "http://localhost:3333/api/auth/login",
        {},
        {
          headers: {
            Authorization: `Bearer ${result.user.accessToken}`,
          },
        }
      );
      console.log(backendData);
    } catch (error: any) {
      console.error("Error verifying OTP:", error);
      setAlert({
        type: "error",
        message: error.message || "Failed to verify OTP. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  }, [confirmationResult, otp]);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Phone Number Authentication
      </h2>

      {alert && <Alert type={alert.type} message={alert.message} />}

      <div className="space-y-4">
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="+1XXXXXXXXXX"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <button
          onClick={sendOtp}
          disabled={isLoading}
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {isLoading ? "Sending..." : "Send OTP"}
        </button>

        {confirmationResult && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="otp"
                className="block text-sm font-medium text-gray-700"
              >
                OTP
              </label>
              <input
                id="otp"
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <button
              onClick={verifyOtp}
              disabled={isLoading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        <div id="recaptcha-container" className="flex justify-center"></div>
      </div>
    </div>
  );
};
