var timerEl = document.getElementById("timer");
const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.getElementById("score");

let currentQestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let time = 80;
let timer;
let penalty = 25;
let applyPenalty = false;

let questions = [
  {
    question: "Commonly used data types Do Not include:",
    choice1: "Stings",
    choice2: "booleans",
    choice3: "Alerts",
    choice4: "Numbers",
    answer: 3,
  },
  {
    question: "The condition in an If/Else statment is enclosed within ____:",
    choice1: "Quotes",
    choice2: "Curly brackets",
    choice3: "Parentheses",
    choice4: "Square brackets",
    answer: 3,
  },
  {
    question: "Arrays in javascript can be used to Store ___:",
    choice1: "Number and Strings",
    choice2: "Other Arrays",
    choice3: "Booleans",
    choice4: "All of the Above",
    answer: 1,
  },
  {
    question:
      "Strings values must be enclosed within ____ when being assigned to a variables:",
    choice1: "Commas",
    choice2: "Curly brackets",
    choice3: "Quotes",
    choice4: "Parentheses",
    answer: 3,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "Javascript",
    choice2: "Bash/Terminal",
    choice3: "For Loop",
    choice4: "Console.log",
    answer: 4,
  },
  {
    question: "Why do JavaScript and Java have similar name:",
    choice1: "JavaScript is a stripped-down version of Java",
    choice2: "JavaScript's syntax is loosely based on Java's",
    choice3: "They both originated on the island of Java",
    choice4: "None of the above",
    answer: 2,
  },
  {
    question:
      "Which of the following are capabilities of functions in JavaScript?:",
    choice1: "Return a value",
    choice2: " Accept parameters and Return a value",
    choice3: "Accept parameters",
    choice4: "None of the above",
    answer: 3,
  },
  {
    question:
      "Which of the following is not a valid JavaScript variable name?:",
    choice1: "2names",
    choice2: "_first_and_last_names",
    choice3: "FirstAndLast",
    choice4: "None of the above",
    answer: 1,
  },
];

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 8;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuestions = [...questions];
  getNewQuestion();
};

const decrementTime = () => {
  time = time - 1;
  if (applyPenalty) {
    time = time - penalty;
    applyPenalty = false;
  }
  if (time < 80) {
    timerEl.innerHTML = `Time Left: ${time}`;
  }
  if (time < 1) {
    window.location.assign("end.html");
  }
};

getNewQuestion = () => {
  if (availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);

    return window.location.assign("end.html");
  }

  questionCounter++;
  progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`;

  const questionsIndex = Math.floor(Math.random() * availableQuestions.length);
  currentQuestion = availableQuestions[questionsIndex];
  question.innerText = currentQuestion.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuestions.splice(questionsIndex, 1);

  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (e) => {
    if (!acceptingAnswers) return;
    timer = setInterval(decrementTime, 1000);

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    let classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(SCORE_POINTS);
    }

    selectedChoice.parentElement.classList.add(classToApply);
    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});
incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};
startGame();
