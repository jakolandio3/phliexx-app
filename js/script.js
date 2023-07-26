const global = {
	currentPage: window.location.pathname,
};
// highlight current page\
function highlightActiveLink() {
	// get all the links here
	const links = document.querySelectorAll('.nav-link');
	// run a for each that checks if the href is the same as the current page
	links.forEach((link) => {
		if (link.getAttribute('href') === global.currentPage) {
			// adding a class if its the same
			link.classList.add('active');
		}
	});
}
// displaying popular movies
async function displayPopularMovies() {
	// ive destructured around results here because the returned data has something called results within it so im targetting that
	const { results } = await fetchAPIData('movie/popular');
	console.log(results);
	results.forEach((movie) => {
		const newdiv = document.createElement('div');
		newdiv.classList.add('card');
		newdiv.innerHTML = `
					<a href="movie-details.html?id=${movie.id}">
				${
					movie.poster_path
						? `		<img
							src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
							class="card-img-top"
							alt="${movie.title}"
						/>`
						: `		<img
							src="../images/no-image.jpg"
							class="card-img-top"
							alt="${movie.title}"
						/>`
				}
					</a>
					<div class="card-body">
						<h5 class="card-title">${movie.title}</h5>
						<p class="card-text">
							<small class="text-muted">Release: ${movie.release_date}</small>
						</p>
					</div>
				`;
		document.getElementById('popular-movies').appendChild(newdiv);
	});
}
// displaying popular tv shows
async function displayPopularTVShows() {
	// ive destructured around results here because the returned data has something called results within it so im targetting that
	const { results } = await fetchAPIData('tv/popular');
	console.log(results);
	results.forEach((show) => {
		const newdiv = document.createElement('div');
		newdiv.classList.add('card');
		newdiv.innerHTML = `
          <a href="tv-details.html?id=${show.id}">
       ${
					show.poster_path
						? `     <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
						: `     <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
				}
          </a>
          <div class="card-body">
            <h5 class="card-title">${show.name}</h5>
            <p class="card-text">
              <small class="text-muted">Aired: ${show.first_air_date}</small>
            </p>
          </div>
      `;
		document.getElementById('popular-shows').appendChild(newdiv);
	});
}

// display movie details
// displayaying the id through the search param which is the ?
async function displayMovieDetails() {
	// splitting the id here into two parts at the = or ?=(number) so it just returns num
	const movieID = window.location.search.split('=')[1];
	// getting the fetch data of the specific movie whos id were on in the page number id
	const movie = await fetchAPIData(`movie/${movieID}`);
	// overlay backdrop image
	displayBackgroundImage('movie', movie.backdrop_path);

	// making new div
	const newDiv = document.createElement('div');
	// set its html
	newDiv.innerHTML = `
        <div class="details-top">
          <div>
     ${
				movie.poster_path
					? `       <img
              src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="Movie Title"
            />`
					: `       <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.original_title}"
            />`
			}
          </div>
          <div>
            <h2>${movie.original_title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
          ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join(``)}
            </ul>
            <a href="${
							movie.homepage ? `${movie.homepage}` : ''
						}" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumber(
							movie.budget
						)}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumber(
							movie.revenue
						)}</li>
            <li><span class="text-secondary">Runtime:</span> ${
							movie.runtime
						} minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movie.production_companies
						.map((company) => `<span>${company.name}</span>`)
						.join(', ')}</div>
        </div>
      `;
	document.getElementById('movie-details').appendChild(newDiv);
	console.log(movieID);
}
// display show details
// displayaying the id through the search param which is the ?
async function displayShowDetails() {
	// splitting the id here into two parts at the = or ?=(number) so it just returns num
	const showID = window.location.search.split('=')[1];
	// getting the fetch data of the specific movie whos id were on in the page number id
	const show = await fetchAPIData(`tv/${showID}`);
	// overlay backdrop image
	displayBackgroundImage('show', show.backdrop_path);

	// making new div
	const newDiv = document.createElement('div');
	// set its html
	newDiv.innerHTML = ` <div class="details-top">
          <div>
           ${
							show.poster_path
								? ` <img
              src="https://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
								: ` <img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
						}
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
            ${show.vote_average.toFixed(1)}/ 10
            </p>
            <p class="text-muted">Last Air Date: ${show.last_air_date}</p>
            <p>
         ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
       ${show.genres.map((genre) => `<li>${genre.name}</li>`).join(``)}
            </ul>
            <a href="${
							show.homepage
						}" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes:</span> ${
							show.number_of_episodes
						}</li>
            <li>
              <span class="text-secondary">Last Episode To Air:</span> ${
								show.last_episode_to_air.name
							}
            </li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${show.production_companies
						.map((company) => `<span>${company.name}</span>`)
						.join(', ')}</div>
        </div>`;
	document.getElementById('show-details').appendChild(newDiv);
	console.log(showID);
}

// create backdrop function
function displayBackgroundImage(type, backgroundpath) {
	const overlayDiv = document.createElement('div');
	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${backgroundpath})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.zIndex = '-1';
	overlayDiv.style.opacity = '0.1';

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv);
	} else if (type === 'show') {
		document.querySelector('#show-details').appendChild(overlayDiv);
	}
}

// fetch data from TMDB API
// making a reusable function for collecting the data from different endpoints in the api
// contains the base url and my access key to prefill
async function fetchAPIData(endpoint) {
	const API_KEY = 'c7d3e86e48b07c968a9eb9e0b8dbee83';
	const API_URL = 'https://api.themoviedb.org/3/';
	spinnerShow();
	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);
	// parsing returned data with .json
	// using async and await you must await till its compiled
	const data = await response.json();
	spinnerHide();
	return data;
}
// showing or hiding the spinner
function spinnerShow() {
	document.querySelector('.spinner').classList.add('show');
}
function spinnerHide() {
	document.querySelector('.spinner').classList.remove('show');
}

function addCommasToNumber(number) {
	return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

// init app
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			console.log('Home');
			break;
		case '/shows.html':
			displayPopularTVShows();
			console.log('Shows');
			break;
		case '/movie-details.html':
			displayMovieDetails();
			console.log('movie details');
			break;
		case '/tv-details.html':
			displayShowDetails();
			console.log('tv details');
			break;
		case '/search.html':
			console.log('search');
			break;
	}
	highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init);
