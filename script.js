const questions = [
    {
        question: "What does the acronym CSS stand for?",
        answers: [
            { text: "Cascading Style Sheets", correct: true },
            { text: "Computer Style Sheets", correct: false },
            { text: "Creative Style Sheets", correct: false },
            { text: "Colorful Style Sheets", correct: false },
        ]
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image?",
        answers: [
            { text: "longdesc", correct: false },
            { text: "description", correct: false },
            { text: "alt", correct: true },
            { text: "tittle", correct: false },
        ]
    },
    {
        question: "What is the purpose of the float property in CSS?",
        answers: [
            { text: "To change the font size of an element.", correct: false },
            { text: "To position an element to the left or right of its container.", correct: true },
            { text: "To change the color of an element.", correct: false },
            { text: "To create a new layer in the document.", correct: false },
        ]
    },
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "Hyper Text Markup Language", correct: true },
            { text: "Hyperlinks Text Markup Language", correct: false },
            { text: "Home Tool Markup Language", correct: false },
            { text: "Home Text Markup Language", correct: false },
        ]
    },
    {
        question: "What is the purpose of the querySelector method in JavaScript?",
        answers: [
            { text: "To select an element by its ID.", correct: false },
            { text: "To select an element based on a CSS selector", correct: true },
            { text: "To select an element by its tag name.", correct: false },
            { text: "To select all elements of a specific type.", correct: false },
        ]
    },
    {
        question: "What does the typeof operator return?",
        answers: [
            { text: "The data type of a variable.", correct: true },
            { text: "The value of a variable.", correct: false },
            { text: "The memory address of a variable.", correct: false },
            { text: "The length of a variable.", correct: false },
        ]
    },
    {
        question: "How do you declare a variable in JavaScript?",
        answers: [
            { text: "variableName = value;", correct: false },
            { text: "let variableName = value;", correct: false },
            { text: "const variableName = value;", correct: false },
            { text: "All of the above.", correct: true },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerHTML = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) score++;

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true") button.classList.add("correct");
        else button.classList.add("incorrect");
        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) showQuestion();
    else showScore();
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) handleNextButton();
    else startQuiz();
});

startQuiz();
