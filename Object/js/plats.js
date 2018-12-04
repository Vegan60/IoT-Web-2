let apiURL = "http://angelie-api.vq3mchzm7k.us-west-2.elasticbeanstalk.com"

function getPlats(){
	axios.get(apiURL + "/Food/").then(function (response) {
		console.log(response.data);
		let content = "";
		for (let i = 0; i < response.data.objects.length; i++) {
			if (response.data.objects[i].type === 2) {
				console.log("hello");
				content += `<div class="col-lg-4 col-md-6 mb-4">
              		<div class="card h-100">
                		<a href="#"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
                		<div class="card-body">
                  		<h4 class="card-title">
                    		<a href="#">`+ response.data.objects[i].nom +`</a>
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

function addOrder(){
	axios.post(apiURL + "Command/", {
		id : 1,
	    foods : [],
	    status : 'Non commandée',
	    date : Date.now(),
	    table : 1,
	    commentaire : ''
	    }).then(function (response) {
		console.log(response.data);
	}).catch(function (error) {
		console.log(error);
	})
}
getPlats();
