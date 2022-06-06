import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';
import style from './searchbar.module.css';


export default function Searchbar({ onSubmit }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = e => {
    setSearchQuery(e.currentTarget.value);
  }
  const handleSubmit = e => {
    e.preventDefault();
    if (searchQuery.trim() === '') {
      toast.info('Укажите Ваш запрос', {
        theme: 'dark',
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }
    onSubmit(searchQuery);
    setSearchQuery('');
  }
  return (
    <header className={style.searchbar}>
      <form className={style.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={style.searchFormButton}>
          <BiSearch />
          <span className={style.searchFormButtonLabel}>Search</span>
        </button>

        <input
          className={style.searchFormInput}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchQuery}
          onChange={handleInput}
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
