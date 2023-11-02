import React, { useState } from 'react';
import css from './Searchbar.module.css';
import { FiSearch } from 'react-icons/fi';

const Searchbar = ({ handelSearch }) => {
  const [name, setName] = useState(' ');

  const handleInputChange = event => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case 'name':
        setName(value);
        break;

      default:
        return;
    }
  };
  const reset = () => {
    setName(' ');
  };

  const handleSubmit = event => {
    event.preventDefault();
    handelSearch(name);
    reset();
  };

  return (
    <header className={css.searchBar}>
      <form onSubmit={handleSubmit} className={css.searchForm}>
        <button type="submit" className={css.searchFormBtn}>
          <span>
            <FiSearch size="20" color="black" />
          </span>
        </button>

        <input
          className={css.searchformImput}
          name="name"
          type="text"
          onChange={handleInputChange}
          value={name}
          placeholder="Search images and photos"
          required
        />
      </form>
    </header>
  );
};
export default Searchbar;
