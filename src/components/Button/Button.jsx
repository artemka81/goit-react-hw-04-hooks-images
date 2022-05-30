import style from './button.module.css';
import PropTypes from "prop-types";
export const Button = ({ onClickButton }) => {
  return (
    <button
      type="button"
      className={style.button}
      onClick={onClickButton}>
      Load more
    </button>
  );
};


Button.propTypes = {
  onClickButton: PropTypes.func.isRequired,
};
