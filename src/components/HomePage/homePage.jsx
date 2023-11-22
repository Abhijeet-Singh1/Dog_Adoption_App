import React, { useState } from "react";
import { MenuIcon } from "@heroicons/react/solid";
import SortedDogs from "../Sort/sortedDogs";
import FilterModal from "../Modal/filterModal";
import Breeds from "../Breeds/breeds";
import Match from "../Match/match";
import Logout from "../Logout/logout";

function HomePage() {
  const [breeds, setBreeds] = useState([]);
  const [filteredBreeds, setFilteredBreeds] = useState([]);
  const [isAscending, setIsAscending] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleSort = () => {
    setIsAscending(!isAscending);
  };

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="p-6">
      <nav className="border-gray-200 bg-gray-700 rounded-xl">
        <div className="flex flex-wrap justify-between w-full py-3 px-4">
          <div className="flex items-center w-1/6">
            <img src="fetch_logo.png" className="h-12" alt="Flowbite Logo" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-4">
              Fetch
            </span>
          </div>
          <div className="md:hidden">
            <button
              onClick={handleMenuToggle}
              className="text-gray-300 hover:text-gray-100 focus:outline-none focus:text-gray-100"
            >
              <MenuIcon className="h-12 w-6" />
            </button>
          </div>
          <div
            id="mega-menu-full"
            className={`${
              isMenuOpen ? "block" : "hidden"
            } md:flex md:w-4/6 mt-4 md:mt-3`}
          >
            <div className="flex flex-col p-4 mt-4 border rounded-lg md:p-0 md:w-full md:flex-row md:justify-between md:mt-0 md:border-0 dark:border-gray-700">
              <div>
                <FilterModal
                  buttonTitle="Filter"
                  title="Filter by Breeds"
                  fullWidth
                  content={
                    <Breeds
                      breeds={breeds}
                      filteredBreeds={filteredBreeds}
                      setBreeds={setBreeds}
                      setFilteredBreeds={setFilteredBreeds}
                    />
                  }
                />
              </div>
              <div>
                <div
                  href="#"
                  className="block py-2 px-3 mr-[10rem] text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:p-0 dark:text-white dark:hover:bg-gray-700 cursor-pointer"
                  aria-current="page"
                  onClick={handleSort}
                >
                  {`Sort [${isAscending ? "A" : "D"}]`}
                </div>
              </div>
              <div>
                <FilterModal
                  buttonTitle={`Generate Match ${
                    favorites.length > 0 ? `(${favorites.length})` : ""
                  }`}
                  title="Your Match"
                  content={<Match favorites={favorites} />}
                  disabled={favorites.length === 0}
                />
              </div>
              <div>
                <Logout />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="mt-6">
        <SortedDogs
          breeds={filteredBreeds.length > 0 ? filteredBreeds : []}
          asc={isAscending}
          favorites={favorites}
          setFavorites={setFavorites}
        />
      </div>
    </div>
  );
}

export default HomePage;
