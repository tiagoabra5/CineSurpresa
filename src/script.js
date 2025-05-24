const apiKey = '2a6494e2f7409a33fe107b3bca107695';
const resultsDiv = document.getElementById('results');
const overviewDiv = document.getElementById('overview');

window.addEventListener('DOMContentLoaded', () => {
  getRandomMovie();
});

function getRandomMovie() {
  const spinner = document.getElementById('spinner');
  spinner.style.display = 'block';
  resultsDiv.innerHTML = '';

  const randomPage = Math.floor(Math.random() * 10) + 1;
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${randomPage}`;

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      spinner.style.display = 'none';
      const movies = data.results;
      if (!movies || movies.length === 0) {
        resultsDiv.innerHTML = '<h3>Nenhum filme encontrado!</h3>';
        return;
      }
      const randomMovie = movies[Math.floor(Math.random() * movies.length)];
      displayMovie(randomMovie);
    })
    .catch(error => {
      spinner.style.display = 'none';
      console.error('Erro ao buscar filme:', error);
      resultsDiv.innerHTML = '<h3>Erro ao buscar filme.</h3>';
    });
}

function displayMovie(movie) {
  resultsDiv.innerHTML = '';
  resultsDiv.style.display = 'flex';
  resultsDiv.style.justifyContent = 'center';
  resultsDiv.style.alignItems = 'center';
  resultsDiv.style.height = '80vh';


  const card = document.createElement('div');
  card.className = 'card mb-3 mx-auto';
  card.style.width = '800px';
  card.style.height = '400px';
  card.style.overflow = 'hidden';
  card.style.display = 'flex';
  card.style.flexDirection = 'column';
  card.style.border = '10px solid rgb(251, 251, 251)';
  card.style.borderRadius = '7px';

  const row = document.createElement('div');
  row.className = 'row g-0 h-100';

  const colImage = document.createElement('div');
  colImage.className = 'col-md-4';

  const poster = document.createElement('img');
  poster.className = 'img-fluid rounded-start h-100';
  poster.style.objectFit = 'cover';
  if (movie.poster_path) {
    poster.src = `https://image.tmdb.org/t/p/w300${movie.poster_path}`;
    poster.alt = `Poster do filme ${movie.title}`;
  } else {
    poster.alt = 'Poster não disponível';
  }
  colImage.appendChild(poster);

  const colBody = document.createElement('div');
  colBody.className = 'col-md-8 d-flex flex-column';

  const cardBody = document.createElement('div');
  cardBody.className = 'card-body d-flex flex-column justify-content-between h-100';

  const title = document.createElement('h1');
  title.className = 'card-title';
  title.textContent = movie.title;

  const ratingValue = movie.vote_average.toFixed(1);
  const ratingDiv = document.createElement('div');
  ratingDiv.className = 'mb-2 d-flex align-items-center gap-1';

  const starIcon = document.createElement('span');
  starIcon.textContent = '⭐';
  starIcon.style.fontSize = '1.2rem';

  const ratingText = document.createElement('span');
  ratingText.textContent = `${ratingValue}`;
  ratingText.style.fontWeight = 'bold';

  const description = document.createElement('div');
  description.className = 'card-text overflow-auto';
  description.style.flexGrow = '1';
  description.style.maxHeight = '120px';
  description.style.marginBottom = '10px';
  description.style.paddingRight = '4px';
  description.textContent = movie.overview || 'Sinopse indisponível.';

  const trailerDiv = document.createElement('div');
  trailerDiv.className = 'mt-3';

  const buttonGroup = document.createElement('div');
  buttonGroup.className = 'd-flex justify-content-start gap-2';

  const trailerButton = document.createElement('button');
  trailerButton.className = 'btn btn-secondary btn-sm';
  trailerButton.textContent = 'Trailer';
  trailerButton.addEventListener('click', () => trailerPopup(movie));

  const newButton = document.createElement('button');
  newButton.className = 'btn btn-primary btn-sm';
  newButton.textContent = 'Sortear outro';
  newButton.addEventListener('click', getRandomMovie);

  buttonGroup.appendChild(trailerButton);
  buttonGroup.appendChild(newButton);

  cardBody.appendChild(title);
  ratingDiv.appendChild(starIcon);
  ratingDiv.appendChild(ratingText);
  cardBody.appendChild(ratingDiv);
  cardBody.appendChild(description);
  cardBody.appendChild(trailerDiv);
  cardBody.appendChild(buttonGroup);

  colBody.appendChild(cardBody);

  row.appendChild(colImage);
  row.appendChild(colBody);
  card.appendChild(row);

  resultsDiv.appendChild(card);
}

function movieOverview(movie){
  const overview = document.createElement('p');
  overview.className = 'card-text';
  overview.textContent = movie.overview || 'Sem descrição disponível.';
}

function trailerPopup(movie) {
  const overviewDiv = document.getElementById('trailer');
  overviewDiv.innerHTML = 'Carregando trailer...';

  fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${apiKey}&language=pt-BR`)
    .then(response => response.json())
    .then(data => {
      const trailer = data.results.find(
        vid => vid.type === 'Trailer' && vid.site === 'YouTube'
      );

      if (trailer) {
        overviewDiv.innerHTML = `
          <div class="ratio ratio-16x9">
            <iframe 
              src="https://www.youtube.com/embed/${trailer.key}" 
              title="Trailer do filme ${movie.title}"
              allowfullscreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameborder="0">
            </iframe>
          </div>
        `;
      } else {
        overviewDiv.textContent = 'Trailer não disponível.';
      }

      const modal = new bootstrap.Modal(document.getElementById('trailerModal'));
      modal.show();
    })
    .catch(err => {
      overviewDiv.textContent = 'Erro ao carregar trailer.';
      console.error(err);
      const modal = new bootstrap.Modal(document.getElementById('trailerModal'));
      modal.show();
    });
}

const trailerModalEl = document.getElementById('trailerModal');

trailerModalEl.addEventListener('hidden.bs.modal', () => {
  const trailerDiv = document.getElementById('trailer');
  trailerDiv.innerHTML = '';
});