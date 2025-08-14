let userScore=0;
let compScore=0;

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
    msg.className="draw";
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


        msg.className = "win";
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

        msg.className = "lose";
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
        clickSound.currentTime = 0;
        clickSound.play(); 

        console.log("choice was clicked");
        playGame(userChoice);
    });
});