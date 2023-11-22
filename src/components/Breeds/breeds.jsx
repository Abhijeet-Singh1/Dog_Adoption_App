import React, { useEffect, useState } from "react";

function Breeds(props) {
  const { breeds, filteredBreeds, setBreeds, setFilteredBreeds } = props;
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            method: "GET",
            credentials: "include",
            crossorigin: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setBreeds(data);
        } else {
          console.log(
            "Failed to fetch breeds:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [setBreeds]);

  const handleClickedItem = (breedObj) => {
    const found = filteredBreeds.find((breed) => breed === breedObj);
    if (found) {
      setFilteredBreeds(filteredBreeds.filter((breed) => breed !== breedObj));
    } else {
      setFilteredBreeds([...filteredBreeds, breedObj]);
    }
  };

  const inFilteredList = (breedObj) => {
    return filteredBreeds.find((breed) => breed === breedObj);
  };

  const organizedBreeds = breeds.reduce((acc, breedObj) => {
    const firstLetter = breedObj[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push(breedObj);
    return acc;
  }, {});

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 lg:grid-cols-11 gap-1">
          {Object.keys(organizedBreeds).map((letter) => (
            <div key={letter}>
              <p className="text-xl font-bold">{letter}</p>
              {organizedBreeds[letter].map((breedObj, i) => (
                <div
                  key={i}
                  onClick={() => handleClickedItem(breedObj)}
                  className={inFilteredList(breedObj) ? "text-red-800" : ""}
                >
                  <span className="focus:cursor-pointer hover:cursor-pointer hover:text-md">
                    {breedObj}
                  </span>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Breeds;
