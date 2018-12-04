let apiURL = "http://angelie-api.vq3mchzm7k.us-west-2.elasticbeanstalk.com"

function getOrder(){
    axios.get(apiURL + "/Command/").then(function (response) {
    	console.log(response.data);
    	let current_order = false;
    	for (let i = 0; i < response.data.objects.length; i++) {
    		axios.get(apiURL + "/Command/" + response.data.objects[i].id +"/").then(function (response2) {
    			if (response2.data.status === "Initialisée" && !current_order) {
    				current_order = true;
    				displayOrder(response2.data);
    			}
    			if (!current_order && ((i + 1) === response.data.objects.length)) {
    				displayEmpty();
    				createOrder();
    			}
    		}).catch(function (error) {
    			console.log(error);
    		})
    	}
    }).catch(function (error) {
    	console.log(error);
    })
}

function displayEmpty() {
	let content = '<h4>Votre panier est vide.</h4>';
	$('#here_table').append(content);
	$('#here_button').addClass('disabled');
}

function displayOrder(response) {
	if (response.foods === "[]")
		displayEmpty();
	else {
		let content = `<table class="table table-striped">
					        <thead>
					          <tr>
						        <th>Produit</th>
			                    <th>Quantité</th>
			                    <th>Prix</th>
		                      </tr>
		                    </thead>
		                    <tbody>`;
		let total = 0.00;
		let order;
		let i = 0;
		let found = false;
 		axios.get(apiURL + "/Food/").then(function (response2) {
    	for (let key in response2.data.objects) {
    		for (let key2 in response.foods) {
				if (key2 === key.nom) {
					found = false;
					for (let key3 in order) {
						if (key3.nom === key2) {
							key3.qte += 1;
							found = true;
						}
					}
					if (!found) {
						let food = {nom: key.nom, prix: key.prix, type: key.type, qte: 1};
						order[i++] = food;
					}
				}
			}
    	}
    	for (let j = 0; j < i; j++) {
    		if (order[j].type === 1) {
    			content += `<tr><td>` + order[j].nom + `</td><td>` + order[j].qte
    			+ `</td><td>` + order[j].prix + `</td></tr>`;
    			total += (order[j].prix * order[j].qte);
    		}
    	}
    	for (let j = 0; j < i; j++) {
    		if (order[j].type === 2) {
    			content += `<tr><td>` + order[j].nom + `</td><td>` + order[j].qte
    			+ `</td><td>` + order[j].prix + `</td></tr>`;
    			total += (order[j].prix * order[j].qte);
    		}
    	}
    	for (let j = 0; j < i; j++) {
    		if (order[j].type === 3) {
    			content += `<tr><td>` + order[j].nom + `</td><td>` + order[j].qte
    			+ `</td><td>` + order[j].prix + `</td></tr>`;
    			total += (order[j].prix * order[j].qte);
    		}
    	}
    	content += `</tbody>
					<thead>
					  <tr>
					    <th></th>
					    <th>Total</th>
			            <th>` + total +`€</th>
					    </tr>
					</thead>
					</table>`;
		$('#here_table').append(content);
		$('#here_button').addClass('active');
    	}).catch(function (error) {
    	console.log(error);
    	})
	}
}

function createOrder() {
	let date = new Date();
	let table_rng = Math.floor((Math.random() * 10) + 1);

	date.setHours(date.getHours() + 1);
	let date_clean = date.toJSON();
	axios.post(apiURL + "/Command/", {
		"foods" : [],
	    "status" : "Initialisée",
		"date" : date_clean,
	    "table" : table_rng,
	    "commentaire" : ""
	    }).then(function (response) {
		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});
}

getOrder();