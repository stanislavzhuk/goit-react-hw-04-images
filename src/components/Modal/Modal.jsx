import { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleClick);
  };

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleClick);
  };

  handleClick = e => {
    if (e.code === 'Escape' || (e.currentTarget === e.target)) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props.image;

    return (
      <div className={css.Overlay} onClick={this.handleClick}>
        <div className={css.Modal}>
          <img src={src} alt={alt} />
        </div>
      </div>
    )
  }
}

Modal.propTypes = {
  image: PropTypes.shape({
    src: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;