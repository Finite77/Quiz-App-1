import { questions } from './questions.js';
let questionNumber = 0;
const quizContainer = document.getElementById('page');

let divs = [];
/*  Reduces repetitive scripts by putting all the buttons in one place */
let buttonss = [
    document.getElementById('option1'),
    document.getElementById('option2'),
    document.getElementById('option3'),
    document.getElementById('option4')

];

let answers = [];
/* A function to create a div and move buttons to new div */
function createDiv() {
divs[questionNumber] = document.createElement('div');
divs[questionNumber].classList.add('qbox');
document.getElementById('page').appendChild(divs[questionNumber]);
divs[questionNumber].appendChild(document.getElementById('quizQuestion'));
buttonss.forEach((button) => {
    divs[questionNumber].appendChild(button);
})
};
/* I spent an age debugging this.... Switching everything up etc. All to find out that the problem was in the other file! 
This function creates the div and updates the buttons and header, then removes the old div.... */
function onClicker() {
    createDiv();
    document.getElementById('quizQuestion').textContent = questions[questionNumber].Question;
    buttonss[0].textContent = questions[questionNumber].Answers[0];
    buttonss[1].textContent = questions[questionNumber].Answers[1];
    buttonss[2].textContent = questions[questionNumber].Answers[2];
    buttonss[3].textContent = questions[questionNumber].Answers[3];
   
    setTimeout(() => {if (divs[questionNumber - 1]) {
        divs[questionNumber - 1].remove();
    }}, 0)
    };

    /* Tell user the quiz has ended and show result */
    function endFunc () {
        let ender =  document.createElement('div');
        ender.classList.add('qbox');
        let res = document.createElement('h1');
        let last = document.createElement('p');
        ender.appendChild(res);
        ender.appendChild(last);
        res.textContent = 'END OF QUIZ';
        let counter = 0;
        answers.forEach((answer) => {
            if (answer === 'Correct!') {
                counter++;
            };
        })
        last.textContent = `${counter}/${questions.length - 1}`;
        quizContainer.innerHTML = '';
        quizContainer.appendChild(ender)
    };

    /* Answered is defaulted as false. This is to make sure that users do not click multiple buttons, potentially breaking the debugging system */
    let answered = false;
    /* Displays the correct and incorrect answer, delays, and moves on to the next question */
    buttonss.forEach((button) => {
        button.addEventListener('click', () => {
            if (!answered) {
                answered = true;
            if(button.textContent === questions[questionNumber].CorrAns) {
            button.style.backgroundColor = 'green';
            answers[questionNumber] = 'Correct!';
            questionNumber++;
            setTimeout(() => next(), 2000);
        } else {
            answers[questionNumber] = 'Incorrect!' ;
            button.style.backgroundColor = 'red';
            buttonss.forEach((button) => {
                if(button.textContent === questions[questionNumber].CorrAns) {
                    button.style.backgroundColor = 'green';
                }
            })
            questionNumber++;
            setTimeout(() => next(), 2000);
        }

    }})});
/* A function to make sure everything works well on the next question (E.g. resets button colours) */
function next () {
    buttonss.forEach((button) => {
        button.style.backgroundColor = 'white';
    })
     if (questions[questionNumber].Question === 'END') {
        questionNumber++;
        endFunc();
    } else {
        onClicker();
        answered = false;
    }
};
/* Starts the page up */
window.addEventListener('DOMContentLoaded', () => {
    onClicker();
});

/* 
Reflection: In hindsight, It seems the code could have been a lot simpler. 
However, it allowed me to face new problems and ultimately I believe I learnt more in this way.
Thanks for trying out my project. 

PS: The CSS was written by Visual Studio Code's awesome AI.
To ensure I actually wrote the JavaScript code, I turned the AI off while writing it.

Michael B - 18/08/25 

*/
