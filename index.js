const moviesEl = document.querySelector(".movies");
const searchForm = document.querySelector("#search__form");
const searchIcon = document.getElementById("search-icon");

let data = [];

async function main(filter) {
  if (filter === "OLD_TO_NEW") {
    data.sort((a, b) => a.release_date - b.release_date);
  } else if (filter === "NEW_TO_OLD") {
    data.sort((a, b) => b.release_date - a.release_date);
  }

  // Function to render movies data to the DOM
  const renderMovies = (data) => {
    moviesEl.innerHTML = data
      .slice(0, 8)
      .map(
        (movie) =>
          `<div class="movie">
            <figure class="movie__wrapper">
              <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" class="movie__img" alt="" /> 
              <h5 class="movie__hd">HD</h5>
            </figure>
            <h2 class="movie__title">${movie.original_title}</h2>
            <h4 class="movie__year">${movie.release_date}</h4>
          </div>`
      )
      .join("");
  };

  // Function to show loading state
  const showLoadingState = () => {
    moviesEl.innerHTML = `<div class="movies movies__loading">
      <i class="fas fa-spinner movies__loading--spinner"></i>
    </div>`;
  };

  // Function to fetch popular movies data
  const fetchPopularMovies = async () => {
    showLoadingState(); // Show loading state
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=efb48bf9762efb858b54c3ebab5b98b7"
    );
    data = await response.json(); // Assign fetched data to the data variable
    console.log(data);
    if (data.results) {
      renderMovies(data.results);
    }
  };

  // Function to search movies data by title
  const searchMovie = async (event) => {
    if (event) {
      event.preventDefault();
    }
    showLoadingState(); // Show loading state
    const formData = new FormData(document.getElementById("search__form"));
    const query = formData.get("searchQuery");

    if (query) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=efb48bf9762efb858b54c3ebab5b98b7&query=${query}`
      );
      data = await response.json(); // Assign fetched data to the data variable
      console.log(data);
      if (data.results) {
        renderMovies(data.results);
      }
    }
  };

  // Event listener for search form submission
  searchForm.addEventListener("submit", searchMovie);

  searchIcon.addEventListener("click", searchMovie);

  // Fetch popular movies data on page load
  await fetchPopularMovies();
}

function filterMovies(event) {
  event.target.value;
}

main();
