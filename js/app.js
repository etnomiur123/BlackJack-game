import cards from './cards.js';

const elements = {
  score1: document.querySelector(".score-1"),
  score2: document.querySelector(".score-2"),
  button1: document.querySelector(".button-1"),
  button2: document.querySelector(".button-2"),
  next1: document.querySelector(".next-1"),
  next2: document.querySelector(".next-2"),
  cardPlace: document.querySelector(".cardPlace")
};

const state = {
  cards: [...cards],
}

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
  if (player1.stop) changeTurn();
  if (player2.stop) changeTurn();
};

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


const getRandomCard = () => {
  return state.cards[Math.floor(Math.random() * state.cards.length)];
}


//Player 1 controls

elements.button1.addEventListener("click", () => {
  if (player1.active && player1.stop === false) {
    const card = getRandomCard()
    if(card.value === "ace") {
      if(21 - player1.score > 10) {
        player1.score += 10
      } else if(21 - player1.score < 10) {
        player1.score += 1
      }
    } else {
      player1.score += card.value;
    }
    elements.cardPlace.innerHTML = card.img;
    console.log("player 1 => " + card.name)
    elements.score1.innerHTML = player1.score;
    checkWinner();
    checkStop();
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
    const card = getRandomCard()
    if(card.value === "ace") {
      if(21 - player2.score > 10) {
        player2.score += 10
      } else if(21 - player2.score < 10) {
        player2.score += 1
      }
    } else {
      player2.score += card.value;
    }
    elements.cardPlace.innerHTML = card.img;
    console.log("player 2 => " + card.name)
    elements.score2.innerHTML = player2.score;
    checkWinner();
    checkStop();
    changeTurn();
  }
});

elements.next2.addEventListener("click", () => {
  if (player2.active) finish(player2);
  checkWinner();
});
