import { Component } from 'react';
import pixabayAPI from '../../services/pixabayApi';

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
  }

  fetchImages = () => {
    pixabayAPI.getImages(this.props.searchQuery, this.state.page)
      .then((images) => {
        if (images.hits.length === 0) {
          return Promise.reject(new Error(`Фото по вашему запросу ${this.props.searchQuery} не найдено`));

        } else if (images.hits.length < 12) {
          alert("No more results found");
        }
        this.setState((prevState) => {
          return {
            images: [...prevState.images, ...images.hits],
            status: Status.RESOLVED,
          };
        });
      })
      .catch(error => this.setState(
        {
          error,
          status: Status.REJECTED
        }));
  }




  render() {
    const { status, error } = this.state;
    return (
      <>
        {status === Status.IDLE && <div>Начальное состояние</div>}
        {status === Status.REJECTED && <div>{error.message}</div>}
        {status === Status.PENDING && <div>Загрузка скелетона</div>}
        {status === Status.RESOLVED && <div>Галлерея загружена</div>}

      </>
    )
  }


}


