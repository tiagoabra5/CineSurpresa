const apiKey = '2a6494e2f7409a33fe107b3bca107695';
const resultsDiv = document.getElementById('results');
const overviewDiv = document.getElementById('overview');

window.addEventListener('DOMContentLoaded', () => {
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
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      displayMovie(randomMovie);
    })
    .catch(error => {
      console.error('Erro ao buscar filme:', error);
      resultsDiv.innerHTML = '<h3>Erro ao buscar filme.</h3>';
    });
}

function displayMovie(movie) {
  resultsDiv.innerHTML = '';

  const card = document.createElement('div');
  card.className = 'card shadow-sm';
  card.style.width = '18rem';

  const poster = document.createElement('img');
  poster.className = 'card-img-top';
  if (movie.poster_path) {
    poster.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    poster.alt = `Poster do filme ${movie.title}`;
  } else {
    poster.alt = 'Poster não disponível';
  }

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body';

  const title = document.createElement('h5');
  title.className = 'card-title';
  title.textContent = movie.title;

  const overviewButton = document.createElement('button');
  overviewButton.className = 'btn btn-secondary mt-2';
  overviewButton.textContent = 'Ver sinopse';
  overviewButton.addEventListener('click', () => {
  overviewPopup(movie.overview);
  });

  const newButton = document.createElement('button');
  newButton.className = 'btn btn-primary mt-3';
  newButton.textContent = 'Sortear Filme';
  newButton.addEventListener('click', getRandomMovie);
  
  cardBody.appendChild(overviewButton);
  cardBody.appendChild(title);
  cardBody.appendChild(overviewButton);
  cardBody.appendChild(newButton);

  card.appendChild(poster);
  card.appendChild(cardBody);

  resultsDiv.appendChild(card);
}

function overviewPopup(sinopse) {
  const overviewDiv = document.getElementById('overview');
  overviewDiv.textContent = sinopse || 'Sinopse indisponível.';

  const modal = new bootstrap.Modal(document.getElementById('overviewModal'));
  modal.show();

}

function moveiOverview(movie){
  const overview = document.createElement('p');
  overview.className = 'card-text';
  overview.textContent = movie.overview || 'Sem descrição disponível.';
}