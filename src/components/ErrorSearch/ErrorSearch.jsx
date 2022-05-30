import style from './errorSearch.module.css';
import PropTypes from 'prop-types';
import errorImg from './ErrorImg.png';

const ErrorSearch = ({ message }) => (
  <div className={style.errorSearch}>
    <p>
      К сожаленью, по запросу <mark>«{message}»</mark> фото не найдено
    </p>
    <img src={errorImg} alt="ErrorImg" />
  </div>
);

ErrorSearch.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ErrorSearch;
