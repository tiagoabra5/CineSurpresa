function favs() {
    window.location.href = "favs.html";
}

const apiKey = '2a6494e2f7409a33fe107b3bca107695';
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultsDiv = document.getElementById('results');

searchButton.addEventListener('click', () => {
    const searchTerm = searchInput.value;
    if (searchTerm) {
        searchMovies(searchTerm);
    }
});

function searchMovies(query) {
    const apiUrl = (`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`);

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayResults(data.results))
        .catch(error => console.error('Error fetching data:', error));
}

function displayResults(movies) {
    resultsDiv.innerHTML = '';
    

    if (movies.length === 0) {
        resultsDiv.innerHTML = '<h3>Movie not found!</h3>';
        return;
    }

    movies.forEach(movie => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movie');

        const title = document.createElement('h2');
        title.textContent = movie.title;

        const overview = document.createElement('p');
        overview.textContent = movie.overview;

        movieDiv.appendChild(title);
        movieDiv.appendChild(overview);
        resultsDiv.appendChild(movieDiv);
    });
}
