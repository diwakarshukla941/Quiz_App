const questions = [
    {
        question: "Which is the largest Animal in the World?",
        answers:[
            {text:"shark",correct:false},
            {text:"Blue Whale",correct:true},
            {text:"Jaguar",correct:false},
            {text:"Elephant",correct:false}
        ]
    },
    {
        question: "What is the tallest mountain in the world?",
        answers: [
            {text: "Mount Kilimanjaro", correct: false},
            {text: "Mount Everest", correct: true},
            {text: "K2", correct: false},
            {text: "Mount Fuji", correct: false}
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            {text: "Venus", correct: false},
            {text: "Mars", correct: true},
            {text: "Jupiter", correct: false},
            {text: "Saturn", correct: false}
        ]
    },
    {
        question: "What is the fastest land animal?",
        answers: [
            {text: "Lion", correct: false},
            {text: "Cheetah", correct: true},
            {text: "Horse", correct: false},
            {text: "Greyhound", correct: false}
        ]
    }            
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let Score = 0;

const startQuiz = () => {
    currentQuestionIndex =0;
    Score =0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

const showQuestion = () => {
    // to hide the previous questions and answer
    resetState();
    // for question
   let currentQuestion = questions[currentQuestionIndex];
   let questionNo = currentQuestionIndex + 1; 
   questionElement.innerHTML = questionNo + "." + currentQuestion.question;

//    for answers
   currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML =  answer.text
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click",selectAnswer)

})
}

const resetState = () =>{
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

const selectAnswer =(e) =>{
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        Score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display ="block";

}

const showScore =() => {
    resetState();
    questionElement.innerHTML = `You Scored ${Score} Out Of ${questions.length}!!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

const handleNextButton  = () =>{
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();