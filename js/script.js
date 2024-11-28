const global = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
		totalResults: 0,
	},
	api: {
		apiKey: 'c7d3e86e48b07c968a9eb9e0b8dbee83',
		apiUrl: 'https://api.themoviedb.org/3/',
	},
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
            <li><span class="text-secondary">Budget:</span> ${addCommasToNumber(
							movie.budget > 0
								? '$' + addCommasToNumber(movie.budget)
								: 'Unknown budget'
						)}</li>
            <li><span class="text-secondary">Revenue:</span> ${addCommasToNumber(
							movie.revenue > 0
								? '$' + addCommasToNumber(movie.revenue)
								: 'Unknown Revenue'
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
            ${
							show.vote_average.toFixed(1) > 0
								? show.vote_average.toFixed(1)
								: 'no star'
						}/ 10
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
}

// searching movies/shows
async function search() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	global.search.type = urlParams.get('type');
	global.search.term = urlParams.get('search-term');

	if (global.search.term !== '' && global.search.term !== null) {
		const { results, total_pages, page, total_results } = await searchAPIData();
		// adding pagination to the url
		global.search.page = page;
		global.search.totalPages = total_pages;
		global.search.totalResults = total_results;
		console.log(results);
		if (results.length === 0) {
			showAlert('No Results Found for ' + global.search.term, 'error');
			return;
		}
		displaySearchResults(results);
	} else {
		showAlert('Please enter a search term', 'error');
	}
}

// displaying search results function
function displaySearchResults(results) {
	// clear prev results
	document.querySelector('#search-results').innerHTML = '';
	document.querySelector('#search-results-heading').innerHTML = '';
	document.querySelector('#pagination').innerHTML = '';

	results.forEach((result) => {
		const newdiv = document.createElement('div');
		newdiv.classList.add('card');
		newdiv.innerHTML = `
					<a href="${global.search.type}-details.html?id=${result.id}">
				${
					result.poster_path
						? `		<img
							src="https://image.tmdb.org/t/p/w500${result.poster_path}"
							class="card-img-top"
							alt="${global.search.type === 'movie' ? result.title : result.name}"
						/>`
						: `		<img
							src="../images/no-image.jpg"
							class="card-img-top"
							alt="${global.search.type === 'movie' ? result.title : result.name}"
						/>`
				}
					</a>
					<div class="card-body">
						<h5 class="card-title">${
							global.search.type === 'movie' ? result.title : result.name
						}</h5>
						<p class="card-text">
							<small class="text-muted">Release: ${
								global.search.type === 'movie'
									? result.release_date
									: result.first_air_date
							}</small>
						</p>
					</div>
				`;

		document.getElementById(
			'search-results-heading'
		).innerHTML = `<h2>${results.length} of ${global.search.totalResults} Results for ${global.search.term} Displayed</h2>`;
		document.getElementById('search-results').appendChild(newdiv);
	});
	displayPagination();
}

// creating and display pagination for search
function displayPagination() {
	const newDiv = document.createElement('div');
	newDiv.classList.add('pagination');
	newDiv.innerHTML = `					<button class="btn btn-primary" id="prev">Prev</button>
					<button class="btn btn-primary" id="next">Next</button>
					<div class="page-counter">Page ${global.search.page} of ${global.search.totalPages}</div>`;
	document.getElementById('pagination').appendChild(newDiv);
	// disable prev btn on 1st page
	if (global.search.page === 1) {
		document.querySelector('#prev').disabled = true;
	}
	if (global.search.page === global.search.totalPages) {
		document.querySelector('#next').disabled = true;
	}

	// next page
	document.querySelector('#next').addEventListener('click', async () => {
		global.search.page++;
		const { results, total_pages } = await searchAPIData();
		displaySearchResults(results);
	});
	// next page
	document.querySelector('#prev').addEventListener('click', async () => {
		global.search.page--;
		const { results, total_pages } = await searchAPIData();
		displaySearchResults(results);
	});
}

// alert
function showAlert(message, className) {
	const alertEl = document.createElement('div');
	alertEl.classList.add('alert', className);
	alertEl.appendChild(document.createTextNode(message));
	document.querySelector('#alert').appendChild(alertEl);

	setTimeout(() => alertEl.remove(), 3000);
}

// make request to search
async function searchAPIData() {
	const API_KEY = global.api.apiKey;
	const API_URL = global.api.apiUrl;
	spinnerShow();
	const response = await fetch(
		`${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}&page=${global.search.page}`
	);
	// parsing returned data with .json
	// using async and await you must await till its compiled
	const data = await response.json();
	spinnerHide();
	return data;
}

// display slider movies
async function displaySlider() {
	const { results } = await fetchAPIData('movie/now_playing');
	results.forEach((movie) => {
		const newDiv = document.createElement('div');
		newDiv.classList.add('swiper-slide');
		newDiv.innerHTML = `
  					
            <a href="movie-details.html?id=${movie.id}">
              ${
								movie.poster_path
									? `<img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />`
									: `<img src="./images/no-image.jpg" alt="${movie.title}" />`
							}
            </a>
            <h4 class="swiper-rating">
              <i class="fas fa-star text-secondary"></i> ${
								movie.vote_average
							} / 10
            </h4>
          `;
		document.querySelector('.swiper-wrapper').appendChild(newDiv);
		initSwiper();
	});
}
// init swiper
function initSwiper() {
	const swiper = new Swiper('.swiper', {
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		speed: 8000,

		loop: true,
		autoplay: {
			reverseDirection: false,
			delay: 1000,
			disableOnInteraction: true,
			pauseOnMouseEnter: true,
		},
		breakpoints: {
			500: {
				slidesPerView: 2,
			},
			700: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
	return swiper;
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
	const API_KEY = global.api.apiKey;
	const API_URL = global.api.apiUrl;
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
		default:
			displayPopularMovies();
			break;
		case '/':
		case '/index.html':
			displayPopularMovies();
			displaySlider();

			break;
		case '/shows.html':
			displayPopularTVShows();

			break;
		case '/movie-details.html':
			displayMovieDetails();

			break;
		case '/tv-details.html':
			displayShowDetails();

			break;
		case '/search.html':
			search();

			break;
	}
	highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init);
