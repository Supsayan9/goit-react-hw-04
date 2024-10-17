import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/SearchBar/SearchBar";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import LoaderComponent from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import { fetchImages } from "./components/Services/api";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;

      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(Math.ceil(data.total / 12));
      } catch (err) {
        setError("Error fetching images. Please try again.");
        console.error("Error fetching images:", err);
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

  const handleSearchSubmit = (newQuery) => {
    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <Toaster />
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading && <LoaderComponent />}
      {error && <ErrorMessage message={error} />}
      <ImageGallery
        images={images}
        onImageClick={handleImageClick}
        page={page}
        totalPages={totalPages}
        onNextPage={handleNextPage}
      />
      {page < totalPages && !isLoading && !error && (
        <LoadMoreBtn onClick={handleNextPage} />
      )}
      {selectedImage && (
        <ImageModal
          image={selectedImage}
          isOpen={!!selectedImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
};

export default App;
