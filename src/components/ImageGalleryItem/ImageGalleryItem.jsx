import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, tags, onClick }) => {
  return (
    <li className={css.ImageGalleryItem} onClick={onClick}>
      <img src={image} alt={tags} className={css.ImageGalleryItemImage} />
    </li>
  )
}

ImageGalleryItem.propTypes = {
  image: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ImageGalleryItem;