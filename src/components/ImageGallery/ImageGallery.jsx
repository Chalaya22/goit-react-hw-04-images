import css from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ images, openModalImage }) => (
  <ul className={css.ImageGallery}>
    {images.map(({ id, webformatURL, largeImageURL, tags }) => {
      return (
        <ImageGalleryItem
          key={id}
          webformatURL={webformatURL}
          openModalImage={openModalImage}
          largeImageURL={largeImageURL}
          tags={tags}
        />
      );
    })}
  </ul>
);

export default ImageGallery;
