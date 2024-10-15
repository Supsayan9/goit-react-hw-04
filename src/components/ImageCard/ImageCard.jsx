import styles from "./ImageCard.module.css";

const ImageCard = ({ image, onClick }) => {
  return (
    <li className={styles.cardItem} onClick={() => onClick(image)}>
      <div className={styles.cardImageContainer}>
        <img src={image.urls.small} alt={image.alt_description} />
      </div>
    </li>
  );
};

export default ImageCard;
