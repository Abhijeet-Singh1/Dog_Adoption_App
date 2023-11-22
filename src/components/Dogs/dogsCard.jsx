import React, { useEffect, useState } from "react";
import ImageModal from "../ImageModal/imageModal";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

function DogsCard(props) {
  const { dogIds, favorites, dogsData, setDogsData, setFavorites } = props;
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleMouseEnter = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCard(null);
  };

  const openModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedImage(null);
    document.body.style.overflow = "auto";
  };

  const handleFavoriteList = (dogObj) => {
    const found = favorites.find((dog) => dog.id === dogObj.id);
    if (found) {
      setFavorites(favorites.filter((dog) => dog.id !== dogObj.id));
    } else {
      setFavorites([...favorites, dogObj]);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs",
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(dogIds),
          }
        );
        if (response.ok) {
          const data = await response.json();
          setDogsData(data);
        } else {
          console.log(
            "Failed to fetch Dog Ids:",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during fetch:", error);
      }
    };
    fetchData();
  }, [dogIds, setDogsData]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mx-16 sm:mx-auto">
      {dogsData.map((dogInfo) => (
        <Card key={dogInfo.id} sx={{ maxWidth: 300, maxHeight: 400 }}>
          <CardMedia
            className="cursor-zoom-in"
            component="img"
            alt={`Dog name ${dogInfo.name}`}
            image={dogInfo.img}
            sx={{
              height: "45%",
              width: "100%",
            }}
            onClick={() => openModal(dogInfo.img)}
          />
          <CardContent>
            <Typography
              gutterBottom
              variant="h5"
              component="div"
              className="text-left"
            >
              {dogInfo.name}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="text-left"
            >
              Breed: {dogInfo.breed}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="text-left"
            >
              Age: {dogInfo.age}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              className="text-left"
            >
              Zip Code: {dogInfo.zip_code}
            </Typography>
          </CardContent>
          <CardActions className="mt-7 justify-center">
            <Button
              className={`cursor-pointer ${
                hoveredCard === dogInfo.id ? "bg-gray-900" : ""
              }`}
              size="medium"
              onMouseEnter={() => handleMouseEnter(dogInfo.id)}
              onMouseLeave={handleMouseLeave}
              onClick={() => {
                handleFavoriteList(dogInfo);
              }}
              style={{ color: "black" }}
            >
              <div
                className={`${
                  favorites.some((dog) => dog.id === dogInfo.id)
                    ? "text-red-500"
                    : "text-black"
                }`}
              >
                {favorites.some((dog) => dog.id === dogInfo.id)
                  ? "Added to favorite"
                  : "Add to favorite"}
              </div>

              <svg
                className={`h-5 w-5 ${
                  favorites.some((dog) => dog.id === dogInfo.id)
                    ? "text-red-500"
                    : "text-black"
                } ml-1 mb-1`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill={
                  favorites.some((dog) => dog.id === dogInfo.id)
                    ? "red"
                    : "none"
                }
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                {" "}
                <path
                  d={
                    hoveredCard === dogInfo.id
                      ? "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                      : "M12 20l-7 -7a4 4 0 0 1 6.5 -6a.9 .9 0 0 0 1 0a4 4 0 0 1 6.5 6l-7 7"
                  }
                />
              </svg>
            </Button>
          </CardActions>
          {selectedImage && (
            <ImageModal imageUrl={selectedImage} onClose={closeModal} />
          )}
        </Card>
      ))}
    </div>
  );
}

export default DogsCard;
