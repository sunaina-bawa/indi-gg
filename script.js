// quiz.js

const questions = [
  {
    question: "What is JavaScript?",
    options: ["A programming language", "A fruit", "A car brand", "A movie"],
    answer: "A programming language",
  },
  {
    question: "Which keyword is used to declare a variable?",
    options: ["var", "let", "const", "both b and c"],
    answer: "both b and c",
  },
  {
    question: "What is the result of 2 + 2?",
    options: ["3", "4", "5", "6"],
    answer: "4",
  },
  {
    question: "What is the full form of HTML?",
    options: [
      "Hyperlink Text Markup Language",
      "Hyper Transfer Markup Language",
      "Hypertext Markup Language",
      "High-Level Text Markup Language",
    ],
    answer: "Hypertext Markup Language",
  },
  {
    question:
      "Which built-in method removes the last element from an array and returns that element?",
    options: ["pop()", "push()", "remove()", "delete()"],
    answer: "pop()",
  },
];

let currentQuestion = 0;
let score = 0;
let timer;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const timerElement = document.getElementById("timer");
const submitButton = document.getElementById("submit");
const nextButton = document.getElementById("next");
const restartButton = document.getElementById("restart");

function loadQuestion() {
  const currentQ = questions[currentQuestion];
  questionElement.textContent = currentQ.question;
  optionsElement.innerHTML = "";

  currentQ.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectOption(button, index));
    optionsElement.appendChild(button);
  });

  let timeLeft = 20;

  timerElement.textContent = `Time left: ${timeLeft} seconds`;

  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `Time left: ${timeLeft} seconds`;

    if (timeLeft <= 0) {
      clearInterval(timer);
      selectOption(null, -1);
    }
  }, 1000);
}

function selectOption(button, selectedOptionIndex) {
  const allOptions = optionsElement.querySelectorAll("button");
  allOptions.forEach((optionButton) => {
    optionButton.classList.remove("selected");
  });

  if (selectedOptionIndex !== -1) {
    button.classList.add("selected");
    clearInterval(timer);
    submitButton.style.display = "block";
  }
}

function showCorrectAnswer() {
  const currentQ = questions[currentQuestion];
  feedbackElement.textContent = "Correct Answer: " + currentQ.answer;
}

function checkAnswer() {
  const selectedOptionIndex = Array.from(
    optionsElement.querySelectorAll("button")
  ).findIndex((btn) => btn.classList.contains("selected"));

  if (selectedOptionIndex === -1) {
    feedbackElement.textContent = "Time's up! Please select an answer.";
    return;
  }

  const currentQ = questions[currentQuestion];
  if (currentQ.options[selectedOptionIndex] === currentQ.answer) {
    score++;
    feedbackElement.textContent = "Correct!";
    optionsElement.querySelector("button.selected").style.backgroundColor =
      "#28a745";
  } else {
    feedbackElement.textContent = "Incorrect.";
    optionsElement.querySelector("button.selected").style.backgroundColor =
      "#dc3545";
  }

  showCorrectAnswer();
  submitButton.style.display = "none";
  nextButton.style.display = "block";
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
    feedbackElement.textContent = "";
    submitButton.style.display = "none";
    timerElement.style.display = "block";
    nextButton.style.display = "none";
  } else {
    showResult();
  }
}

function showResult() {
  clearInterval(timer);
  questionElement.textContent = "Quiz Completed!";
  optionsElement.innerHTML = "";
  feedbackElement.textContent = `Your Score: ${score} out of ${questions.length}`;
  timerElement.style.display = "none";
  submitButton.style.display = "none";
  nextButton.style.display = "none";
  restartButton.style.display = "block";
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  loadQuestion();
  feedbackElement.textContent = "";
  restartButton.style.display = "none";
  submitButton.style.display = "block";
  timerElement.style.display = "block";
}

loadQuestion();
restartButton.addEventListener("click", restartQuiz);
submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextQuestion);
