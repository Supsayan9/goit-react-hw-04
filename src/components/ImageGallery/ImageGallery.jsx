import { useState, useEffect } from "react";
import { fetchImages } from "../Services/api";
import styles from "./ImageGallery.module.css";
import ImageModal from "../ImageModal/ImageModal";

const ImageGallery = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getImages = async () => {
      if (!query) return;
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setTotalPages(Math.ceil(data.total / 12));
      } catch {
        setError("Ошибка загрузки изображений. Попробуйте снова.");
      } finally {
        setIsLoading(false);
      }
    };

    getImages();
  }, [query, page]);

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

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setImages([]);
    setPage(1);
  };

  return (
    <div className={styles.galleryWrapper}>
      {error && <p className={styles.errorMessage}>{error}</p>}
      <form onSubmit={handleSearchSubmit} className={styles.searchWrapper}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Поиск изображений..."
          className={styles.searchInputField}
        />
        <button type="submit" className={styles.searchBtn}>
          Искать
        </button>
      </form>
      {isLoading && <p className={styles.loadingMessage}>Загрузка...</p>}
      <ul className={styles.imageGrid}>
        {images.map((image) => (
          <li
            key={image.id}
            className={styles.gridItem}
            onClick={() => handleImageClick(image)}
          >
            <img src={image.urls.small} alt={image.alt_description} />
          </li>
        ))}
      </ul>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={handleCloseModal} />
      )}
      <div className={styles.paginationWrapper}>
        {page < totalPages && (
          <button onClick={handleNextPage} className={styles.loadMoreBtn}>
            Загрузить еще
          </button>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
