import PropTypes from "prop-types";
import style from './imageGalleryItem.module.css';

const ImageGalleryItem = ({ smallImageURL, alt, largeImageURL, modalImage }) => {
  return (
    <li className={style.imageGalleryItem}>
      <img
        className={style.imageGalleryItemImage}
        src={smallImageURL}
        alt={alt}
        onClick={() => modalImage({ largeImageURL, alt })}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  smallImageURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  modalImage: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
