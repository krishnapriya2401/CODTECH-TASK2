const startButton = document.getElementById('start-btn');
const nextButton = document.getElementById('next-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtonsElement = document.getElementById('answer-buttons');

let shuffledQuestions, currentQuestionIndex;
let score = 0;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add('hide');
  shuffledQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  score = 0; // Reset score at the start of the game
  questionContainerElement.classList.remove('hide');
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  question.answers.forEach(answer => {
    const button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}

function resetState() {
  clearStatusClass(document.body);
  nextButton.classList.add('hide');
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct) {
    score++; // Increment score for correct answers
  }
  setStatusClass(document.body, correct);
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct);
  });
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide');
  } else {
    showFinalScore();
    startButton.innerText = 'Restart';
    startButton.classList.remove('hide');
  }
}

function showFinalScore() {
  questionContainerElement.innerHTML = `
    <h2>Your Score: ${score}/${questions.length}</h2>
  `;
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add('correct');
  } else {
    element.classList.add('wrong');
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct');
  element.classList.remove('wrong');
}

const questions = [
  {
    question: "Which Indian company recently surpassed $100 billion in market valuation?",
    answers: [
      { text: "TCS", correct: true },
      { text: "Infosys", correct: false },
      { text: "Wipro", correct: false },
      { text: "Reliance Industries", correct: false },
    ],
  },
  {
    question: "What is the name of India's indigenously developed AI chatbot?",
    answers: [
      { text: "BharatGPT", correct: true },
      { text: "DesiBot", correct: false },
      { text: "VaniAI", correct: false },
      { text: "IndicAI", correct: false },
    ],
  },
  {
    question: "Which city in India is leading in semiconductor manufacturing?",
    answers: [
      { text: "Hyderabad", correct: true },
      { text: "Bengaluru", correct: false },
      { text: "Pune", correct: false },
      { text: "Chennai", correct: false },
    ],
  },
  {
    question: "Which Indian organization successfully launched Chandrayaan-3?",
    answers: [
      { text: "ISRO", correct: true },
      { text: "DRDO", correct: false },
      { text: "HAL", correct: false },
      { text: "BARC", correct: false },
    ],
  },
];
