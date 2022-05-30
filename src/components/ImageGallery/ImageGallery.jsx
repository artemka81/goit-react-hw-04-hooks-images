import { Component } from 'react';
import pixabayAPI from '../../services/pixabayApi';
import { Skeleton } from 'components/Skeleton';
import ErrorSearch from 'components/ErrorSearch';
import ImageGalleryItem from 'components/ImageGalleryItem';
import Modal from 'components/Modal';
import { Button } from 'components/Button';
import style from './imageGallery.module.css';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class ImageGallery extends Component {
  state = {
    status: Status.IDLE,
    images: [],
    page: 1,
    error: null,
    modalImg: { url: null, alt: null },
    showButton: false,
    showModal: false,
  }

  componentDidUpdate(prevProps, prevState) {
    const prevSearchQuery = prevProps.searchQuery;
    const nextSearchQuery = this.props.searchQuery;
    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevSearchQuery !== nextSearchQuery) {
      this.setState({ images: [], page: 1 });
    }
    if ((prevSearchQuery !== nextSearchQuery && nextPage === 1) ||
      prevPage !== nextPage) {
      this.setState({ status: Status.PENDING });
      this.fetchImages();
    }
    if (this.state.images.length - prevState.images.length === 12) {
      this.setState({ showButton: true });
    }
  }

  fetchImages = () => {
    pixabayAPI.getImages(this.props.searchQuery, this.state.page)
      .then((images) => {
        if (images.length === 0) {
          return Promise.reject(new Error(`${this.props.searchQuery}`));
        } else if (images.length < 12) {
          alert("No more results found");
          this.setState({ showButton: false });
        }
        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...images],
            status: Status.RESOLVED,
          };
        });
      })
      .catch(error => this.setState(
        { error, status: Status.REJECTED }
      ))
      .finally(() => {
        this.scrollDown();
      });
  }
  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleModalImage = ({ largeImageURL: url, alt }) => {
    this.setState({ modalImg: { url, alt } });
    this.toggleModal();
  };

  onClickButton = () => {
    this.setState((state) => ({
      page: state.page + 1,
    }));
    this.scrollDown();
  };

  scrollDown = () => {
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth',
      });
    }, 500);
  };

  render() {
    const { status, error, images, showModal, showButton } = this.state;
    return (
      <>
        {status === Status.IDLE && <></>}
        {status === Status.REJECTED && <ErrorSearch message={error.message} />}
        {status === Status.PENDING && <Skeleton />}
        {status === Status.RESOLVED && (
          <>
            <ul className={style.imageGallery} >
              {images.map(({ id, webformatURL, largeImageURL, tags }) => {
                return <ImageGalleryItem
                  key={id}
                  smallImageURL={webformatURL}
                  largeImageURL={largeImageURL}
                  alt={tags}
                  modalImage={this.handleModalImage}
                />
              })}
            </ul>
            {showButton && <Button onClickButton={this.onClickButton} />}
          </>)
        }

        {showModal && (
          <Modal onCloseModal={this.toggleModal}>
            <img src={this.state.modalImg.url} alt={this.state.modalImg.alt} />
          </Modal>
        )}
      </>
    )
  }
}


