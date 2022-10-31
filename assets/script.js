const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById
('question-container')
const questionElement= document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
const timerText = document.querySelector('.time-text')
const timer = document.getElementById('countdown')
const score = document.getElementById('score')

let countdown = 60
let shuffledQuestions, currentQuestionsIndex

//add event listener to start quiz button
startButton.addEventListener('click', startQuiz)
nextButton.addEventListener('click', () => {
    currentQuestionsIndex++
    nextQuestion()
})

// set the timer
function setTime() {
    var timeInterval = setInterval(function() {
        countdown--;
        timer.textContent = countdown + ' Until end of Quiz!';

        if(countdown === 0) {
            clearInterval(timeInterval);
            sendMessage();
        }
    }, 1000);
}

// start quiz fuction and timer
function startQuiz(){
    console.log('started')
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionsIndex = 0
    questionContainerElement.classList.remove('hide')
    nextQuestion()
}

// ramdomizes questions
function nextQuestion(){
    resetState()
    showQuestion(shuffledQuestions[currentQuestionsIndex])

}

// Places the questions in the button
function showQuestion(question){
    questionElement.innerText = question.question
    question.answer.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

// clear the background after question is answered 
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild){
        answerButtonsElement.removeChild
        (answerButtonsElement.firstChild)
    }
       
}

// checks and see if there are more questions in the quiz
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionsIndex + 1) {
        nextButton.classList.remove('hide')
    } else { 
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
    
}

// function to check correct answers 
function setStatusClass(element, correct){
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct') 
            
     }  else{
                element.classList.add('wrong')
            }
}
// removed right and wrong asnwers 
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

// ends the quiz 
function sendMessage() {
    timeEl.textContent = "Quiz is Over!"
}
 
// questions for the quiz
const questions = [
    
    {
        question: 'What is NOT an example of a Javascript data type?',
        answer: [ 
         {text: 'String',correct: false},
         {text: 'Boolean', correct: false}, 
         {text: 'Number', correct: false},
         {text: 'Symbol', correct: true},
         {text: 'Object', correct: false} 
        
        ]
        
    },
    {
        question: 'Which company created Javascript?',
        answer: [
        {text: 'Netscape', correct: true}, 
        {text: 'Adobe', correct: false}, 
        {text: 'IBM', correct: false}, 
        {text: 'MSC Software', correct: false}, 
        {text: 'Facebook', correct: false}
        
        ]
       
    },
    {
        question: 'What does the === operator represent?',
        answer: [
            {text: 'Equal to', correct: false}, 
            {text: 'Ternary operator', correct: false} , 
            {text: 'Equal value and equal type', correct: true} , 
            {text: 'Typeof', correct: false} , 
            {text: 'Less than', correct: false} 
        
        ]
    },
    {
        question: 'What is Null in Javascript?',
        answer: [
            {text: 'Broken code', correct: false}, 
            {text: 'A function', correct: false},
            {text:'Intentional absence of object value', correct: true},  
            {text: 'A Javascript variable', correct: false}, 
            {text: 'A method', correct: false} 
           
            ] 
    }
]
setTime();