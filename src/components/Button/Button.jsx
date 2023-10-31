import css from './Button.module.css';

const Button = ({ onButtonLoadMore }) => {
  return (
    <button type="button" className={css.buttonLoad} onClick={onButtonLoadMore}>
      Load more
    </button>
  );
};
export default Button;
