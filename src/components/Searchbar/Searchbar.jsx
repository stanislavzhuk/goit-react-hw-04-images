import { useState } from "react";
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';

const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');
  
  const handleValueChange = e => {
    const normalizedValue = e.currentTarget.value.trim().toLowerCase();
    setValue(normalizedValue);
  }

  const handleSubmit = e => {
    e.preventDefault();
    if (value === '') {
      toast.warn('Please enter something to search for...');
      return;
    }
    onSubmit(value);
    setValue('');
  }

  return (
    <header className={css.Searchbar}>
      <form className={css.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css.SearchFormButton}>
          <span className={css.SearchFormButtonLabel}>Search</span>
        </button>

        <input
          className={css.SearchFormInput}
          value={value}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleValueChange}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default Searchbar;