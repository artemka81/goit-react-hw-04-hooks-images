import { useEffect, useState } from 'react';
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

export default function ImageGallery({ searchQuery }) {
  const [status, setStatus] = useState(Status.IDLE);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");
  const [showButton, setShowButton] = useState(false);



  useEffect(() => {
    if (searchQuery === '') {
      return
    }

    if (searchQuery !== query) {
      setQuery(searchQuery);
      setImages([]);
      setPage(1);
      return;
    }


    pixabayAPI.getImages(searchQuery, page)
      .then(
        images => {
          console.log("Fetch", images);
          setImages(prevState => [...prevState, ...images]);
          if (images.length === 0) {
            return Promise.reject(new Error(`${searchQuery}`));
          } else if (images.length < 12) {
            setShowButton(false)
          } else if (images.length === 12) {
            setShowButton(true)
          }
          setStatus(Status.RESOLVED);


        })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });

  }, [searchQuery, query, page]);



  const onClickButton = () => {
    setPage(state => state + 1);

  }

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
              />
            })}
          </ul>
          {showButton && <Button onClickButton={onClickButton} />}

        </>)
      }
    </>
  );
}

