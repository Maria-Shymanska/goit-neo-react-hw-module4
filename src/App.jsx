import { useState, useEffect } from "react";

import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import fetchImagesQuery from "./services/api.js";
import { Toaster } from "react-hot-toast";
import Loader from "./components/Loader/Loader";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import ImageModal from "./components/ImageModal/ImageModal";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn.jsx";
import NotFoundMessage from "./components/NotFoundMessage/NotFoundMessage.jsx";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";

const App = () => {
  const [hits, setHits] = useState([]);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (query) => {
    setQuery(query);
    setPage(1);
    setHits([]);
  };

  const getNextPage = async () => {
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchImagesQuery(query, page);
        if (page === 1) {
          setHits([...data.results]);
          setTotalPages(data.total_pages);
        } else {
          setHits((prevHits) => [...prevHits, ...data.results]);
        }
      } catch {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    if (query) {
      fetchImages();
    }
  }, [query, page]);

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <>
      <div>
        <Toaster />
      </div>
      <SearchBar onSubmit={handleSearch} />
      {hits.length > 0 && <ImageGallery hits={hits} onImageClick={openModal} />}
      {isLoading && <Loader />}
      {totalPages > page && !isLoading && <LoadMoreBtn onClick={getNextPage} />}
      {error && <ErrorMessage />}
      {query && hits.length === 0 && !isLoading && !error && (
        <NotFoundMessage query={query} />
      )}
      {selectedImage && (
        <ImageModal onClose={closeModal} image={selectedImage} />
      )}
    </>
  );
};
export default App;
