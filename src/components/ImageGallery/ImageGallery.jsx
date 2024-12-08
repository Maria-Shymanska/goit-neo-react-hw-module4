import ImageCard from "../ImageCard/ImageCard";
import css from "./ImageGallery.module.css";

const ImageGallery = ({ hits, onImageClick }) => {
  return (
    <ul className={css.gallery}>
      {hits.map((hit) => (
        <li key={hit.slug} onClick={() => onImageClick(hit)}>
          <ImageCard hit={hit} />
        </li>
      ))}
    </ul>
  );
};

export default ImageGallery;
