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

// fetch data from TMDB API
// making a reusable function for collecting the data from different endpoints in the api
// contains the base url and my access key to prefill
async function fetchAPIData(endpoint) {
	const API_KEY = 'c7d3e86e48b07c968a9eb9e0b8dbee83';
	const API_URL = 'https://api.themoviedb.org/3/';

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);
	// parsing returned data with .json
	// using async and await you must await till its compiled
	const data = await response.json();
	return data;
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
			console.log('Shows');
			break;
		case '/movie-details.html':
			console.log('movie details');
			break;
		case '/tv-details.html':
			console.log('tv details');
			break;
		case '/search.html':
			console.log('search');
			break;
	}
	highlightActiveLink();
}
document.addEventListener('DOMContentLoaded', init);
