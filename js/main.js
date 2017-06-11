$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?s='+searchText+'&?i=tt3896198&apikey=54455191')
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';

      $.each(movies, (index, movie) => {
        output += `
          <div class="col-md-3">
            <div class="well text-center">
              <img src="${movie.Poster}">
              <h5>${movie.Title}</h5>
              <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
            </div>
          </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com?i='+movieId+'&apikey=54455191')
    .then((response) => {
      console.log(response);
      let movie = response.data;
      let id = response.data.imdbID;
      let videoId = id.substring(2,12);
      let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.Poster}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
              <li class="list-group-item"><strong>ID:</strong> ${movie.imdbID}</li>
            </ul>
          </div>
        </div>

        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.Plot}
            <div id='videoPlayer'><iframe class="VidSourceAPI" data-method="GetStreamEmbedUrlByIMDBID" data-apikey="IrRbdZwucojnyjLj" data-imdbid="${videoId}" scrolling="no" frameborder="0" width="1100" height="590" allowfullscreen="true" webkitallowfullscreen="true" mozallowfullscreen="true"></iframe></div>
            <hr>
            <a href="http://imdb.com/title/${movieId}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });

}
