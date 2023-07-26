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

// init app
function init() {
	switch (global.currentPage) {
		case '/':
		case '/index.html':
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
