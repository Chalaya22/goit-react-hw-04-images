import React, { Component } from 'react';
import Notiflix from 'notiflix';
import css from './App.module.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import Button from './Button/Button';

import fetchImages from '../services/fetch';
import ImageGalleryItem from './ImageGalleryItem/ImageGalleryItem';

export class App extends Component {
  state = {
    // modalData: null,
    error: null,
    images: [],
    query: '',
    page: 1,

    isloading: false,

    isOpenModal: false,
    modalData: [],

    showLoadMoreBtn: false,
  };
  async componentDidUpdate(_, prevState) {
    if (
      prevState.page !== this.state.page ||
      prevState.query !== this.state.query
    ) {
      this.setState({ isLoading: true });
      try {
        const response = await fetchImages(this.state.query, this.state.page);
        this.setState(prevState => ({
          images: [...prevState.images, ...response],
        }));

        if (response.length === 0) {
          this.setState({ showLoadMoreBtn: false });
          Notiflix.Notify.warning('Sorry,🥶 no images for your request...');
        }
      } catch (error) {
        this.setState({ error });
        Notiflix.Notify.failure('ERROR ..😢😢😢..try again later');
      } finally {
        this.setState({ isLoading: false });
      }
    }
  }

  //modalWimdow
  openModalImage = largeImageURL => {
    this.setState({ isOpenModal: true, modalData: largeImageURL });
  };
  closeModalImage = () => {
    this.setState({ isOpenModal: false, modalData: null });
  };

  //serchbar
  handelSearch = query => {
    this.setState({ query: query, page: 1, images: [] });
  };

  // button Load More
  onButtonLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    return (
      <div className={css.app}>
        {this.state.error !== null && (
          <p> Ooops...Error massage: {this.state.error}</p>
        )}
        <Searchbar handelSearch={this.handelSearch} />

        <ImageGallery>
          {this.state.images.map(image => (
            <ImageGalleryItem
              image={image}
              key={image.id}
              openModalImage={this.openModalImage}
            />
          ))}
        </ImageGallery>

        {this.state.isLoading && <Loader />}

        {this.state.images.length > 0 && (
          <Button onButtonLoadMore={this.onButtonLoadMore} />
        )}

        {this.state.isOpenModal && (
          <Modal
            closeModalImage={this.closeModalImage}
            modalData={this.state.modalData}
          />
        )}
      </div>
    );
  }
}
