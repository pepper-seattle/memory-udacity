//Declarations 
const deck = document.querySelector(".deck");
const cards = document.querySelectorAll("#card");
const stars = document.querySelectorAll(".star");
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const moves = document.getElementById("moves");
const timer = document.getElementById("timer");

let checkArray = [];
let fullDeck = [...cards];
let missedCount = 0;
let moveCount = 0;

let running = 0;
let starCount = 5;
let time = 0;
let winArray = [];

/* Game Setup */
const shuffle = (array) => {
  let currentIndex = array.length, 
  tempValue, randomIndex;

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  };
  return array;
};

//card shuffling
const shuffleDeck = () => {
  shuffle(fullDeck);

  let frag = document.createDocumentFragment();
  for (let i = 0; i < fullDeck.length; ++i) {
    //Sets any open or matched cards back to closed
    fullDeck[i].classList.add("closed");
    fullDeck[i].classList.remove("open", "match");

    frag.appendChild(fullDeck[i]);
  };
  deck.innerHTML = '';
  
  deck.appendChild(frag);
};

//Game Functionality
/* Timer */
const incrementTime = () => {
  if(running == 1){
    setTimeout(() => {
      time++;
      let minutes = Math.floor(time/10/60);
      let seconds = Math.floor(time/10 % 60);

      if(minutes < 10){
        minutes = "0" + minutes;
      }
      if(seconds < 10){
        seconds = "0" + seconds;
      }
      
      document.getElementById("timer").innerHTML = minutes + ":" + seconds;
      incrementTime();
    }, 100);
  };
};

const startTimer = () => {
  time = 0;

  if(running == 0) {
    running = 1;
    incrementTime();
  } else {
    running = 0;
  };
};

/* Gameplay Functionality */
//Main game play function
const gamePlay = () => {
  let winCount = 0;

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      if(time === 0 || time === 1){
        startTimer();
      };
      //initial card flip and push to checkArray for a match check
      if(card.classList.contains("closed") && checkArray.length < 2 && winCount < 8){
        cardFlip(card);
          if(matchCheck(checkArray) === true){
            matching(card);
            moveCount++;
            moves.innerHTML = moveCount;
          }else if(matchCheck(checkArray) === false){
            noMatch(card);
            moveCount++;
            moves.innerHTML = moveCount;
          };
      };
    });
  });
};

const cardFlip = (card) => {
  card.classList.add("open");
  card.classList.remove("closed");
  checkArray.push(card);
};

const matching = (card) => {
  winCount++;
  checkArray[0].classList.toggle("match");
  card.classList.toggle("match");
  winArray.push(checkArray[0], checkArray[1]);
  //empty checkArray for next check
  checkArray = [];

  if(winCount === 8){
    endGame();
  };
};

const noMatch = (card) => {
  setTimeout(() => {
    checkArray[0].classList.remove("open");
    checkArray[0].classList.add("closed");
    card.classList.remove("open");
    card.classList.add("closed");
    //empty checkArray for next check
    checkArray = [];
  }, 750);
  starReducer();
};

const matchCheck = (checkArray) => {
  let len = checkArray.length;
  if(len === 2){
    let card1 = checkArray[0].lastElementChild.className;
    let card2 = checkArray[1].lastElementChild.className;

    if(card1 === card2){
      return true;
    }else{
      return false;
    };
  };
};

/* Star Functionality */
//Reduces the number of stars by the number of missed matches
const starReducer = () => {
  missedCount++;

  if(missedCount === 5){
      starCount = 4;
      stars[4].classList.add('hide');
    }else if(missedCount === 7){
      starCount = 3;
      stars[3].classList.add('hide');
    }else if(missedCount === 9){
      starCount = 2;
      stars[2].classList.add('hide');
    }else if(missedCount > 10){
      starCount = 1;
      stars[1].classList.add('hide');
    };
};

//Reset all counts and classes
const reset = () => {
  checkArray = [];
  running = 0;
  starCount = 5;
  time = 0;
  winCount = 0;
  missedCount = 0;
  moveCount = 0;
  moves.innerHTML = "0";
  timer.innerHTML = "00:00";
  modal.style.visibility = 'hidden';
  modalContent.style.visibility = 'hidden';
  stars.forEach((star) => { 
    star.style.color = '#000'; 
    star.classList.remove('hide'); 
  });

  //resets card classes and winArray on reset
  winArray.forEach((card) => { 
    card.classList.remove('open', 'match'); 
    card.classList.add('closed') });
  winArray = [];
  shuffleDeck();
};

//End Game
const endGame = () => {
  const starResult = document.getElementById("starResult");
  const timeResult = document.getElementById("timeResult");
  const moveResult = document.getElementById("moveResult");
  //stop timer
  running = 0;

  //pop up modal
  modal.style.visibility = 'visible';
  modalContent.style.visibility = 'visible';

  //change star color
  stars.forEach((star) => {
    star.style.color = '#ffdf00';
  });

  //Add results to modal
  moveResult.innerHTML = moveCount;
  starResult.innerHTML = starCount;
  let timerStop = document.getElementById("timer").innerText;
  timeResult.innerHTML = timerStop;
};

//Initial load shuffle
window.onload = () => {
  reset();
  shuffleDeck();
  gamePlay();
};