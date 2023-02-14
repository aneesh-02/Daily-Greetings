// Function to fire when DOM is ready
$(document).ready(function () {
  //current time function and interval every 10 seconds;
  setCurrentTime();
  setInterval(function () {
    setCurrentTime();
  }, 10 * 1000);

  //setting background every 1 hour;
  setBackground();
  setInterval(function () {
    setBackground();
  }, 3600 * 1000);

  //Weather
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;

    console.log(lat);
    console.log(long);
    getWeather(lat, long);
  });

  var username = localStorage.getItem("user"); //Get the name
  //check username
  if (username) {
    $(".greeting").css("display", "inline-block");
    $(".user-name").css("display", "none");
    $(".greeting").html(
      `${timeGreeting()} <span class="stored-name">${username}</span>.`
    ); //Display name
  } else {
    $(".greeting").css("display", "none"); //Some styling
    $(".user-name").css("display", "inline-block"); //Some styling (Show it)
    $(".greeting").html(`What's your name?`); //Ask for the name
  }

  $(".user-name").keypress(function (e) {
    if (e.which == 13) {
      var username = e.target.value;

      if (!username) return;
      $(".user-name").fadeOut(function () {
        //Fade out user-name and insert greeting
        $(".greeting").html(`${timeGreeting()} ${username}.`); //Display random greeting
        $(".greeting").fadeIn(function () {
          localStorage.setItem("user", username); //Save the name
        });
      });
    }
  });
});

// FUNCTIONS:

function timeGreeting() {
  var now = new Date();
  var greetingTime;
  //Morning 0:00:01-12:00:00
  //Afternoon 12:00:01 - 18:00:00 (Can't do sec, so we use min)
  //Evening 18:00:01 - 24:00:00

  if (now.getHours() < 12) {
    greetingTime = "Good Morning";
  } else if (now.getHours() < 18) {
    greetingTime = "Good Afternoon";
  } else if (now.getHours() < 24) {
    greetingTime = "Good Evening";
  }
  console.log(greetingTime);
  return greetingTime;
}

function setCurrentTime() {
  var now = new Date();
  if (now.getMinutes() < 10) {
    $(".time").html(now.getHours() + ":0" + now.getMinutes()); //Display the time
  } else {
    $(".time").html(now.getHours() + ":" + now.getMinutes()); //Display the time
  }
}

function setBackground() {
  var apiKey = "mtgokT6He8dnLIfauUW5N4WJZMjUmto2WIxC43ggh3E";
  var urlData = new URL(
    "https://source.unsplash.com/1600x900/?nature,mountains,beach&client_id=${apiKey}"
  );
  $(".backgroundLayout").css("background-image", `url(${urlData})`); //Set the background image
}

var first_click = true;
function searchIconClick() {
  if (first_click == true) {
    $(".searchInput").css("opacity", "100");
    first_click = false;
  } else if (first_click == false) {
    $(".searchInput").css("opacity", "0");
    first_click = true;
  }
}

function getWeather(lat, lon) {
  var apiURI =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=fe6e1549be27ad99dfa748f2b6362337";

  $.ajax({
    url: apiURI,
    dataType: "json",
    type: "GET",
    async: "false",
    success: function (resp) {
      console.log(apiURI);
      console.log(resp.name);

      if (resp.name) {
        $(".weatherLocation").html(resp.name);
      }
      if (resp.main.temp) {
        var cels = resp.main.temp - 273.15;
        console.log(cels);
        var celsFormat = cels.toFixed(2);
        $("#weatherTemp").html(`${celsFormat}&#176`);
      }

      if (resp.weather) {
        var imgURL =
          "http://openweathermap.org/img/w/" + resp.weather[0].icon + ".png";
        console.log(imgURL);
        document.getElementById("weatherIcon").src = imgURL;
      }
    },
    error: function (resp) {
      alert("Error: " + e);
      clearInterval(updateinter);
    },
  });
}
