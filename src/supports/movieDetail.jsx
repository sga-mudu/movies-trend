
import { useNavigate, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import './movieDetail.css';

function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`https://www.omdbapi.com/?apikey=15690a23&i=${id}`)
      .then((response) => {
        setMovie(response.data);
      });
  }, [id]);

  if (!movie){
    return <div className="loading-spinner">
                <div className="spinner"></div>
            </div>;
  }
    

  return (
    <>
        <div className="container">
            <button onClick={() => navigate((-1))}>
                Go back
            </button>

            <div className="second-container">
                <h1>{movie.Title}</h1>
                <p>{movie.Plot}</p>
                <img src={movie.Poster} alt={movie.Title} />
            </div>
        </div>
    </>
  );
}
export default MovieDetail;