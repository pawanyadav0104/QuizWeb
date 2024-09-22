
const saveScoreBtn=document.getElementById('saveScoreBtn');
const username=document.getElementById('username');
const finalScore=document.getElementById("finalScore");
const mostRecentScore=localStorage.getItem('mostRecentScore');

const highScore=JSON.parse(localStorage.getItem("highScore"))||[];
console.log(highScore);

finalScore.innerText=mostRecentScore;
username.addEventListener('keyup',()=>{
    console.log(username.value);
    saveScoreBtn.disabled=!username.value;

})
savingHighScore=(e)=>{
    console.log("clicked the save button");
    e.preventDefault();
    const score={
        score:mostRecentScore,
        name:username.value,

    };
    highScore.push(score);
    console.log(highScore);
    
};



