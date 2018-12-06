let apiURL = "http://angelie-api.vq3mchzm7k.us-west-2.elasticbeanstalk.com"

function getCarroussel() {
	let content = `<div id="carouselExampleIndicators" class="carousel slide my-4" data-ride="carousel">
            <ol class="carousel-indicators">
              <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
              <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
            </ol>
            <div class="carousel-inner" role="listbox">
              <div class="carousel-item active">
                <img class="d-block img-fluid" src="media/dessert1.jpg" alt="First slide">
              </div>
              <div class="carousel-item">
                <img class="d-block img-fluid" src="media/dessert2.jpg" alt="Second slide">
              </div>
              <div class="carousel-item">
                <img class="d-block img-fluid" src="media/dessert3.jpg" alt="Third slide">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a>
          </div>`;
          $('#here_item').append(content);
}

function getDesserts(){
	axios.get(apiURL + "/Food/").then(function (response) {
		console.log(response.data);
		let content = "";
		for (let i = 0; i < response.data.objects.length; i++) {
			if (response.data.objects[i].type === 3) {
				content += `<div class="col-lg-4 col-md-6 mb-4">
              		<div class="card h-100">
                		<a href="#" onclick="getItem(this.id)" id="` + response.data.objects[i].id + `"><img class="card-img-top" src="media/dessert_item.png" alt=""></a>
                		<div class="card-body">
                  		<h4 class="card-title">
                    		<a href="#" onclick="getItem(this.id)" id="` + response.data.objects[i].id + `">`+ response.data.objects[i].nom +`</a>
                  		</h4>
                  		<h5>`+ response.data.objects[i].prix + `€</h5>
                  	<p class="card-text">` + response.data.objects[i].description +`</p>
                	</div>
              		</div>
            	</div>`;
			}
		}
		$('#here_item').append(content);
	}).catch(function (error) {
		console.log(error);
	})
}

function getItem(id) {
	axios.get(apiURL + "/Food/" + id + "/").then(function (response) {
		console.log(response.data);
		let content = `<div class="row" id="here_item">
          <div class="card mt-4">
            <div class="card-body">
              <h3 class="card-title">` + response.data.nom +`</h3>
              <h4>`+ response.data.prix + `€</h4>
              <p class="card-text">` + response.data.description +`</p>
            </div>
            <a tabindex="0" id="here_button" class="btn btn-lg btn-success" onclick='addItem("` + response.data.nom + `")' role="button" title="Ajout au Panier">Ajouter</a>
          	<div id="snackbar">Produit ajouté au panier!</div>
          </div></div>`;
		$('#here_item').replaceAll(content);
		$('#here_super').append(content);
	}).catch(function (error) {
		console.log(error);
	})
}

function addItem(nom) {
	axios.get(apiURL + "/Command/").then(function (response) {
    	console.log(response.data);
    	let current_order = false;
    	for (let i = 0; i < response.data.objects.length; i++) {
    		axios.get(apiURL + "/Command/" + response.data.objects[i].id +"/").then(function (response2) {
    			if (response2.data.status === "Initialisée" && !current_order) {
    				current_order = true;
    				let food = "";
    				if (response2.data.foods === "[]") {
    					food = "["+ nom +"]";
    				}
    				else {
    					food = response2.data.foods.slice(0, -1) + ", " + nom + "]";
    				}
    				axios.patch(apiURL + "/Command/" + response2.data.id + "/", {foods: food}).then(function (response) {
    					console.log(response);
    					var x = document.getElementById("snackbar");
    					x.className = "show";
    					setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
  					})
  						.catch(function (error) {
    						console.log(error);
  					});
    			}
    		}).catch(function (error) {
    			console.log(error);
    		});
    	}
    })
}

getCarroussel();
getDesserts();

