let apiURL = "http://43690103.ngrok.io/"

//function getFoodID(){
//	axios.get(apiURL + "getFood/").then(function (response) {
//		console.log(response);
//	}).catch(function (error) {
//		console.log(error);
//	})
//}

function getFood(){
	axios.get(apiURL + "Food/1/").then(function (response) {
		console.log(response.data);
	}).catch(function (error) {
		console.log(error);
	})
}


getFood();

