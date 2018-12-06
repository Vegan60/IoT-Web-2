let apiURL = "http://angelie-api.vq3mchzm7k.us-west-2.elasticbeanstalk.com"

function addItem() {
  console.log("test")
description = $("#textAreaDesc").val();
name = $("#inputTitle").val();
price = $("#inlineFormInputPrice").val();
type = $('#inputState').find(":selected").val();
	axios.post(apiURL + "/Food/", {
		"description" : description,
	    "nom" : name,
		"prix" : price,
	    "type" : type
	    }).then(function (response) {
		console.log(response);
	}).catch(function (error) {
		console.log(error);
	});

  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

$("#addMenuItem").submit(addItem);
