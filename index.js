const moviesEl = document.querySelector(".movies"); //targeting movies class
const searchForm = document.querySelector("#search__form"); //targeting search form id
const searchIcon = document.getElementById("search-icon"); //targeting search-icon id
let data = []; //data contains empty array

async function main(filter) {
  //async main function with the parameter of filter

  const sortData = () => {
    //sort data function that filters from old to new and new to old
    if (filter === "OLD_TO_NEW") {
      data.results.sort(
        (a, b) => new Date(a.release_date) - new Date(b.release_date)
      );
    } else if (filter === "NEW_TO_OLD") {
      data.results.sort(
        (a, b) => new Date(b.release_date) - new Date(a.release_date)
      );
    }
  };

  const fetchMovies = async (url) => {
    const response = await fetch(url);
    data = await response.json(); // Assign fetched data to the data variable
    sortData(); // Sort the data
    renderMovies(data.results); // Render the sorted data
  };

  // Function to render movies data to the DOM
  const renderMovies = (data) => {
    moviesEl.innerHTML = data
      .slice(0, 8)
      .filter(
        (movie) => movie.poster_path !== null && movie.poster_path !== undefined
      )
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

  // Function to search movies data by title
  const searchMovie = async (event, filter) => {
    if (event) {
      event.preventDefault();
    }
    showLoadingState(); // Show loading state
    const formData = new FormData(document.getElementById("search__form"));
    const query = formData.get("searchQuery");

    if (query) {
      await fetchMovies(
        `https://api.themoviedb.org/3/search/movie?api_key=efb48bf9762efb858b54c3ebab5b98b7&query=${query}`
      );
    }
  };

  // Event listener for search form submission
  searchForm.addEventListener("submit", (event) => searchMovie(event, filter));

  searchIcon.addEventListener("click", (event) => searchMovie(event, filter));

  // Fetch popular movies data on page load
  await fetchMovies(
    "https://api.themoviedb.org/3/movie/popular?api_key=efb48bf9762efb858b54c3ebab5b98b7"
  );
}

function filterMovies(event) {
  const filter = event.target.value;
  main(filter);
}

main(); // Call the main function without filter on page load
