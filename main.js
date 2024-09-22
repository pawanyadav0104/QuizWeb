const question = document.querySelector("#question");
//console.log(question);
const progresstext=document.getElementById("progresstext");
const scoretext=document.getElementById("score");
//const =document.getElementById("progressbarfull");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
let questions=[];

fetch("https://opentdb.com/api.php?amount=10&category=18&difficulty=medium").then(res=>{
    //console.log(res);
    return res.json();
}).then(loadedQuestions=>{
    console.log(loadedQuestions.results);
    questions=loadedQuestions.results.map(loadedQuestions=>{
        const formatQuestion={
           question:loadedQuestions.question
        };
        const answerChoices=[...loadedQuestions.incorrect_answers];
        formatQuestion.answer=Math.floor(Math.random()*5)+1;
        answerChoices.splice(formatQuestion.answer -1,0,loadedQuestions.correct_answer);
        answerChoices.forEach((choice,index)=>{
            formatQuestion["choice"+(index+1)]=choice;
        })

        return formatQuestion;

    })
    // questions=loadedQuestions;
     StartGame();
}).catch(err=>{
    console.log(err);
})


const correctBonus = 10;
const maxQuestions = 5;

StartGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= maxQuestions) {
        // End the game
        localStorage.setItem('mostRecentScore',score);
        window.location.assign('index.html');
        return;
    }
    questionCounter++;
    progresstext.innerText="Question"+questionCounter+"/"+maxQuestions;
    progressbarfull.style.width=`${(questionCounter/maxQuestions)*100}%`;
    const questionIndex = Math.floor(Math.random()*availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;
  
   choices.forEach(choice=>{
        const number=choice.dataset["number"];
        choice.innerText=currentQuestion["choice"+number];

   })
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers=true;
}
choices.forEach(choice=>{
    choice.addEventListener("click",e=>{
        //console.log(e.target);
        if(!acceptingAnswers) return;
        acceptingAnswers=false;
        const selectedChoice=e.target;
        const SelectedAnswer=selectedChoice.dataset['number'];
        let classToApply=
        SelectedAnswer==currentQuestion.answer?"correct":"incorrect";
        if(classToApply==='correct'){
          incrementScore(correctBonus);
        }
        // console.log(classToApply);
        // console.log(SelectedAnswer==currentQuestion.answer);
        selectedChoice.parentElement.classList.add(classToApply);
        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000)
     

    });
});
incrementScore=num=>{
  score+=num;
  scoretext.innerText=score;
}


