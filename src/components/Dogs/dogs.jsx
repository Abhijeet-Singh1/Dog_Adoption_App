import React, { useEffect, useState } from "react";
import DogsCard from "./dogsCard";

function Dogs({ breeds }) {
  const [dogIds, setDogIds] = useState([]);
  const [nextQuery, setNextQuery] = useState("");
  const [prevQuery, setPrevQuery] = useState("");
  const [urlAppendString, setUrlAppendString] = useState("");

  const handleNext = () => {
    setUrlAppendString(nextQuery);
  };

  const handlePrev = () => {
    setUrlAppendString(prevQuery);
  };

  useEffect(() => {
    setUrlAppendString(
      breeds.length > 0
        ? `/dogs/search?${breeds.map((breed) => `breeds[]=${breed}`).join("&")}`
        : "/dogs/search"
    );
  }, [breeds]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://frontend-take-home-service.fetch.com${urlAppendString}`,
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
          setDogIds(data.resultIds);
          setNextQuery(data.next ?? "");
          setPrevQuery(data.prev ?? "");
        } else {
          console.log(
            "Failed to fetch Dog Ids:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      } finally {
      }
    };
    fetchData();
  }, [urlAppendString]);

  return (
    <div className="mt-6">
      <DogsCard dogIds={dogIds} />

      <div className="flex justify-center mt-[-3rem]">
        <div
          className="px-4 py-2 bg-gray-700 text-white rounded-l cursor-pointer mr-5 mt-[5rem]"
          onClick={handlePrev}
        >
          Prev
        </div>
        <div
          className="px-4 py-2 bg-gray-700 text-white rounded-r cursor-pointer mt-[5rem]"
          onClick={handleNext}
        >
          Next
        </div>
      </div>
    </div>
  );
}

export default Dogs;
