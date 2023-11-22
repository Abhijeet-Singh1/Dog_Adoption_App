import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
      setEmailError("Please enter a valid email address");
      console.error("Invalid email format");
      return;
    }

    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
          }),
        }
      );

      if (response.ok) {
        navigate("/home");
      } else {
        console.error("Login failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error during login", error);
    }
  };

  return (
    <div>
      <figure className="h-screen flex bg-gray-100">
        <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
          <blockquote className="text-2xl font-medium text-center">
            <p className="text-lg font-semibold">Welcome to Fetch</p>
          </blockquote>

          <div className="text-primary m-6">
            <div className="flex items-center mt-3 justify-center">
              <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
                Login to your account
              </h1>
            </div>
            <form onSubmit={handleSubmit}>
              <label className="text-left">Username:</label>
              <input
                name="username"
                type="text"
                value={name}
                onChange={handleNameChange}
                placeholder="Name"
                className={
                  "w-full p-2 text-primary border rounded-md outline-none text-sm mb-4"
                }
              />
              <label>Email:</label>
              <input
                name="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Email"
                className="w-full p-2 text-primary border rounded-md outline-none text-sm mb-4"
              />
              {emailError && (
                <p className="text-red-500 mt-[-1rem]">{emailError}</p>
              )}
              <div className="flex items-center mt-3 justify-center">
                <button
                  type="submit"
                  className={
                    "bg-gray-700 hover:bg-gray-900 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                  }
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </figure>
    </div>
  );
}

export default Login;
