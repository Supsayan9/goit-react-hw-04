import { useState } from "react";
import { toast } from "react-hot-toast";
import styles from "./SearchBar.module.css";

const SearchBar = ({ onSubmit }) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      toast.error("Введите поисковый запрос");
      return;
    }
    onSubmit(query);
    setQuery("");
  };

  return (
    <header>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Поиск изображений и фотографий"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className={styles.inputField}
        />
        <button type="submit" className={styles.submitBtn}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
