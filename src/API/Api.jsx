import { useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "./Api.css";

function Api() {
    const [generatedAPI, setGeneratedAPI] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchAPI = () => {
        if (!searchTerm.trim()) return;
        
        setLoading(true);
        setError(null);
        
        Axios.get(`https://www.omdbapi.com/?apikey=15d90a23&s=${searchTerm}`)
            .then((response) => {
                if (response.data.Response === "False") {
                    setError(response.data.Error || "No movies found");
                    setGeneratedAPI(null);
                } else {
                    setGeneratedAPI(response.data.Search);
                }
            })
            .catch(err => {
                setError("Failed to fetch movies. Please try again.");
                console.error(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            fetchAPI();
        }
    }

    return (
        <div className="main-container">
            <h1>Movie Explorer</h1>
            
            <div className="search-container">
                <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Search for movies..."
                    className="input-here"
                />
                <button onClick={fetchAPI} disabled={loading || !searchTerm.trim()}>
                    {loading ? 'Searching...' : 'Search'}
                </button>
            </div>

{/* conditional rendering */}
{/* if there is error, display error message */}
{/* if there is loading, display loading spinner */}
{/* if not, renders nothing */}
            {error && (
                <div className="error-message">
                    <p>{error}</p>
                </div>
            )}

            {loading && (
                <div className="loading-spinner">
                    <div className="spinner"></div>
                </div>
            )}

            {generatedAPI && (
                <div className="movie-grid">
                    {generatedAPI.map(movie => (
                        <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card">
                            <img 
                                src={movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster"} 
                                alt={movie.Title} 
                            />
                            <div className="movie-info">
                                <h3>{movie.Title}</h3>
                                <p>{movie.Year}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default Api;