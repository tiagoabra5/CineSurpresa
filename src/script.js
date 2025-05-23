const apiKey = '2a6494e2f7409a33fe107b3bca107695';
const randomMovieButton = document.getElementById('randomMovieButton');
const resultsDiv = document.getElementById('results');

randomMovieButton.addEventListener('click', () => {
    getRandomMovie();
});

function getRandomMovie() {
    const randomPage = Math.floor(Math.random() * 10) + 1;
    const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${randomPage}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const movies = data.results;
            if (!movies || movies.length === 0) {
                resultsDiv.innerHTML = '<h3>Nenhum filme encontrado!</h3>';
                return;
            }
            const randomIndex = Math.floor(Math.random() * movies.length);
            const randomMovie = movies[randomIndex];
            displayMovie(randomMovie);
        })
        .catch(error => {
            console.error('Erro ao buscar filme:', error);
            resultsDiv.innerHTML = '<h3>Erro ao buscar filme.</h3>';
        });
}

function displayMovie(movie) {
    resultsDiv.innerHTML = '';

    const movieDiv = document.createElement('div');
    movieDiv.classList.add('movie');

    const title = document.createElement('h2');
    title.textContent = movie.title;

    const poster = document.createElement('img');
    if (movie.poster_path) {
        poster.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
        poster.alt = `Poster do filme ${movie.title}`;
    } else {
        poster.alt = 'Poster não disponível';
    }
    poster.style.maxWidth = '200px';
    poster.style.borderRadius = '8px';
    poster.style.marginBottom = '10px';

    const overview = document.createElement('p');
    overview.textContent = movie.overview || 'Sem descrição disponível.';

    movieDiv.appendChild(title);
    movieDiv.appendChild(poster);
    movieDiv.appendChild(overview);

    resultsDiv.appendChild(movieDiv);
}
