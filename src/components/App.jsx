import React, { useEffect, useState } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import fetchImages from '../services/fetch';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuary] = useState(' ');
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [modalData, setModalData] = useState([]);
  const [showLoadMoreBtn, setShowLoadMoreBtn] = useState(false);

  useEffect(() => {
    const fatch = async () => {
      if (query !== ' ') {
        setIsLoading(true);
        try {
          const response = await fetchImages(query, page);

          if (response.totalHits === 0) {
            setShowLoadMoreBtn(false);
            Notiflix.Notify.failure(
              'Sorry, there are no images matching your search query. Please try again.'
            );
            return;
          } else {
            setImages(prevState => [...prevState, ...response.hits]);
          }

          if (response.hits.length > 0 && page === 1) {
            Notiflix.Notify.success(
              `Hooray! We found ${response.totalHits} images.`
            );
          }

          const restOfHits = response.totalHits - 12 * page;
          if (restOfHits > 0) {
            setShowLoadMoreBtn(true);
          } else {
            setShowLoadMoreBtn(false);
            Notiflix.Notify.info(`Sorry,😐...No more images to show`);
          }
        } catch (error) {
          setError(error.massage);
        } finally {
          setIsLoading(false);
        }
      }
    };
    fatch();
  }, [page, query]);

  //modalWimdow
  const openModalImage = largeImageURL => {
    // this.setState({ isOpenModal: true, modalData: largeImageURL });
    setIsOpenModal(true);
    setModalData(largeImageURL);
  };
  const closeModalImage = () => {
    // this.setState({ isOpenModal: false, modalData: null });
    setIsOpenModal(false);
    setModalData(null);
  };

  //serchbar
  const handelSearch = query => {
    // this.setState({ query: query, page: 1, images: [] });
    setQuary(query);
    setPage(1);
    setImages([]);
  };

  // button Load More
  const onButtonLoadMore = () => {
    setPage(prevState => prevState + 1);
    // this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  return (
    <div className={css.app}>
      {error !== null && <p> Ooops...Error massage: {error}</p>}

      <Searchbar handelSearch={handelSearch} />

      <ImageGallery images={images} openModalImage={openModalImage} />

      {isloading && <Loader />}

      {showLoadMoreBtn && <Button onButtonLoadMore={onButtonLoadMore} />}

      {isOpenModal && (
        <Modal closeModalImage={closeModalImage} modalData={modalData} />
      )}
    </div>
  );
};
