import { useEffect, useState } from "react";
import "./ShowsForm.css";
import { updateShow, getOneShow } from "../../api/fetch";
import { useParams, useNavigate } from "react-router-dom";
import ErrorMessage from "../errors/ErrorMessage";

export default function ShowsForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loadingError, setLoadingError] = useState(false);
  const [show, setShow] = useState({
    type: "",
    title: "",
    country: "",
    dateAdded: "",
    description: "",
    duration: "",
    listedIn: "",
    rating: "",
    releaseYear: "",
  });

  function handleSubmit(event) {
    event.preventDefault();
    updateShow(id, show).then(() =>
      navigate(`/shows/${id}`).catch((error) => setLoadingError(true))
    );
  }

  function handleTextChange(event) {
    setShow({
      ...show,
      [event.target.id]: event.target.value,
    });
  }
  useEffect(() => {
    getOneShow(id)
      .then((res) => {
        setShow({ ...res });
        setLoadingError(false);
      })
      .catch((error) => setLoadingError(true));
  }, [id]);
  return loadingError ? (
    <ErrorMessage />
  ) : (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={show.title}
        onChange={handleTextChange}
      />

      <label htmlFor="description">Description:</label>
      <input
        type="text"
        id="description"
        value={show.description}
        onChange={handleTextChange}
      />

      <label htmlFor="type">Type</label>
      <input
        type="text"
        id="type"
        value={show.type}
        onChange={handleTextChange}
      />

      <label htmlFor="rating">Rating:</label>
      <input
        type="text"
        id="rating"
        value={show.rating}
        onChange={handleTextChange}
      />

      <label htmlFor="listedIn">Listed in</label>
      <input
        type="text"
        id="listedIn"
        value={show.listedIn}
        onChange={handleTextChange}
      />

      <label htmlFor="duration">Duration</label>
      <input
        type="text"
        id="duration"
        value={show.duration}
        onChange={handleTextChange}
      />

      <label htmlFor="releaseYear">Release Year</label>
      <input
        type="text"
        id="releaseYear"
        value={show.releaseYear}
        onChange={handleTextChange}
      />

      <label htmlFor="country">Country</label>
      <input
        type="text"
        id="country"
        value={show.country}
        onChange={handleTextChange}
      />

      <label htmlFor="dateAdded">Date added:</label>
      <input
        type="text"
        id="dateAdded"
        value={show.dateAdded}
        onChange={handleTextChange}
      />

      <br />

      <input type="submit" />
    </form>
  );
}
