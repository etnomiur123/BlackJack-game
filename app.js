const elements = {
  score1: document.querySelector(".score-1"),
  score2: document.querySelector(".score-2"),
  button1: document.querySelector(".button-1"),
  button2: document.querySelector(".button-2"),
  next1: document.querySelector(".next-1"),
  next2: document.querySelector(".next-2"),
};

const player1 = {
  score: 0,
  active: true,
  stop: false,
};

const player2 = {
  score: 0,
  active: false,
  stop: false,
};

const changeTurn = () => {
  if (player1.active) {
    player1.active = false;
    player2.active = true;
    elements.button1.classList.remove("active");
    elements.next1.classList.remove("active");
    elements.button2.classList.add("active");
    elements.next2.classList.add("active");
    return;
  }

  if (player2.active) {
    player2.active = false;
    player1.active = true;
    elements.button2.classList.remove("active");
    elements.next2.classList.remove("active");
    elements.button1.classList.add("active");
    elements.next1.classList.add("active");
    return;
  }
};

const endGame = () => {
  player1.active = false;
  player2.active = false;
};

const finish = (player) => {
  player.stop = true;
  changeTurn();
};

const checkStop = () => {
    if(player1.stop) changeTurn();
    if(player2.stop) changeTurn();
}

const checkWinner = () => {
  //check player1
  if (player1.score === 21) {
    setTimeout(() => {
      alert("Player 1 Wins!");
    }, 500);
    return;
  }
  if (player1.score > 21) {
    setTimeout(() => {
      alert("Player 2 Wins!");
    }, 500);
    return;
  }
  if (player2.stop && player1.score > player2.score) {
    setTimeout(() => {
      alert("Player 1 Wins!");
    }, 500);
    return;
  }

  //check player2
  if (player2.score === 21) {
    setTimeout(() => {
      alert("Player 2 Wins!");
    }, 500);
    return;
  }
  if (player2.score > 21) {
    setTimeout(() => {
      alert("Player 1 Wins!");
    }, 500);
    return;
  }
  if (player1.stop && player2.score > player1.score) {
    setTimeout(() => {
      alert("Player 2 Wins!");
    }, 500);
    return;
  }

};

//Player 1 controls

elements.button1.addEventListener("click", () => {
  if (player1.active && player1.stop === false) {
    const points = Math.floor(Math.random() * 10) + 1;
    player1.score += points;
    elements.score1.innerHTML = player1.score;
    checkWinner();
    checkStop()
    changeTurn();
  } 
});

elements.next1.addEventListener("click", () => {
  if (player1.active) finish(player1);
  checkWinner();
});

//Player 2 controls

elements.button2.addEventListener("click", () => {
  if (player2.active && player2.stop === false) {
    const points = Math.floor(Math.random() * 10) + 1;
    player2.score += points;
    elements.score2.innerHTML = player2.score;
    checkWinner();
    checkStop()
    changeTurn();
  }
});

elements.next2.addEventListener("click", () => {
  if (player2.active) finish(player2);
  checkWinner();
});
