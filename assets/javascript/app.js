$(document).ready(function() {

    let correct = 0;
    let incorrect = 0;

    let time = 16;
    var intervalID;

    $("#answer-choices").hide();

    $("#start").on("click", reset);

    function reset() {
        trivia = [
            ["1", ["1", "b", "c", "d", "e"], "1"],
            ["2", ["a", "2", "c", "d", "e"], "2"],
            ["3", ["a", "b", "3", "d", "e"], "3"],
            ["4", ["a", "b", "c", "4", "e"], "4"],
            ["5", ["a", "b", "c", "d", "5"], "5"],
            ["6", ["1", "b", "c", "d", "e"], "1"],
            ["7", ["a", "2", "c", "d", "e"], "2"],
            ["8", ["a", "b", "3", "d", "e"], "3"], 
            ["9", ["a", "b", "c", "4", "e"], "4"], 
            ["10", ["a", "b", "c", "d", "5"], "5"],
            ["11", ["1", "b", "c", "d", "e"], "1"],
            ["12", ["a", "2", "c", "d", "e"], "2"], 
            ["13", ["a", "b", "3", "d", "e"], "3"], 
            ["14", ["a", "b", "c", "4", "e"], "4"], 
            ["15", ["a", "b", "c", "d", "5"], "5"],
            ["16", ["1", "b", "c", "d", "e"], "1"], 
            ["17", ["a", "2", "c", "d", "e"], "2"], 
            ["18", ["a", "b", "3", "d", "e"], "3"], 
            ["19", ["a", "b", "c", "4", "e"], "4"], 
            ["20", ["a", "b", "c", "d", "5"], "5"]
        ];
        time = 16;
        correct = 0;
        incorrect = 0;
        questionsRemaining = trivia.length;
        start();
    }

    function start() {
        $("#start").hide();
        $("#timer").show();
        $("#question").show();
        //$("#answer-choices").show();
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
        $("#4").html(choices[4]);
        $("#answer-choices").show();
    }

    function countdown() {
        time--;
        $("#timer").html("Time Remaining: " + time + "s");
        if (time === 0) {
            timeout();
            results();
        }
    }

    $("#0").on("click", checkAnswer(0));
    $("#1").on("click", checkAnswer(1));
    $("#2").on("click", checkAnswer(2));
    $("#3").on("click", checkAnswer(3));
    $("#4").on("click", checkAnswer(4));

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
        $("#results-screen").html("Congratulations! You chose the right answer!");
    }

    function incorrectAnswer() {
        incorrect++;
        $("#results-screen").html("Better luck next time! The correct answer was: " + answer);
    }

    function timeout() {
        incorrect++;
        $("#results-screen").html("Time's up! The correct answer was: " + answer);
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
        $("#results-screen").html("Game over! Correct answers: " + correct + " Incorrect answers: " + incorrect + " Press Start to play again!");
        $("#start").show();
        $("#timer").hide();
        $("#question").hide();
        $("#answer-choices").hide();
        $("#results-screen").show();
    }

})