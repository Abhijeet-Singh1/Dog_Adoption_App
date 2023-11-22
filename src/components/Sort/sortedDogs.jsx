import React, { useEffect, useState } from "react";
import DogsCard from "../Dogs/dogsCard";

const SortedDogs = (props) => {
  const { breeds, asc, favorites, setFavorites } = props;
  const [dogsIDs, setDogsIds] = useState([]);
  const [nextQuery, setNextQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");
  const [urlAppendString, setUrlAppendString] = useState("");
  const [dogsData, setDogsData] = useState([]);

  const handleNext = () => {
    setUrlAppendString(nextQuery);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  const handlePrev = () => {
    setUrlAppendString(prevQuery);
    window.scrollTo({ top: 0, behavior: "auto" });
  };

  useEffect(() => {
    setUrlAppendString(
      breeds.length > 0
        ? `/dogs/search?sort=breed:${asc ? "asc" : "desc"}&${breeds
            .map((breed) => `breeds[]=${breed}`)
            .join("&")}`
        : `/dogs/search?sort=breed:${asc ? "asc" : "desc"}`
    );
  }, [breeds, asc]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://frontend-take-home-service.fetch.com${urlAppendString}`,
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setDogsIds(data.resultIds);
        setNextQuery(data.next);
        setPrevQuery(data.prev);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (urlAppendString.length > 0) {
      fetchData();
    }
  }, [urlAppendString]);

  return (
    <div className="mt-6">
      <DogsCard
        dogIds={dogsIDs}
        favorites={favorites}
        setFavorites={setFavorites}
        dogsData={dogsData}
        setDogsData={setDogsData}
      />
      <div className="flex justify-center mt-[-3rem]">
        {prevQuery ? (
          <div
            className="px-4 py-2 bg-gray-700 text-white rounded-l mr-5 mt-[5rem] cursor-pointer"
            onClick={handlePrev}
          >
            Prev
          </div>
        ) : (
          <div className="px-4 py-2 bg-gray-400 text-white rounded-l mr-5 mt-[5rem] cursor-not-allowed">
            Prev
          </div>
        )}

        {nextQuery ? (
          <div
            className="px-4 py-2 bg-gray-700 text-white rounded-r mt-[5rem] cursor-pointer"
            onClick={handleNext}
          >
            Next
          </div>
        ) : (
          <div className="px-4 py-2 bg-gray-400 text-white rounded-r mt-[5rem] cursor-not-allowed">
            Next
          </div>
        )}
      </div>
    </div>
  );
};

export default SortedDogs;
