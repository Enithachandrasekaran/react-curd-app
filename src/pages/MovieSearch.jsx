import { useState } from "react";

function stripHtml(html) {
  const div = document.createElement("div");
  div.innerHTML = html;
  return div.textContent || div.innerText || "";
}

function MovieSearch() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) {
      setError("Enter a movie or show name.");
      setMovies([]);
      return;
    }

    setLoading(true);
    setError("");
    setMovies([]);
    setSearched(true);

    try {
      const res = await fetch(
        `https://api.tvmaze.com/search/shows?q=${encodeURIComponent(trimmed)}`
      );
      if (!res.ok) throw new Error("Search failed.");
      const data = await res.json();

      if (!data.length) {
        setError(`No results for "${trimmed}".`);
        setLoading(false);
        return;
      }

      setMovies(
        data.slice(0, 12).map(({ show }) => ({
          id: show.id,
          title: show.name,
          rating: show.rating?.average,
          image: show.image?.medium,
          genres: show.genres?.join(", ") || "—",
          summary: show.summary ? stripHtml(show.summary) : "",
        }))
      );
    } catch {
      setError("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page page-full">
      <div className="card card-wide">
        <h2>Movie Search App</h2>
        <p className="page-desc">Practice: API integration, loading states</p>

        <form className="input-group" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search movies or TV shows..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" disabled={loading}>
            {loading ? "Searching..." : "Search"}
          </button>
        </form>

        {error && <p className="field-error">{error}</p>}
        {loading && <p className="empty-msg">Loading movies...</p>}

        {!loading && movies.length > 0 && (
          <div className="movie-grid">
            {movies.map((movie) => (
              <article key={movie.id} className="movie-card">
                {movie.image ? (
                  <img src={movie.image} alt={movie.title} />
                ) : (
                  <div className="movie-no-image">No poster</div>
                )}
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p className="movie-rating">
                    Rating:{" "}
                    {movie.rating != null ? (
                      <strong>{movie.rating}/10</strong>
                    ) : (
                      <span>N/A</span>
                    )}
                  </p>
                  <p className="movie-genres">{movie.genres}</p>
                  {movie.summary && (
                    <p className="movie-summary">
                      {movie.summary.slice(0, 120)}
                      {movie.summary.length > 120 ? "…" : ""}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && searched && movies.length === 0 && !error && (
          <p className="empty-msg">No movies to display.</p>
        )}
      </div>
    </div>
  );
}

export default MovieSearch;
