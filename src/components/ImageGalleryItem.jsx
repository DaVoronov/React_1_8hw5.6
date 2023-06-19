const ImageGalleryItem = ({ imageUrl, alt, onClick }) => {
  return (
    <li className="ImageGalleryItem">
      <img
        src={imageUrl}
        alt={alt}
        className="ImageGalleryItem-image"
        onClick={onClick}
      />
    </li>
  );
};

export default ImageGalleryItem;
