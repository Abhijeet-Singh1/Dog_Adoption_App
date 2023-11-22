import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      if (response.ok) {
        navigate("/");
      } else {
        console.error("Logout failed:", response.status, response.statusText);
      }
    } catch (error) {
      console.log("Error during logout", error);
    }
  };

  return (
    <div
      href="#"
      className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
      aria-current="page"
      onClick={handleLogout}
    >
      Logout
    </div>
  );
}

export default Logout;
