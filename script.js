let buttonColours = ["red", "blue", "green", "yellow"]; //Color Default Pattern
let gamePattern = []; //Generated Pattern
let userClickedPattern = []; //User Answer's Pattern
let level = 0;
let started = false;

/* Trigger to Start the Game */
$(document).keypress(function () {
    if (!started) {
        $("level-title").text("Level " + level);
        nextSequence();
        started = true; 
        /* $(".container").css("pointer-events", "auto"); */
    }
    
});

/* User Pattern Answer */
$(".btn").click(function () {
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

/* User Pattern Answer's Checker */
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    } else {
        /* Game Over */
        console.log("Wrong!");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over")
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        /* $(".container").css("pointer-events", "none") */; // It'll lock the mouseclick;
        startOver();
    }
}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    //Picking a random color based on a random number generated
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn("fast").fadeOut("fast").fadeIn("fast");
    playSound(randomChosenColour);
}

/* Game Sound */
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

/* Game Animation */
function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

/* Restart */
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}
