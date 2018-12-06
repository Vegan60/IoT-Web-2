let apiURL = "http://angelie-api.vq3mchzm7k.us-west-2.elasticbeanstalk.com"

function getFood(){
  axios.get(apiURL + "/Food/").then(function (response) {
    console.log(response.data);
    let content = "";
    for (let i = 0; i < response.data.objects.length; i++) {
      content += `<div class="col-lg-4 col-md-6 mb-4">
      <div class="card h-100">
      <a href="#" onclick="" id="` + response.data.objects[i].id + `"><img class="card-img-top" src="http://placehold.it/700x400" alt=""></a>
      <div class="card-body">
      <h4 class="card-title" id="` + response.data.objects[i].id + `">`+ response.data.objects[i].nom +`</h4>
      <h5 class="card-title">`+ response.data.objects[i].prix + `€</h5>
      <p class="card-text">` + response.data.objects[i].description +`</p>
      </div>
      <div class="card-footer">
      <small class="text-muted">`+ getType(response.data.objects[i].type) +`</small>
      </div>
      </div>
      </div>`;
    }
    $('.card-deck').append(content);
  }).catch(function (error) {
    console.log(error);
  })
}

function getType(type)
{
  if (type == 1) {
    return "Entrée";
  } else if (type == 2) {
    return "Plat";
  } else if (type == 3) {
    return "Dessert";
  } else if (type == 4) {
    return "Boisson";
  }
}

getFood()
