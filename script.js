// Function to fire when DOM is ready
$(document).ready(function () {
  //current time funtcion and interval every 10 seconds;
  setCurrentTime();
  setInterval(function () {
    setCurrentTime();
  }, 10 * 1000);

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
