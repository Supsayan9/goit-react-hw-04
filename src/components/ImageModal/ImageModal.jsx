import ReactModal from "react-modal";
import PropTypes from "prop-types";
import styles from "./ImageModal.module.css";

ReactModal.setAppElement("#root");

const ImageModal = ({ image, isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      className={styles.modal}
      overlayClassName={styles.overlay}
    >
      <div>
        <img
          src={image.urls.regular}
          alt={image.alt_description}
          className={styles.image}
        />
        <h2>{image.description || "No description"}</h2>
        <p>Автор: {image.user.name}</p>
        <p>Лайки: {image.likes}</p>
        <button onClick={onClose} className={styles.closeBtn}>
          Закрыть
        </button>
      </div>
    </ReactModal>
  );
};

ImageModal.propTypes = {
  image: PropTypes.object.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ImageModal;
