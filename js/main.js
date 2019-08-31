if (document.querySelector('#searchForm')) {
    document.querySelector('#searchForm').addEventListener('click', getMovies);
}

function getMovies(e) {
    e.preventDefault();
    
    let searchInput = document.querySelector('#searchTxt').value;
    

    fetch(`https://www.omdbapi.com/?s=${searchInput}&apikey=a0835fe1`)
        .then(res => res.json())
        .then(({ Search }) => renderMovies(Search))
        .catch(err => console.log(err))

}
function renderMovies(movies) {
    let output = '';
    for (var i = 0; i < movies.length; i++) {
        var Poster = movies[i].Poster;
        var Title = movies[i].Title;
        var ID = movies[i].imdbID;

        output += `
                <div class="col-md-3" style="">
                    <div class="well text-center">
                    <img src="${Poster}" onerror="this.src='css/placeholder-image.jpg';" alt="Missing Image" >
                    <h5>${Title}</h5>
                    <a onClick="moviesSelected('${ID}')" class="btn btn-primary" href="#">Movies Details</a>
                    </div>
                </div>
                `; 
            document.querySelector('#movies').innerHTML = output;
    }
    
}
function moviesSelected(ID) {
    sessionStorage.setItem('movieId', ID);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');
    fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=d5d3093e`)
        .then(res => res.json())
        .then(movie => renderMovie(movie))
        .catch();

}

function renderMovie(movie) {

    let output = `
            <div class="row" style="padding-top:30px;">
                <div class="col-md-4">
                    <img src="${movie.Poster}" alt="...">
                </div>
                <div class="col-md-8">
                <h2>${movie.Title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Genre:</strong>${movie.Genre}</li>
                    <li class="list-group-item"><strong>Released:</strong>${movie.Released}</li>
                    <li class="list-group-item"><strong>Rated:</strong>${movie.Rated}</li>
                    <li class="list-group-item"><strong>IMDB Rating:</strong>${movie.imdbRating}</li>
                    <li class="list-group-item"><strong>Director:</strong>${movie.Director}</li>
                    <li class="list-group-item"><strong>Writer:</strong>${movie.Writer}</li>
                    <li class="list-group-item"><strong>Actors:</strong>${movie.Actors}</li>
                </ul>
                </div>
            </div>
            <div class="row">
                <div class="well">
                    <h3>Plot</h3>${movie.Plot}
                    <hr>
                    <a href="http://imdb.com/title/${movie.imdbID} "target="_blank " class="btn btn - primary">View IMDB</a> 
                    <a href = "index.html" class = "btn btn-default"> Go Back to Search </a> 
                </div> 
            </div>`;

    document.querySelector('#movie').innerHTML = output;
}







function ItpOverlay (id) {
	
	this.id = id;
	
	/**
	 * Show the overlay
	 */
	this.show = function(id){
	  
	  if(id){
		  this.id = id;
	  }
	  
	  // Gets the object of the body tag
	  var bgObj = document.getElementById(this.id);
		
	  // Adds a overlay
	  var oDiv = document.createElement('div');
	  oDiv.setAttribute('id','itp_overlay');
	  oDiv.setAttribute("class", "black_overlay");
	  oDiv.style.display='block';
	  bgObj.appendChild(oDiv);
	  
	  // Adds loading
	  var lDiv = document.createElement('div');
	  lDiv.setAttribute('id','loading');
	  lDiv.setAttribute("class", "loading");
	  lDiv.style.display='block';
	  bgObj.appendChild(lDiv);
	  
	}

	/**
	 * Hide the overlay
	 */
	this.hide = function(id) {
		
		if(id){
			this.id = id;
		}
		
		var bgObj   = document.getElementById(this.id);
		
		// Removes loading 
		var element = document.getElementById('loading');
		bgObj.removeChild(element);
		
		// Removes a overlay box
		var element = document.getElementById('itp_overlay');
		bgObj.removeChild(element);
	}
	
}

