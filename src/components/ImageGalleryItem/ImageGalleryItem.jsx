import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ image, openModalImage }) => {
  const { id, webformatURL, tags, largeImageURL } = image;
  return (
    <li className={css.ImageGalleryItem} key={id}>
      <img
        id={id}
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={() => openModalImage({ largeImageURL, alt: tags })}
      />
    </li>
  );
};
export default ImageGalleryItem;
