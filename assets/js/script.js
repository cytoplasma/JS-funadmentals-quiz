// tracker variables
var indexQ = 0;
var timerID;

//variables mad efor DOM references!
var questionEl = document.getElementById('questions')
var timerEl = document.getElementById('timer')
var choicesEl = document.getElementById('choices')
var submitBtn = document.getElementById('submit')
var startBtn = document.getElementById('start')


//sort out functions that are needed for simplicity

//this funciton's purpose is to change the css property
//from hidden to showing the questions and the hiding the start
function startQuiz() {
    //start by hiding the start screen
    //reveal the questions by changing 'display:none'
    var startScreenEl = document.getElementById('starting');
    startScreenEl.setAttribute('class', 'invis');

    questionEl.removeAttribute('class');
    
    timerID = setInterval(clockTick, 1000);

    timerEl.textContent = time;

    showQuestion();
}

//function's purpose: quiz questions are revealed one by one
function showQuestion() {
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
function questionAnswer() {

}

//function's purpose: the timer is synced with the quiz ending,
//and you are able to save your results with an initial
function quizEnd() {

}

//function's purpose: makes saving scores/highscore.html functional
function saveScore() {

}

//function's purpose: incorporates a functional timer concept into the quiz.
function timerTick() {

}

//need to incorporate interactive methods like .onclick (need to look more into it)


// start application/test code

startBtn.onclick = startQuiz;