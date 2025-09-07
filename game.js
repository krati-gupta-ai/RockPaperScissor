let userScore=0;
let compScore=0;
let totalRounds=5;
let currentRound=0;
let gameActive=false;

let playerName = localStorage.getItem("playerName") || "";

const choice=document.querySelectorAll(".choice");
const msg=document.querySelector("#msg");
const userScorePara=document.querySelector("#user-score");
const compScorePara=document.querySelector("#compet-score");
const changeNameBtn = document.querySelector("#change-name");
const userLabel = document.querySelector("#user-label");

const bgsound=new Audio("sounds/background.mp3");
bgsound.loop=true;
bgsound.volume=0.3;
bgsound.play();
document.body.addEventListener("click", () => {
    bgsound.play();  // now it will always play after the first click
}, { once: true }); // ensures this triggers only once


const clickSound = new Audio("sounds/click.mp3");        // button click sound
const nameSound = new Audio("sounds/keyboard-typing.mp3");          // entering name
const winSound = new Audio("sounds/win.mp3");            // win
const loseSound = new Audio("sounds/lose.mp3");          // lose
const drawSound = new Audio("sounds/draw.mp3");          // draw



function askPlayerName() {
    nameSound.currentTime = 0;
    nameSound.play();

    playerName = prompt("Welcome! Please enter your name:", playerName || "");
    if (!playerName) playerName = "Player";
    localStorage.setItem("playerName", playerName);
    userLabel.innerText = playerName;
    msg.innerText = `Welcome ${playerName}! Let's play 🎮🔥`;
}
askPlayerName();

// Change Name Button
changeNameBtn.addEventListener("click", askPlayerName);

const geneCompChoice=()=>{
    const options=["Rock","Paper","Scissors"];
    const randIdx= Math.floor(Math.random()*3);
    return options[randIdx];
};

const animateScore = (element) => {
    element.classList.add("highlight");
    setTimeout(() => element.classList.remove("highlight"), 500);
};

const drawGame=()=>{
    console.log("game was draw");
    msg.innerText=`It's a draw, ${playerName}! Play again.`;

    drawSound.currentTime = 0;
    drawSound.play();

    msg.style.backgroundColor="#081b31";
    msg.className="flash-draw";
};

const showWinner=(userWin, userChoice, compChoice)=>{
    if(userWin){
        userScore++;
        userScorePara.innerText=userScore;
        animateScore(userScorePara);
        console.log("you win!");
        msg.innerText = `${playerName} Wins! ${userChoice} beats ${compChoice} 🏆`;

        winSound.currentTime = 0;
        winSound.play();


        msg.className = "flash-win";
        msg.style.backgroundColor="green";
    }
    else{
        compScore++;
        compScorePara.innerText=compScore;
        console.log("you lose!");
        animateScore(compScorePara);
        msg.innerText = `Oh no ${playerName}, you lost! ${compChoice} beats ${userChoice} 😢`;

        loseSound.currentTime = 0;
        loseSound.play();

        msg.className = "flash-lose";
        msg.style.backgroundColor="red";
    }
};

const playGame=(userChoice)=>{
    if(!gameActive){
        msg.innerText="Click Start Game to begin!";
        return;
    }

    if(currentRound >= totalRounds ){
        msg.innerText = "Game over! Please start to play again.";
        return;
    }

    console.log("user choice = ",userChoice);
   //generate computer choice 
   const compChoice=geneCompChoice();
   console.log("computer choice = ",compChoice);

   const choiceMsg = document.getElementById("choice-msg");
   choiceMsg.innerText = `🧑 ${playerName} chose ${userChoice} | 💻 Computer chose ${compChoice}`;

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
   
    currentRound++;
    document.getElementById("round-info").innerText = `Round: ${currentRound} / ${totalRounds}`;

    if( currentRound === totalRounds){
        setTimeout(()=> endGame(), 500);  //wait half second for last messege
    }
};

choice.forEach((choice) => {
    choice.addEventListener("click",()=>{
        const userChoice=choice.getAttribute("id");

        // Flash highlight
    choice.classList.add("selected");
    setTimeout(() => choice.classList.remove("selected"), 500);

        clickSound.currentTime = 0;
        clickSound.play(); 

        console.log("choice was clicked");
        playGame(userChoice);
    });
});

function startGame(){
    const inputRounds = document.getElementById("rounds").value;
    totalRounds= inputRounds ? parseInt(inputRounds) : 5 ;
    currentRound=0;
    userScore=0;
    compScore=0;
    gameActive=true;

    userScorePara.innerText = "0";
    compScorePara.innerText = "0";
    document.getElementById("round-info").innerText=`Round: ${currentRound} / ${totalRounds}`;
    msg.innerText = `Game Started! Best of  ${totalRounds} rounds,First Move, ${playerName}.`;
    msg.style.backgroundColor="#081b31";

    document.body.classList.remove("player-win", "comp-win", "draw-game");
}

function endGame(){

     document.body.classList.remove("player-win", "comp-win", "draw-game");

    if(userScore > compScore){
        msg.innerText=`🎉 ${playerName} Wins the Game! Final Score: ${userScore} - ${compScore}`;
        msg.style.backgroundColor = "green";
        msg.classList.add("flash-win");
        document.body.classList.add("player-win");
    }
    else if(compScore > userScore){
        msg.innerText = `💻 Computer Wins the Game! Final Score: ${compScore} - ${userScore}`;
        msg.style.backgroundColor = "red";
        msg.classList.add("flash-lose");
        document.body.classList.add("comp-win");
    }
    else {
        msg.innerText = `🤝 It's a Draw Match! Final Score: ${userScore} - ${compScore}`;
        msg.style.backgroundColor = "orange";
        msg.classList.add("flash-draw");
    }

// // Show Restart Button
// const restartBtn = document.createElement("button");
// restartBtn.innerText = "🔄 Restart Game";
// restartBtn.classList.add("restart-btn");
// restartBtn.onclick = startGame;

// // Add button below the message
// msg.appendChild(document.createElement("br"));
// msg.appendChild(restartBtn);    

// ✅ Put restart button into controls div
    const controls = document.getElementById("controls");
    controls.innerHTML = ""; // clear old buttons
    const restartBtn = document.createElement("button");
    restartBtn.innerText = "🔄 Restart Game";
    restartBtn.classList.add("restart-btn");
    restartBtn.onclick = startGame;
    controls.appendChild(restartBtn);
}