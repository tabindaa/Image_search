import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { BASE_URL, PER_PAGE_COUNT } from "./utils/constants";
import Button from "./Button";

function App() {
  const searchInputRef = useRef();
  const [images, setImages] = useState([]);
  const [total_pages, setTotal_pagess] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    fetchImages();
  }, [pageNumber]);

  const fetchImages = async () => {
    const searchQuery= searchInputRef.current.value || 'random'
    const { data } = await axios.get(
      `${BASE_URL}&query=${
        searchQuery
      }&page=${pageNumber}&per_page=${PER_PAGE_COUNT}&client_id=${
        import.meta.env.VITE_ACCESS_KEY
      }`
    );
    setImages(data.results);
    setTotal_pagess(data.total_pages);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchImages();
  };

  const handleButtonClick = (text) => {
    searchInputRef.current.value = text;
    fetchImages();
  };
  const handlePreviousButtonClick = () => {
    if (pageNumber < 2) return;
    setPageNumber(pageNumber - 1);
    fetchImages();
  };
  const handleNextButtonClick = () => {
    if (pageNumber == total_pages) return;
    setPageNumber(pageNumber + 1);
    fetchImages();
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-center border p-12 my-4 bg-indigo-400 text-5xl text-slate-700">
        Image Search
      </h1>
      <div className="m-4 flex justify-center">
        <form onSubmit={handleSearch} className="">
          <input
            className="border rounded p-2 w-96"
            ref={searchInputRef}
            type="text"
            placeholder="Type something to search.."
          />
        </form>
      </div>
      <div className="flex justify-center">
        <Button label={"nature"} handleButtonClick={handleButtonClick}></Button>
        <Button label={"birds"} handleButtonClick={handleButtonClick}></Button>
        <Button
          label={"science"}
          handleButtonClick={handleButtonClick}
        ></Button>
        <Button label={"lamps"} handleButtonClick={handleButtonClick}></Button>
      </div>
      <div className="grid gap-x-4 gap-y-2 grid-cols-2 md:grid-cols-4 lg:grid-cols-6 my-10">
        {images.map((img) => (
          <img
            key={img.id}
            className="w-72 h-44 shadow hover:shadow-2xl rounded"
            src={img.urls.small}
          />
        ))}
      </div>
      {images?.length > 1 && (
        <p className="flex justify-center">
          <button
            className={
              pageNumber < 2
                ? 'opacity-30 w-24 mx-2 p-2 rounded bg-indigo-200 text-slate-700"}'
                : "w-24 mx-2 p-2 rounded bg-indigo-200 text-slate-700"
            }
            disabled={pageNumber < 2}
            onClick={handlePreviousButtonClick}
          >
            Previous
          </button>
          <button
            className={
              pageNumber == total_pages
                ? 'opacity-30 w-24 mx-2 p-2 rounded bg-indigo-200 text-slate-700"}'
                : "w-24 mx-2 p-2 rounded bg-indigo-200 text-slate-700"
            }
            disabled={pageNumber == total_pages}
            onClick={handleNextButtonClick}
          >
            Next
          </button>
        </p>
      )}
    </div>
  );
}

export default App;
