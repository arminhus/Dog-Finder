// Create an app that lets users choose to display between 1 and 50 random dog images,
// then prints the results to the console. The app should feature a form with a required input where users indicate the number of images to retrieve,
// and the input should default to 3. Use the endpoint described in the "DISPLAY MULTIPLE RANDOM IMAGES FROM ALL DOGS COLLECTION" section of this page of the DogAPI docs.

// Building on the previous app, create an app that lets users choose to display between 1 and 50 random dog images, then loads the images in the console.
// This app should adhere to all of the requirements from the first one, in addition to displaying the images in the DOM.

// Create an app that loads a single random image for a specific breed. This app should account for the happy case when the breed is found,
// as well as the unhappy case when it is not. Use the endpoint described in the "RANDOM IMAGE FROM A BREED COLLECTION" section of this page of the DogAPI docs.
//  Note that the API will return an HTTP status code of 404 along with a JSON object with info about the error if a request is made for a breed that can't be found.

let getBreedImage = breed => {
  const DOG_API_URL = `https://dog.ceo/api/breed/${breed}/images/random`;
  fetch(DOG_API_URL)
    .then(response => response.json())
    .then(responseJson => displayBreedResults(responseJson))
    .catch(error => alert("Something went wrong. Try again later." + error));
};

let displayBreedResults = responseJson => {
  console.log("DOG CEO RESPONSE " + responseJson.message);
  // <img src="" alt="">
  if (responseJson.message == "Breed not found") {
    alert(responseJson.message);
    return;
  }
  $(".results-img").html(`<img src = "${responseJson.message}"/>`);
  $(".results").removeClass("hidden");
};

let watchBreedForm = () => {
  $("#random-breed").submit(event => {
    event.preventDefault();
    let breed = $(event.currentTarget)
      .find(".js-query-breed")
      .val();
    console.log(breed);
    getBreedImage(breed.toLowerCase());
  });
};

let getDogImage = queryCount => {
  const DOG_API_URL = "https://dog.ceo/api/breeds/image/random/";
  fetch(DOG_API_URL + queryCount)
    .then(response => response.json())
    .then(responseJson => displayResults(responseJson))
    .catch(error => alert("Something went wrong. Try again later." + error));
};

let displayResults = responseJson => {
  // console.log(responseJson);
  let resultHTML = "";
  responseJson.message.map(item => {
    resultHTML += `<img src= "${item}"/>`;
  });
  $(".result-image").html(resultHTML);
  $(".results").removeClass("hidden");
};

let watchForm = () => {
  $("#random-form").submit(event => {
    event.preventDefault();
    let queryTargetCount = $(event.currentTarget).find(".js-query");
    let queryCount = queryTargetCount.val();
    console.log(queryCount.length);
    if (queryCount.length != 0) {
      getDogImage(queryCount);
    } else {
      queryCount = 3;
      getDogImage(queryCount);
    }
  });
};

let init = () => {
  // console.log("App loaded! Waiting for submit!");
  watchForm();
  watchBreedForm();
};

$(init);
