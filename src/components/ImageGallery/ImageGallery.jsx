import css from './ImageGallery.module.css';
const ImageGallery = ({ handleGelleryList, children }) => {
  return (
    <ul className={css.ImageGallery} onClick={handleGelleryList}>
      {children}
    </ul>
  );
};
export default ImageGallery;
