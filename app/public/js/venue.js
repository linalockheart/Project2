var currentLocation = "";
var barAddress = "";
var googleApiKey = process.env.GOOGLE_API_KEY; //need to add .env file

function validateBarAddress() {
  event.preventDefault();

  barAddress = $("#bar-location")
    .val()
    .trim();
  barAddressArray = barAddress.split("");

  for (let i = 0; i < barAddressArray.length; i++) {
    if (barAddressArray[i] === " ") {
      barAddressArray.splice(i, 1, "%");
      barAddress = barAddressArray.join("");
    }
  }
}

function validateCurrentLocation() {
  event.preventDefault();

  currentLocation = $("#current-location")
    .val()
    .trim();
  currentLocationArray = currentLocation.split("");

  for (let i = 0; i < currentLocationArray.length; i++) {
    if (currentLocationArray[i] === " ") {
      currentLocationArray.splice(i, 1, "%");
      currentLocation = currentLocationArray.join("");
    }
  }
}
