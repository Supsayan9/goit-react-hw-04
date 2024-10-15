import styles from "./LoadMoreBtn.module.css";

const LoadMoreBtn = ({ onClick }) => {
  return (
    <button onClick={onClick} className={styles.loadMoreBtn}>
      Загрузить еще
    </button>
  );
};

export default LoadMoreBtn;
