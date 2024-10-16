import styles from "./ImageGallery.module.css";
import PropTypes from "prop-types";

const ImageGallery = ({ images, onImageClick }) => {
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
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.array.isRequired,
  onImageClick: PropTypes.func.isRequired,
};

export default ImageGallery;
