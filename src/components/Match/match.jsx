import React, { useEffect, useState } from "react";

function Match(props) {
  const { favorites } = props;
  const [loading, setLoading] = useState(true);
  const [matchedDogId, setMatchedDogId] = useState("");

  const favDogIds = favorites.map((favs) => favs.id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/match",
          {
            method: "POST",
            credentials: "include",
            crossorigin: true,
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(favDogIds),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setMatchedDogId(data.match);
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
  }, [favDogIds]);

  const matchedDogData = favorites.filter((dog) => dog.id === matchedDogId)[0];

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <div className="minWidth: 400, maxWidth: 400, maxHeight: 400">
            <img
              className="cursor-zoom-in height: 45px width: 120%"
              component="img"
              alt={`Dog name ${matchedDogData.name}`}
              src={matchedDogData.img}
            />
            <div>
              <div className="text-center text-2xl">{matchedDogData.name}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Match;
