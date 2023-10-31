const quizData = [
    {
    question: "What is the capital of France?",
    options: ["London", "Madrid", "Paris", "Rome"],
    correctAnswer: "Paris",
    timeLimit: 20
    },
    {
    question: "Which planet is known as the Red Planet?",
    options: ["Mars", "Venus", "Jupiter", "Mercury"],
    correctAnswer: "Mars",
    timeLimit: 15
    },
    {
    question: "Who wrote the play 'Romeo and Juliet'?",
    options: [
    "William Shakespeare",
    "Charles Dickens",
    "Jane Austen",
    "Mark Twain"
    ],
    correctAnswer: "William Shakespeare",
    timeLimit: 25
    },
    {
    question: "What is the largest mammal in the world?",
    options: ["Elephant", "Giraffe", "Blue Whale", "Kangaroo"],
    correctAnswer: "Blue Whale",
    timeLimit: 30
    },
    {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Carbon Dioxide",
    timeLimit: 18
    }
   ];


let start = document.querySelector("#start");
let next = document.querySelector("#next");
let username = document.querySelector("#username");
let password = document.querySelector("#password");

let loginForm = document.querySelector(".loginForm");
let quizContent = document.querySelector(".quizContent");


let timerContent =  document.querySelector(".timerContent");
let timer =  document.querySelector("#timer");

let interval = null;
let time = 0;

start.addEventListener("click",()=>{
  /*   if ( (username.value.length>8)&&  (username.value.length< 18) || (password.value.length>8)&&  (password.value.length< 18)) {
        loginForm.classList.add("hide");
        quizContent.classList.remove("hide");
        start.classList.add("hide");
        next.classList.remove("hide");
    }
    else{
        alert("username & Password must be at least between 8 and 18 characters");
    }
     */

    loginForm.classList.add("hide");
    quizContent.classList.remove("hide");
    start.classList.add("hide");
    next.classList.remove("hide");

    loadQuestions(counter);

});

//=============================================================
// let question = document.querySelector("#question");
// let options = document.querySelector(".answerContent");

// let QCounter = 0;
// function load(QCounter){
//     let ques = quizData[QCounter].question
//     let answers = quizData[QCounter].options // []
//     question.innerHTML = ques;
//     answers.forEach(ans=>{
//         options.innerHTML += `
//         <div>
//             <input type="radio" name="answer" id="${ans}" value="${ans}" checked>
//             <label for="answer1">${ans}</label>
//         </div>
//         `;
//     })
//     // console.log(question)
//     // console.log(options)
// }
// load(QCounter)
//==============================================


let question = document.querySelector("#question")
let answersContainer = document.querySelector(".answerContent")

let counter = 0
let score = 0
function loadQuestions (counter){
    time = quizData[counter].timeLimit
    answersContainer.innerHTML =''
    let ques = quizData[counter].question;
    let answers = quizData[counter].options; //[]

    question.innerHTML = ques;
    answers.forEach(ans => {
        answersContainer.innerHTML += `
        <div>
            <input type="radio" name="answer" id="${ans}" value="${ans}" onchange="checkAns(event)" >
            <label for="${ans}">${ans}</label>
        </div>
        `
    })

    counterFun(time)

}

function checkAns(e){
    if(e.target.value === quizData[counter].correctAnswer) 
        score++
}

// loadQuestions(counter);

next.addEventListener("click",()=>{
    if(next.innerText.toLowerCase() == 'next'){
        if(counter<quizData.length-1) {
            counter++
            rest()
            loadQuestions(counter);

        } else {
            question.innerHTML = 'Your Score:'
            answersContainer.innerHTML = `
            <div>
                <h3>${score} / ${quizData.length} </h3>
            </div>
            `
            next.innerText = 'quit'
            timerContent.classList.add("hide")
            rest()
        }
    } else {
         window.location.reload()
    }
})

function counterFun(time){
   
    timer.innerHTML = time
    interval = setInterval(()=>{
        time--;
    timer.innerHTML = time
        /* if(time < 10){
            time = `0${time}`
        } */
        if(time < 0) {
            /* counter++
            loadQuestions(counter) */
            next.click()
        }
        // console.log(time)
    },1000)
}

function rest(){
    clearInterval(interval)
    interval = null
}
