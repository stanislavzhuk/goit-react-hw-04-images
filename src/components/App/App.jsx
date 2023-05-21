import { useState, useEffect } from 'react';
import fetchImages from 'services/ApiPixabay';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

const App = () => {
  const [searceQuery, setSearceQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [largeImage, setLargeImage] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [totalHits, setTotalHits] = useState(null);

  useEffect(() => {
    if (searceQuery === '') return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchImages(searceQuery, page);
        const { hits, totalHits } = data;

        if (!hits.length) toast.warning('No results were found for your search, please try something else.');

        setImages(state => [...state, ...hits]);
        setLoading(false);
        setTotalHits(totalHits);
      } catch (error) {
        setError(error);
        toast.error(`Sorry, something went wrong. ${error.message}`);
      }
    };

    fetchData();
  }, [searceQuery, page]);

  useEffect(() => {
    if (images.length !== 0) setIsActive(true);
    if (images.length === totalHits) setIsActive(false);
  }, [images.length, totalHits]);
  
  const handleFormSubmit = value => {
    setSearceQuery(value);
    setPage(1);
    setImages([]);
  };

const handleToggleModal = (image = null) => {
  if (image) {
    const largeImage = { url: image.largeImageURL, alt: image.tags };
    setLargeImage(largeImage);
  }

  setShowModal(state => !state);
};

  const handleLoadMoreClick = () => {
    setPage(state => state + 1);
  };

  return (
    <div className={css.App}>
      <Searchbar onSubmit={handleFormSubmit} />
      {error && <p className={css.error}>{error.message}</p>}
      {loading && <Loader />}
      {images.length !== 0 && (
        <ImageGallery
          images={images}
          onClick={handleToggleModal} />
      )}
      {isActive && <Button onClick={handleLoadMoreClick} />}
      {showModal && (
        <Modal
          image={largeImage}
          onClose={handleToggleModal}
        />
      )}
      <ToastContainer />
    </div>
  );
}

export default App;