var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var gameStarted = false;
var gameTimeout;

function startGame() {
  if (!gameStarted) {
    gameStarted = true;
    $("#level-title").text("Level " + level);
    setTimeout(function () {
      nextSequence();
    }, 600);
  }
}

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];

  $("#" + randomChosenColour)
    .fadeOut(100)
    .fadeIn(100);
  playSound(randomChosenColour);
  gamePattern.push(randomChosenColour);
  level++;
  $("#level-title").text("Level " + level);
}

function checkAnswer() {
  var currentAnswer = userClickedPattern.length - 1;
  if (userClickedPattern[currentAnswer] === gamePattern[currentAnswer]) {
    if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      clearTimeout(gameTimeout); // Clear the timeout if answer is correct
      gameTimeout = setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    startOver();
  }
}

function startOver() {
  playSound("wrong");
  userClickedPattern = [];
  gamePattern = [];
  level = 0;
  gameStarted = false;
  $("#level-title").text("Game Over, Press Any Button to Restart");
  $("body").addClass("game-over");
  setTimeout(function () {
    $("body").removeClass("game-over");
  }, 200);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animateClick(currentColour) {
  $(currentColour).addClass("pressed");
  setTimeout(function () {
    $(currentColour).removeClass("pressed");
  }, 100);
}

$("div.btn").click(function () {
  if (!gameStarted) {
    startGame();
  } else {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animateClick(this);
    userClickedPattern.push(userChosenColor);
    checkAnswer();
  }
});

$(document).ready(function () {
  // Remove the keydown event for starting the game
});
