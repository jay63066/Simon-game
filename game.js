var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var level = 0;
var sequenceNumber=0;

function nextSequence() {
  level++;
  userClickedPattern.length=0;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).delay(500).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}


$(".btn").click(function() {
  var userChosencolour = $(this).attr("id");
  userClickedPattern.push(userChosencolour);
  playSound(userChosencolour);
  animatePress(userChosencolour);


    if(userClickedPattern[sequenceNumber]==gamePattern[sequenceNumber] && (sequenceNumber)==(gamePattern.length-1)){
      sequenceNumber=0;
      nextSequence();
    }
    else if(userClickedPattern[sequenceNumber]==gamePattern[sequenceNumber]){
      sequenceNumber++;
    }
    else{
      sequenceNumber=0;
      level=0;
      gamePattern.length=0;
      userClickedPattern.length=0;

      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
      },200);
      $("h1").text("game over press any key to start");

    }

});

function playSound(name) {
  var audio = new Audio('sounds/' + name + '.mp3');
  return audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 50);
}

$("body").on("keydown", function() {
  if (level === 0) {
    nextSequence();
  }
});
