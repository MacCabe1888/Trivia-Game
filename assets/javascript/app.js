$(document).ready(function() {

    var intervalID;

    $("#timer").hide();
    $("#question").hide();
    $("#answer-choices").hide();
    $("#results-screen").hide();

    $(".start").on("click", reset);

    function reset() {
        trivia = [
            ["1", ["1", "b", "c", "d"], "1"],
            ["2", ["a", "2", "c", "d"], "2"],
            ["3", ["a", "b", "3", "d"], "3"],
            ["4", ["a", "b", "c", "4"], "4"],
            ["5", ["a", "b", "c", "d"], "a"],
            ["6", ["1", "b", "c", "d"], "1"],
            ["7", ["a", "2", "c", "d"], "2"],
            ["8", ["a", "b", "3", "d"], "3"], 
            ["9", ["a", "b", "c", "4"], "4"], 
            ["10", ["a", "b", "c", "d"], "a"],
            ["11", ["1", "b", "c", "d"], "1"],
            ["12", ["a", "2", "c", "d"], "2"], 
            ["13", ["a", "b", "3", "d"], "3"], 
            ["14", ["a", "b", "c", "4"], "4"], 
            ["15", ["a", "b", "c", "d"], "a"],
            ["16", ["1", "b", "c", "d"], "1"], 
            ["17", ["a", "2", "c", "d"], "2"], 
            ["18", ["a", "b", "3", "d"], "3"], 
            ["19", ["a", "b", "c", "4"], "4"], 
            ["20", ["a", "b", "c", "d"], "a"]
        ];
        time = 15;
        correct = 0;
        incorrect = 0;
        questionsRemaining = trivia.length;
        start();
    }

    function start() {
        $(".start").hide();
        $("#timer").show();
        $("#question").show();
        $("#results-screen").hide();
        i = Math.floor(Math.random() * questionsRemaining);
        question = trivia[i][0];
        choices = trivia[i][1];
        answer = trivia[i][2];
        clearInterval(intervalID);
        intervalID = setInterval(countdown, 1000);
        $("#question").html(question);
        $("#0").html(choices[0]);
        $("#1").html(choices[1]);
        $("#2").html(choices[2]);
        $("#3").html(choices[3]);
        $("#answer-choices").show();
    }

    function countdown() {
        time--;
        $("#timer").html("Time Remaining: " + time);
        if (time === 0) {
            timeout();
            results();
        }
    }

    $("#0").on("click", checkAnswer(0));
    $("#1").on("click", checkAnswer(1));
    $("#2").on("click", checkAnswer(2));
    $("#3").on("click", checkAnswer(3));

    function checkAnswer(j) {
        return function() {
            playerGuess = choices[j];
            if (playerGuess === answer) {
                correctAnswer();
                results();
            }
            else {
                incorrectAnswer();
                results();
            }
        }
    }

    function correctAnswer() {
        correct++;
        $("#results-screen").html("&#9884; Congratulations! You chose the right answer! &#9884;");
    }

    function incorrectAnswer() {
        incorrect++;
        $("#results-screen").html("&#9884; Better luck next time! The correct answer was: " + answer + " &#9884;");
    }

    function timeout() {
        incorrect++;
        $("#results-screen").html("&#9884; Time's up! The correct answer was: " + answer + " &#9884;");
    }

    function results() {
        $("#timer").hide();
        $("#question").hide();
        $("#answer-choices").hide();
        $("#results-screen").show();
        questionsRemaining--;
        trivia.splice(i,1);
        time = 18;
        if (questionsRemaining === 0) {
            setTimeout(end, 3000);
        } else if (time = 18) {
            setTimeout(start, 3000);
        }
    }

    function end() {
        clearInterval(intervalID);
        $("#results-screen").html("<p>&#9884; &#9884; &#9884;</p><p>Game over!</p><p>Correct answers: " + correct + "</p><p>Incorrect answers: " + incorrect + "</p><p>Press Start to play again!</p><p>&#9884; &#9884; &#9884;</p>");
        $(".start").show();
        $("#timer").hide();
        $("#question").hide();
        $("#answer-choices").hide();
        $("#results-screen").show();
    }

})