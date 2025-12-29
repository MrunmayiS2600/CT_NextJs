"use client";

import { useState, useEffect } from "react";

declare global {
  interface Window {
    clevertap: any;
  }
}

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const waitForCleverTap = (callback: () => void) => {
    const interval = setInterval(() => {
      if (
        typeof window !== "undefined" &&
        window.clevertap &&
        Array.isArray(window.clevertap.onUserLogin) &&
        typeof window.clevertap.event?.push === "function"
      ) {
        clearInterval(interval);
        callback();
      }
    }, 500);
  };

  useEffect(() => {
    waitForCleverTap(() => {
      console.log("CleverTap fully ready!");
      window.clevertap.event.push("Home Page Viewed");
    });
  }, []);

  const handleLogin = () => {
    if (!name || !email) {
      alert("Enter Name & Email");
      return;
    }

    waitForCleverTap(() => {
      window.clevertap.onUserLogin.push({
        Site: {
          Name: name,
          Identity: email,
          Email: email,
          "MSG-email": true,
          "MSG-push": true,
        },
      });

      window.clevertap.event.push("Login Button Clicked", {
        "User Name": name,
        "User Email": email,
        time: new Date(),
      });

      window.clevertap.profile.push({
        Site: { Stage: "Login" },
      });

      console.log("CleverTap ID after login:", window.clevertap.getCleverTapID?.());
      alert("Login Event Sent!");
    });
  };

  const handleProductView = () => {
    waitForCleverTap(() => {
      window.clevertap.event.push("Product Viewed", {
        "Product ID": "P123",
        Name: "Premium Hoodie",
        Price: 999,
        Category: "Fashion",
        view_time: new Date(),
      });
      alert("Product Viewed Event Sent!");
    });
  };

  const handleAddToCart = () => {
    waitForCleverTap(() => {
      window.clevertap.event.push("Added to Cart", {
        "Product ID": "P123",
        Price: 999,
        Quantity: 1,
      });
      alert("Added to Cart Event Sent!");
    });
  };

  const handleCheckout = () => {
    waitForCleverTap(() => {
      window.clevertap.event.push("Checkout Started", {
        cart_value: 999,
        step: 1,
      });
      alert("Checkout Event Sent!");
    });
  };

  const handleLogout = () => {
    waitForCleverTap(() => {
      window.clevertap.event.push("Logout Clicked");
      alert("Logout Event Sent!");
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          CleverTap Events Demo
        </h1>

        <div className="space-y-4">
         <input
          className="w-full p-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Name"
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 border border-gray-300 rounded-lg text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Enter Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
        />

          <button
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
            onClick={handleLogin}
          >
            Login & Track Event
          </button>
        </div>

        <hr className="my-6 border-gray-300" />

        <div className="space-y-3">
          <button
            className="w-full bg-gray-700 text-white py-3 rounded-lg hover:bg-gray-800 transition"
            onClick={handleProductView}
          >
            Track Product Viewed
          </button>

          <button
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            onClick={handleAddToCart}
          >
            Track Add to Cart
          </button>

          <button
            className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
            onClick={handleCheckout}
          >
            Track Checkout
          </button>

          <button
            className="w-full bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 transition"
            onClick={handleLogout}
          >
            Logout Event
          </button>
        </div>
      </div>
    </div>
  );
}
