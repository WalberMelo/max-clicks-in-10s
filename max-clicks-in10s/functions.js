"use strict";
//DOM Elements

const terminalScreen = document.getElementById("terminal-screen");
const registrationScreen = document.getElementById("registration-screen");
const gameArea = document.getElementById("game-area");
const winScreen = document.getElementById("win-screen");
const loseScreen = document.getElementById("lost-screen");
const startBtn = document.getElementById("start-btn");
const loginBtn = document.getElementById("login-btn");
const tryAgain = document.getElementById("try-again");
const homePage = document.getElementById("home-page");
let nickName = document.getElementById("login");
let timer = document.getElementById("timer-number");
let userName = document.getElementById("user-name");

let virusImg = document.getElementById("virus-image");
let scoreEl = document.querySelector(".score");
let timerEl = document.getElementById("timer");
let gameAreaEl = document.querySelector(".game-area");
let winScreenEl = document.querySelector(".win-screen ");
let loseScreenEl = document.querySelector(".lose-screen ");

//Global Variables
let terminalShow = false;
let gameShow = false;
let timeleft = 10;
let totalClicked = 0;
let startTimer = false;
let finishTimer = false;
let timeInterval;
let userData;
let tryAgainSelected;
let homePageSelected;

// EventListeners //

startBtn.addEventListener("click", registration);
loginBtn.addEventListener("click", startGame);
tryAgain.addEventListener("click", resetGame);
homePage.addEventListener("click", goHome);
virusImg.addEventListener("click", counterClick);

// TypeText
let myText =
    "This is a message from Assembler School. The academy main server has been hacked.The virus is highly dangerous, its origin is unknown but it seems to be from deep Almeria. We need the help of all students. No teacher has been able to remove the virus from our system. Now it's your turn to show off your skills as a programmer.",
  i = 0;

window.onload = function () {
  console.log(window.onload);
  let typeWriter = setInterval(function () {
    document.getElementById("mytext").textContent += myText[i];
    i++;
    if (i > myText.length - 1) {
      clearInterval(typeWriter);
    }
  }, 50);
};

/////////////////////////////////
//*** LOCAL STORAGEDATA SECTION ***//
/////////////////////////////////

//--- Object Constructor --- //
class Player {
  constructor(userName, score) {
    this.userName = userName;
    this.score = score;
  }
}

let playersObj = [];

function storagePlayer() {
  let user = nickName.value;
  let score = scoreEl.textContent;
  let players = new Player(user, score);
  playersObj.push(players);
  localStorage.setItem("players", JSON.stringify(playersObj));
}

let indexScore = 0;

function updateScore() {
  let getLocalStorageScore = JSON.parse(
    localStorage.getItem("players", playersObj)
  );
  for (i = 0; i < getLocalStorageScore.length; i++) {
    let scores = getLocalStorageScore[indexScore].score;
    indexScore++;
    console.log(scores);
    let updateScore = JSON.stringify(getLocalStorageScore);
    localStorage.setItem("players", updateScore);
  }
}

function addPlayerToStorage() {
  let getLocalStoragePlayer = JSON.parse(
    localStorage.getItem("players", playersObj)
  );

  let addUser = nickName.value;
  let addScore = scoreEl.textContent;
  let addPlayer = new Player(addUser, addScore);
  getLocalStoragePlayer.push(addPlayer);
  let updatePlayer = JSON.stringify(getLocalStoragePlayer);
  localStorage.setItem("players", updatePlayer);
}

/////////////////////////////////
//*** DISPLAY SCREEN SECTION ***//
/////////////////////////////////
function registration() {
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "block";
  terminalShow = true;
}

function startGame() {
  userData = nickName.value;
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "none";
  gameArea.style.display = "flex";
  timeInterval = setInterval(counterTime, 1000);
  userName.textContent = userData;
}

function winGame() {
  winScreenEl.style.display = "flex";
  gameAreaEl.style.display = "none";
  clearTimeout(timeInterval);
  return counterClick;
}

function loseGame() {
  loseScreenEl.style.display = "flex";
  gameAreaEl.style.display = "none";
}

/////////////////////////////////
//*** GAME MECANISM SECTION ***//
/////////////////////////////////
/* click interaction*/
function counterClick() {
  if (finishTimer === true) {
    return counterClick;
  } else if (totalClicked === 20) {
    winGame();
    goHome();
  } else {
    startTimer === true;
    totalClicked += 1;
    scoreEl.textContent = totalClicked;
  }
}

/* Timer counter behaviour */
function counterTime() {
  if (timeleft === -1) {
    loseGame();
    stopTimer();
    startTimer = false;
    finishTimer = true;
    if (tryAgainSelected && !homePageSelected) {
      updateScore();
      stopTimer();
    } else if (homePageSelected && !tryAgainSelected) {
      addPlayerToStorage();
      stopTimer();
    } else {
      storagePlayer();
    }
  } else {
    timerEl.textContent = timeleft;
    timeleft -= 1;
    startTimer = true;
  }
}

/* Virus effect in the game area*/
let object = document.getElementById("virus-image");
object.onclick = function () {
  let x = Math.floor(Math.random() * 300);
  let y = Math.floor(Math.random() * 700);
  object.style.top = x + "px";
  object.style.left = y + "px";
};

/////////////////////////////////
//*** RESET GAME SECTION ***//
/////////////////////////////////
function stopTimer() {
  clearTimeout(timeInterval);
  timerEl.textContent = "";
}

function resetGlobalValues() {
  totalClicked = 0;
  timeleft = 10;
  startTimer = false;
  terminalShow = false;
  finishTimer = false;
  gameShow = false;
}

function resetGame() {
  updateScore();
  resetGlobalValues();
  //Show only Game area
  terminalScreen.style.display = "none";
  registrationScreen.style.display = "none";
  gameArea.style.display = "flex";
  loseScreenEl.style.display = "none";
  //Reset score
  scoreEl.textContent = "0";
  //Start time again
  timeInterval = setInterval(counterTime, 1000);
  tryAgainSelected = true;
  homePageSelected = false;
}

function goHome() {
  homePageSelected = true;
  tryAgainSelected = false;
  resetGlobalValues();
  stopTimer();
  gethighScore();
  //Hidden screen and show game area
  terminalScreen.style.display = "flex";
  registrationScreen.style.display = "none";
  gameArea.style.display = "none";
  loseScreenEl.style.display = "none";
  //Reset user name
  userName.textContent = "";
  //Reset score
  scoreEl.textContent = "0";
}

/////////////////////////////////
//*** SCOREBOARD SECTION ***//
/////////////////////////////////

let highScoreList = document.getElementById("ranking");
let scoreBoard = document.getElementById("score-board");

function gethighScore() {
  let players = localStorage.getItem("players");
  let objectPlayers = JSON.parse(players);

  //number sort
  let scoreSort = objectPlayers.sort((a, b) => b.score - a.score);
  let finalSortScore = JSON.stringify(scoreSort);
  localStorage.setItem("players", finalSortScore);

  highScoreList.innerHTML = scoreSort
    .map((score) => {
      return `<div class="highScore">${score.userName} - ${score.score}</div>`;
    })
    .join("");
  highScoreList.style.display = "flex";
  scoreBoard.style.display = "flex";
}
