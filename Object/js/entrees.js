let apiURL = "http://angelie-api.vq3mchzm7k.us-west-2.elasticbeanstalk.com/"

function getFood(){
	axios.get(apiURL + "Food/").then(function (response) {
		console.log(response.data);
	}).catch(function (error) {
		console.log(error);
	})
}

function createOrder(){
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
getFood();
createOrder();

