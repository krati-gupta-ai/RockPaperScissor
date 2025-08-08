let userScore=0;
let compScore=0;

const choice=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");

const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#compet-score");

const geneCompChoice=()=>{
    const options=["Rock","Paper","Scissors"];
    const randIdx= Math.floor(Math.random()*3);
    return options[randIdx];
};

const drawGame=()=>{
    console.log("game was draw");
    msg.innerText="Game was Draw! Play Again!";
    msg.style.backgroundColor="#081b31";
};

const showWinner=(userWin, userChoice, compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        console.log("you win!");
        msg.innerText=`you Win!${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor="green";
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        console.log("you lose!");
        msg.innerText=`you lose!${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor="red";
    }
};

const playGame=(userChoice)=>{
    console.log("user choice = ",userChoice);
   //generate computer choice 
   const compChoice=geneCompChoice();
   console.log("computer choice = ",compChoice);

   if(userChoice===compChoice){
    drawGame();
   }
   else{
    let userWin=true;
    if(userChoice==="Rock"){
        //scissor,paper
        userWin= compChoice==="Paper"? false:true;
    }
    else if(userChoice==="Paper"){
        //rock, scissor
        userWin= compChoice==="Scissors"? false:true;
    }
    else{
        //rock , paper;
        userWin=compChoice==="Rock"?false:true;
    }
    showWinner(userWin,userChoice,compChoice);
   }
};

choice.forEach((choice) => {
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");
        console.log("choice was clicked");
        playGame(userChoice);
    });
});