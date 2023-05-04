async function main() {
  const movies = await fetch(
    "https://api.themoviedb.org/3/movie/popular?api_key=efb48bf9762efb858b54c3ebab5b98b7"
  );
  const moviesData = await movies.json();
  const moviesEl = document.querySelector(".movies");
  console.log(moviesData);
  if (moviesData && moviesData.results) {
    moviesEl.innerHTML = moviesData.results
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
    console.log(`Mapping movie ${moviesData.original_title}`);
  }
}

main();
