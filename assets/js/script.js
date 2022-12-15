// tracker variables
var indexQ = 0;
var timeLeft = questions.length * 15;
var time = document.querySelector("#time");

//variables mad efor DOM references!
var questionEl = document.getElementById('questions');
var timerEl = document.getElementById('timer');
var choicesEl = document.getElementById('choices');
var submitBtn = document.getElementById('submit');
var startBtn = document.getElementById('start');
var initialsEl = document.getElementById('initials');
var feedbackEl = document.getElementById('feedback');


//sort out functions


//function's purpose: incorporates a functional timer concept into the quiz.
function timerTick() {
    var timerInterval = setInterval(function() {
        timeLeft--;
        time.textContent = timeLeft + " seconds left"
        if (timeLeft === 1) {
            time.textContent = timeLeft + "1 second left"
        } else if (timeLeft === 0) {
            time.textContent = "Out of time"
            clearInterval(timer);
        }
    }, 1000);
}


//this funciton's purpose is to change the css property
//from hidden to showing the questions and the hiding the start
function startQuiz() {
    timerTick();
    //start by hiding the start screen
    //reveal the questions by changing 'display:none'
    var startScreenEl = document.getElementById("starting");
    startScreenEl.setAttribute("class", "invis");

    questionEl.removeAttribute("class");
    
    //begins the timer
    timerId = setInterval(clockTick, 1000);


    //showing starting time
    timerEl.textContent = time;

    getQuestions();
}

//function's purpose: quiz questions are revealed one by one
function getQuestions() {
    //todo: i want to reveal questions that are stored in
    //an array inside of a separate js file
    var currentQuestion = questions[indexQ];
    
    var titleEl = document.getElementById('question-header');
    titleEl.textContent = currentQuestion.title;

    for (var i = 0; i < currentQuestion.choices.length; i++) {
        var choice = currentQuestion.choices[i]
        var choiceBtn = document.createElement('button');
        choiceBtn.setAttribute('class', 'choice');
        choiceBtn.setAttribute('value', choice);
        // numbered
        choiceBtn.textContent = i + 1 + '. ' + choice;
        //import onto the page
        choicesEl.appendChild(choiceBtn);
    }
}

//function's purpose: quiz becomes functional
function questionClick(event) {
    var buttonEl = event.target;
  
    // if the clicked element is not a choice button, do nothing.
    if (!buttonEl.matches('.choice')) {
      return;
    }
  
    // check if user guessed wrong
    if (buttonEl.value !== questions[indexQ].answer) {
      // penalize time
      time -= 15;
  
      if (time < 0) {
        time = 0;
      }
  
      // display new time on page
      timerEl.textContent = time;
  
      feedbackEl.textContent = 'Wrong!';
    } else {
      feedbackEl.textContent = 'Correct!';
    }
  
    // flash right/wrong feedback on page for half a second
    feedbackEl.setAttribute('class', 'feedback');
    setTimeout(function () {
      feedbackEl.setAttribute('class', 'feedback hide');
    }, 1000);
  
    currentQuestionIndex++;
  
    // check if we've run out of questions
    if (time <= 0 || currentQuestionIndex === questions.length) {
      quizEnd();
    } else {
      getQuestion();
    }
  }
  

//function's purpose: the timer is synced with the quiz ending,
//and you are able to save your results with an initial
function quizEnd() {
  clearInterval(timerId);
  var endScreenEl = document.getElementById('end-screen');
  endScreenEl.removeAttribute('class');
  var finalScoreEl = document.getElementById('final-score');
  finalScoreEl.textContent = time;
  questionsEl.setAttribute('class', 'hide');
}

//function's purpose: makes saving scores/highscore.html functional
function saveScore() {
  var initials = initialsEl.value.trim();
  if (initials !== '') {
    var highscores = JSON.parse(window.localStorage.getItem('highscores')) || [];

    var newScore = {
      score: time,
      initials: initials,
    };
    highscores.push(newScore);
    window.localStorage.setItem('highscores', JSON.stringify(highscores));
    window.location.href = "highscores.html";
  }
}



//need to incorporate interactive methods like .onclick (need to look more into it)
function checkForEnter(event) {
  if (event.key === 'Enter') {
    saveHighscore();
  }
}

// start application/test code

startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;

choicesEl.onclick = questionClick;
initialsEl.onkeyup = checkForEnter;