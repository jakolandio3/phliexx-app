# Flixx App

Flixx App is a dynamic web application built with JavaScript that allows users to explore, search, and discover movies and TV shows.
With an intuitive interface, users can browse popular titles, view detailed information, and access official sites for more content.

![Flixx Banner](./images/showcase-bg.jpg)

[Visit Live Demo](https://phliexx-app.vercel.app/)

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [Authors](#authors)
- [Feedback](#feedback)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/flixx-app.git
```

2. Navigate to the project directory:

```bash
cd flixx-app
```

3. Create a `.env` file in the root directory, or create global variables for api credentials:

```sh
apiKey=your-movie-db-private-key
apiUrl=your-movie-db-api-url
```

## Usage

- Open `index.html` in your web browser to view the app.
- Use the search bar to find movies by title.
- Click on a movie to view more details.

## Technologies Used

- `HTML`: Hypertext markup language.
- `CSS`: Cascading style script.
- `JavaScript`: Good old vanilla `programming`.
- `The Movie DB API`: For movie data
- `Swiper 11.0.5`: A modern mobile touch slider and framework with hardware accelerated transitions.
- `WebFonts`: Additional stylized web fonts from google-fonts
- `FontAwesome`: Stylized icons used throughout the UI

## Features

- Interactive up-to-date scrolling movie and show banner to keep you updated on the latest releases
- Browse popular Movies
- Browse popular Tv Shows
- Search for Movies by title
- Search for Tv Shows by title
- View Movie and Tv Show details including rating, release date, revenue and synopsis
- Links to official sites of each show or movie

## Project Structure

- `.env.example`: Example environment variables file.
- `.gitignore`: Git ignore file.
- `.vscode/`: Visual Studio Code settings.
- `css/`: Directory containing CSS files.
  - `spinner.css`: CSS for the loading spinner.
  - `style.css`: Main stylesheet for the project.
- `images/`: Directory containing image assets.
- `index.html`: Main HTML file for the app.
- `js/`: Directory containing JavaScript files.
  - `script.js`: Main JavaScript file for the project.
- `lib/`: Directory containing library files.
  - `fontawesome.css`: FontAwesome CSS for icons.
  - `swiper.css`: Swiper CSS for the image slider.
  - `swiper.js`: Swiper JavaScript for the image slider.
- `movie-details.html`: HTML file for displaying movie details.
- `README.md`: Project README file.
- `search.html`: HTML file for the search page.
- `shows.html`: HTML file for displaying TV shows.
- `tv-details.html`: HTML file for displaying TV show details.
- `webfonts/`: Directory containing web font files.

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file or create some global variables in the script.js file.

- `apiKey`: Your movie db private key.
- `apiUrl`: Your movie db api url.

## Scripts

- `js/script.js:` Ran on index.html, runs the main JS file for the project.
- `lib/swiper.js:` Ran on index.html, runs the Swiper image slider functionality.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## Authors

- @jakolandio3

## Feedback

If you have any feedback, please reach out to me at [jakobdouglas.dev@gmail.com](mailto:jakobdouglas.dev@gmail.com)
