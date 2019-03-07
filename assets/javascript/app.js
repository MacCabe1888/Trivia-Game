$(document).ready(function() {

    var intervalID;

    $("#timer").hide();
    $("#question").hide();
    $("#answer-choices").hide();
    $("#results-screen").hide();

    $(".start").on("click", reset);

    function reset() {
        trivia = [
            ["Which of the following is not one of New Orleans's Mardi Gras colors?", ["green", "gold", "blue", "purple"], "blue"],
            ["What is Mardi Gras known as in the Christian calendar?", ["Ash Tuesday", "Shrove Tuesday", "Fat Tuesday", "Good Tuesday"], "Shrove Tuesday"],
            ["In what year was the first Mardi Gras celebration in North America held?", ["1697", "1703", "1715", "1726"], "1703"],
            ["Where did the tradition of Mardi Gras in America begin?", ["New Orleans, LA", "Memphis, TN", "Mobile, AL", "Baton Rouge, LA"], "Mobile, AL"],
            ["The first Mardi Gras parade held in New Orleans is recorded to have taken place in what year?", ["1737", "1792", "1815", "1837"], "1837"],
            ["Which of these relatively small countries features one of the largest Carnival celebrations in the world?", ["Jamaica", "Trinidad and Tobago", "Grenada", "Barbados"], "Trinidad and Tobago"],
            ["What did the Mardi Gras colors of New Orleans originally represent?", ["the American flag", "the French imperial navy", "the Russian royal family", "Cajun cultural traditions"], "the Russian royal family"],
            ["Which of the following is not a traditional part of Mardi Gras in New Orleans?", ["beads", "king cake", "parade floats", "eating contests"], "eating contests"], 
            ["Many Mardi Gras events are organized by private clubs known as _____.", ["krewes", "companies", "brotherhoods", "orders"], "krewes"], 
            ["What is hidden inside a king cake?", ["a necklace", "a coin", "a doll", "a plastic baby"], "a plastic baby"],
            ["The Mardi Gras parade season in New Orleans sometimes overlaps with what other annual event?", ["the World Series", "the Super Bowl", "Groundhog Day", "St. Patrick's Day"], "the Super Bowl"],
            ["Which of the following are not commonly thrown at Mardi Gras parades?", ["stuffed animals", "beads", "doubloons", "hacky sacks"], "hacky sacks"], 
            ["Which of the following symbols is associated with Mardi Gras and with Louisiana culture more generally?", ["fleur-de-lis", "caduceus", "Gallic rooster", "ichthys"], "fleur-de-lis"],
            ["How many times has Mardi Gras been cancelled in New Orleans, as of 2019?", ["1", "5", "9", "13"], "13"],
            ["Which of the following has not been a major cultural influence on the history of Mardi Gras?", ["Hollywood", "French culture", "paganism", "the Catholic Church"], "Hollywood"],
            ["The precise date of Mardi Gras, which varies from year, is determined by _____.", ["lottery", "astrology", "Easter", "the Pope"], "Easter"],
            ["Which of the following events resulted in the cancellation of Mardi Gras festivities in New Orleans?", ["World War II", "Prohibition", "The Great Depression", "Hurricane Katrina"], "World War II"],
            ["The Carnival season begins on _____.", ["Pentecost", "Christmas", "Epiphany", "Mardi Gras"], "Epiphany"],
            ["The king cake is named in reference to whom?", ["the biblical Magi", "Louis XIV", "Charlemagne", "the Russian royal family"], "the biblical Magi"],
            ["Who was the first King of Mardi Gras?", ["Andrew Jackson", "Alexei Alexandrovich", "Abraham Lincoln", "Jean-Baptiste Le Moyne de Bienville"], "Alexei Alexandrovich"]
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