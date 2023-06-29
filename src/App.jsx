import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";
import axios from "axios";

import ImageGallery from "./components/ImageGallery";
import Searchbar from "./components/Searchbar";
import Button from "./components/Button";
import Modal from "./components/Modal";

const API_KEY = "37276677-272c3b8b85cdae0973e03a6b6";

const App = () => {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleSearch = (query) => {
    setQuery(query);
    setPage(1);
    setImages([]);
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (!query) {
      return;
    }

    const fetchImages = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(
          `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent(
            query
          )}&image_type=photo&per_page=12&page=${page}`
        );
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      } catch (error) {
        console.error("Error fetching images:", error);
      }

      setIsLoading(false);
    };

    fetchImages();
  }, [query, page]);

  const scrollDown = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (images.length > 0) {
      scrollDown();
    }
  }, [images]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />

      {isLoading ? (
        <RotatingLines width={80} />
      ) : (
        <>
          <ImageGallery images={images} onImageClick={handleImageClick} />

          {images.length > 0 && <Button onClick={handleLoadMore} />}

          {selectedImage && (
            <Modal imageUrl={selectedImage} onClose={handleCloseModal} />
          )}
        </>
      )}
    </div>
  );
};

export default App;
