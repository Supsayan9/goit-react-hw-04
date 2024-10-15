import styles from "./ImageGallery.module.css";
import ImageModal from "../ImageModal/ImageModal";
import PropTypes from "prop-types";

const ImageGallery = ({
  images,
  onImageClick,
  selectedImage,
  onCloseModal,
}) => {
  return (
    <div className={styles.galleryWrapper}>
      <ul className={styles.imageGrid}>
        {images.map((image) => (
          <li
            key={image.id}
            className={styles.gridItem}
            onClick={() => onImageClick(image)}
          >
            <img src={image.urls.small} alt={image.alt_description} />
          </li>
        ))}
      </ul>
      {selectedImage && (
        <ImageModal image={selectedImage} onClose={onCloseModal} />
      )}
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
  selectedImage: PropTypes.object,
  onCloseModal: PropTypes.func.isRequired,
};

export default ImageGallery;
