import { Component } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BiSearch } from 'react-icons/bi';
import style from './searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleInput = e => {
    this.setState({ searchQuery: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.searchQuery.trim() === '') {
      toast.info('Укажите Ваш запрос', {
        theme: 'dark',
        position: 'top-center',
        autoClose: 1000,
        hideProgressBar: true,
      });
      return;
    }

    this.props.onSubmit(this.state.searchQuery);
    this.setState({ searchQuery: '' });
  };

  render() {
    return (
      <header className={style.searchbar}>
        <form className={style.searchForm} onSubmit={this.handleSubmit}>
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
            value={this.state.searchQuery}
            onChange={this.handleInput}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
