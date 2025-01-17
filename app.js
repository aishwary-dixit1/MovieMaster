//const OMDB_api_key = api_key;

const OMDB_api_key = window.env.API_KEY;

console.log('API Key available:', !!window.env.API_KEY);

const movieBlock = document.querySelector(".movie-block");
const searchInput = document.querySelector("#input");
const searchButton = document.querySelector("#search-button");
const movieTitle = document.querySelector("#movie-name-heading");
const movieTimeline = document.querySelector("#movie-timeline-heading");
const starRatings = document.querySelector("#star-ratings");
const rottenTomatoes = document.querySelector("#rotten-tomatoes");
const moviePoster = document.querySelector("#movie-poster-img");
const movieDescription = document.querySelector("#movie-description");
const movieDirector = document.querySelector("#directors");
const movieWriters = document.querySelector("#writers");
const movieStars = document.querySelector("#cast");

const ratingFigure = document.querySelector("#rating-figure");

const genreDetails = document.querySelector("#genre-details");

function convertMinToHM(minuteStr) {
    const minutes = parseInt(minuteStr.replace(/\D/g, ''), 10);
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
}

searchButton.addEventListener("click",  async () => {
    const movieInput = (searchInput.value);
    const movieSearch = movieInput.trim().replace(/\s+/g, '-').toLowerCase();

    const movie_response = await fetch(`http://www.omdbapi.com/?t=${movieSearch}&apikey=${api_key}`);

    const movie_data = await movie_response.json();

    if(movie_data.Response === "False") {
        alert("Movie Not Found...");
        return;
    } else {
        console.log(movie_data);
            genreDetails.replaceChildren();
            movieTitle.innerText = movie_data.Title;

            movieTimeline.innerText = movie_data.Year + " - " + movie_data.Rated + " - " + convertMinToHM(movie_data.Runtime);

            moviePoster.src = movie_data.Poster;
            starRatings.innerText = movie_data.Ratings[0].Value;
            ratingFigure.innerText = "Rating (" + ((Number((movie_data.imdbVotes).replace(/,/g, "")))/1000).toFixed(0) + "K)";
            try {
                rottenTomatoes.innerText = movie_data.Ratings[1].Value;
            } catch(error) {
                rottenTomatoes.innerText = "-%";
            }
            
            movieDescription.innerText = movie_data.Plot;
            movieDirector.innerHTML = movie_data.Director;
            movieWriters.innerHTML = (movie_data.Writer).replace(/, /g, " - ");
            movieStars.innerHTML = (movie_data.Actors).replace(/, /g, " - ");


            const movieGenre = movie_data.Genre;
            const movieGenreArray = movieGenre.split(", ");
            movieGenreArray.forEach( (genre) => {
                let categoryDiv = document.createElement("div");
                categoryDiv.classList.add("categories");
                categoryDiv.textContent = genre; 
                genreDetails.appendChild(categoryDiv);
            });
            movieBlock.style ="display: block";
    }
});
 