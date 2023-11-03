import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  tags,
  largeImageURL,
  openModalImage,
  id,
}) => {
  return (
    <li className={css.ImageGalleryItem}>
      <img
        key={id}
        src={webformatURL}
        alt={tags}
        className={css.ImageGalleryItemImage}
        onClick={() => openModalImage({ largeImageURL, alt: tags })}
      />
    </li>
  );
};
export default ImageGalleryItem;
