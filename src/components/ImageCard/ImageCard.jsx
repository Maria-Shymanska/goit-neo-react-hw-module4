import css from "./ImageCard.module.css";

const ImageCard = ({ hit }) => {
  return (
    <div>
      <img
        className={css.card}
        src={hit.urls.small}
        alt={hit.alt_description}
      />
    </div>
  );
};

export default ImageCard;
