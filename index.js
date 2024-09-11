var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var level = 0;
var userClickedPattern = [];
var started = false;

$(document).on("keypress", function() {
    if (!started) {
        nextSequence();
        $("h1").text("Level " + level);
        started = true; // Ensure the game starts only once
    }
});

$(document).on("click", function() {
    if (!started) {
        nextSequence();
        $("h1").text("Level " + level);
        started = true; // Ensure the game starts only once
    }
});

function nextSequence() {
    userClickedPattern = []; // Clear user pattern for new sequence
    level++;
    $("h1").text("Level " + level);
    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).animate({opacity: 0.2}, 100).animate({opacity: 1}, 100);
    var audio = new Audio("./sounds/" + randomChosenColour + ".mp3");
    audio.play();
}

$(".btn").on("click", function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    
    var audio = new Audio("./sounds/" + userChosenColour + ".mp3");
    audio.play();
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        // console.log("success");
        
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    } else {
        // console.log("wrong");
        $("body").addClass("game-over");
        var audio = new Audio("./sounds/wrong.mp3");
        audio.play();
        
        setTimeout(function() {
            $("body").removeClass("game-over");
            startOver();
        }, 1000);
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = []; // Clear userClickedPattern for a fresh start
    started = false;
    $("h1").text("Game Over, Press any key to restart.");
}
