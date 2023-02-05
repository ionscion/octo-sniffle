let lattitude = [];
let longitude = [];
let searchButton = document.getElementById("search-btn");


function getCityApi(evt) {
  evt.preventDefault();
  let cityInput = document.getElementById("city-input");
  let selectedState = document.getElementById("state-input");

  cityInput = cityInput.value;
  selectedState = selectedState.value;

  if (cityInput === "New York" || cityInput === "new york") {
    cityInput = "City of New York";
  }

  let cityUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${cityInput},${selectedState},US&limit=1&appid=${weatherapi}`;

  fetch(cityUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      for (let i = 0; i < data.length; i++) {
        const returnedName = data[i].name.toLowerCase();
        if (cityInput.toLowerCase().includes(returnedName)) {
          console.log("city matches exactly");
          lattitude.push(data[0].lat);
          longitude.push(data[0].lon);
          console.log(`${lattitude},${longitude}`);
        } else {
          console.log("no city was found!");
        }
      }
      getConcertApi(lattitude, longitude);
      // this will be the function Nate is working on
    })
    .catch(function (error) {
      console.error("There was a problem with the fetch operation:", error);
    });
  // searchSave(cityInput, selectedState);
  cityInput.value = "";
  selectedState.value = "";
}

function getConcertApi() {
  let seatGeekUrl = `https://api.seatgeek.com/2/events?lat=${lattitude}&lon=${longitude}&taxonomies.name=concert&client_id=${seatgeekapi}`;
  fetch(seatGeekUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      for (let i = 0; i < 10; i++) {
        let columnData = document.getElementById("column-1");
        let performer = document.createElement("p");
        performer.textContent = data.events[i].short_title;
        columnData.appendChild(performer);
      }
    });
}

searchButton.addEventListener("click", getCityApi);

/*
Todo:
Hook up geocoding api
Idea - have list of performers, allow the user to click on one to view information
*/
