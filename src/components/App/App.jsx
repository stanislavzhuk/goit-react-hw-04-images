import { Component } from 'react';
import fetchImages from 'services/ApiPixabay';
import Searchbar from 'components/Searchbar/Searchbar';
import ImageGallery from 'components/ImageGallery/ImageGallery';
import Modal from 'components/Modal/Modal';
import Loader from 'components/Loader/Loader';
import Button from 'components/Button/Button';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './App.module.css';

const STATUS = {
  IDLE: 'IDLE',
  PENDING: 'PENDING',
  RESOLVED: 'RESOLVED',
  REJECTED: 'REJECTED',
};

class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    images: [],
    status: STATUS.IDLE,
    error: null,
    largeImage: {},
    showModal: false,
    isActive: false,
  };

  async componentDidUpdate(pervProps, prevState) {
    const { searchQuery, page, images } = this.state;
    if (prevState.searchQuery !== searchQuery || prevState.page !== page) {
      this.setState({ status: STATUS.PENDING });

      try {
        const { hits, totalHits
        } = await fetchImages(searchQuery, page);
        if (!hits.length) {
          toast.warning('No results were found for your search, please try something else.')
        }
        if (images.length + 12 <= totalHits) {
          this.setState({ isActive: true });
        } else {
            this.setState({ isActive: false });
          }
        this.setState(({ images }) => ({
          images: [...images, ...hits],
          status: STATUS.RESOLVED,
        }));
      } catch (error) {
        this.setState({
          status: STATUS.REJECTED,
          error: new Error(`Unable to find image for category ${searchQuery}`),
        });
        toast.error(`Sorry something went wrong. ${error.message}`);
      }
    }
  };

  resetState = () => {
    this.setState({
      searchQuery: '',
      page: 1,
      images: [],
      status: STATUS.IDLE,
      error: null,
      largeImage: {},
      showModal: false,
      isActive: false,
    })
  };

  handleFormSubmit = searchQuery => {
    if (this.state.searchQuery === searchQuery) {
      return;
    }
    this.resetState();
    this.setState({ searchQuery });
  };

  handleToggleModal = (image = null) => {
    if (image) {
      const largeImage = { src: image.largeImageURL, alt: image.tags };
      this.setState({ largeImage, showModal: true });
    } else {
      this.setState({ showModal: false });
    }
  };

  handleLoadMoreClick = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  
  render() {
    const { images, showModal, largeImage, status, isActive, error } = this.state;

    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {status === STATUS.PENDING && <Loader />}
        {status === STATUS.RESOLVED && (
          <ImageGallery images={images} onClick={this.handleToggleModal} />
        )}
        {status === STATUS.REJECTED && (
          <div className={css.error}>
            <h1>{error.message}</h1>
          </div>
        )}
        {isActive && <Button onClick={this.handleLoadMoreClick} />}
        {showModal && (
          <Modal
            image={largeImage}
            onClose={this.handleToggleModal}
          />
        )}
        <ToastContainer />
      </div>
    );
  }
}

export default App;