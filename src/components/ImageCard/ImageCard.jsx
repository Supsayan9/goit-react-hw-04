import styles from "./ImageCard.module.css";
import PropTypes from "prop-types";

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={styles.cardItem}>
      <div className={styles.cardImageContainer}>
        <img
          src={image.urls.small}
          alt={image.alt_description}
          onClick={() => onClick(image)}
        />
      </div>
    </li>
  );
};

ImageCard.propTypes = {
  image: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
