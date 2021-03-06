
const cardValue = ["ace", 2, 3, 4, 5, 6, 7, 8, 9, 10, 'jack', 'queen', 'king'];
const cardSuit = ['spades', 'hearts', 'clubs', 'diamonds'];
let cardStack = [];
let dealer = [];
let player = [];
let showPlayerCard = document.getElementById('playerHand');
let showDealerCard = document.getElementById('dealerHand');
let hitCard = false;
let dealingHands = false;
var playerStand = false;
let surrenderHand = false;
let playerCount;
let dealerCount;
let playerDisplay = document.getElementById('playerTotal');



//Create an array of objects to get 52 cards with suits and values

function cards() {

  for(let i = 0; i < cardValue.length; i++) {
    for (let j = 0; j < cardSuit.length; j++) {
      let deck = {
        value: cardValue[i],
        suit: cardSuit[j],
        image: `Cards/${cardValue[i]}_of_${cardSuit[j]}.png`,
      };
      cardStack.push(deck);
    }
  }


  for(let i = 0; i < cardStack.length; i++) {
    switch(cardStack[i].value) {
      case 'ace':
        cardStack[i].points = 11;
        break;
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
      case 10:
        cardStack[i].points = cardStack[i].value;
        break;
      case 'jack':
      case 'king':
      case 'queen':
        cardStack[i].points = 10;
        break;
    }
  }
  return cardStack;
}



//Shuffle the cards - cardStack array
//Using the "Fisher-Yates "algorithm for shuffling cards and preventing duplicate picks

function shuffle(arr) {
  let len = arr.length;
  let i;
  let t;


  while (len) {
    i = Math.floor(Math.random() * len--);

    t = arr[len];
    arr[len] = arr[i];
    arr[i] = t;
  }
  return cardStack;
}

//Testing shuffle
cards(); //pushes cards objects into cardstack array
shuffle(cardStack); //cardstack array is now shuffled
console.log(cardStack) //logging shuffled stack to console

// Deal a player card and append to HTML element > show on screen
function dealPlayer() {
  if (cardStack.length > 0) {
    cardFlip.play();
    let card = cardStack.shift();
    let img = document.createElement('img');
    img.src = card.image;
    showPlayerCard.append(img);
    player.push(card);
  }
}

// Deal a dealer card and append to its HTML elem > show on screen
function dealDealer() {
  cardFlip.play();
  if (cardStack.length > 0) {
    let card = cardStack.shift();
    let img = document.createElement('img');
    img.src = card.image;
    showDealerCard.append(img);
    dealer.push(card);
  }
}

//Second dealer card that is face-down
function secondDealerCard() {
  cardFlip.play();
  let img = document.createElement('img');
  img.src = 'Cards/cardBack_red.png';
  img.points = 0;
  let dealerDisplay = document.getElementById('playerTotal');
  showDealerCard.append(img);
  dealer.push(img);
  console.log(dealer);
}

//Remove face-down card before dealer takes a card
function removeSecondCard() {
  let dealtHand = document.getElementById('dealerHand');
  dealtHand.removeChild(dealtHand.childNodes[1]);
}



// Compare Dealer hand to Player hand excluding Player "stand"
  function compare() {


  let dealerDisplay = document.getElementById('dealerTotal');
  let playerDisplay = document.getElementById('playerTotal');
  let surrenderDisplay = document.getElementById('surrended');
// Dealer Count
  let dealerCount = 0;
  if (dealer.length > 0) {
    for (let i = 0; i < dealer.length; i++) {
      if (dealer[i].value === 'ace' && dealerCount > 21) {
        dealer[i].points = 1;
        dealerCount += dealer[i].points;
      } else {
      dealerCount += dealer[i].points;
      }
    }
  dealerDisplay.innerText = `Dealer Cards Value: ${dealerCount}`;
  }


// Player Count
  let playerCount = 0;
  if (player.length > 0) {
    for (let i = 0; i < player.length; i++) {
      if (player[i].value === 'ace' && playerCount > 21) {
        player[i].points = 1;
        playerCount += player[i].points;
      } else {
      playerCount += player[i].points;
      }
    }
  playerDisplay.innerText = `Player Cards Value: ${playerCount}`;
  }

// Winning conditions
      setTimeout(function() {
      if (dealerCount >= 17 && dealerCount === playerCount) {
          push();
          gameReset();
      } else if (playerCount == 21 && dealerCount != 21) {
          youWin();
          gameReset();
      } else if (playerCount > 21) {
          youBusted();
          gameReset();
      } else if (dealerCount == 17 && dealerCount < playerCount && playerCount <= 21) {
          youWin();
          gameReset();
      } else if (dealerCount == 21 && playerCount <= 21) {
          youLose();
          gameReset();
      } else if (dealerCount > 21) {
        youWin();
        gameReset();
      } else if (dealerCount >= 17 && dealerCount < 21 && dealerCount > playerCount) {
          youLose();
          gameReset();
          return;
      } else if (dealerCount < 21 && dealerCount < playerCount && dealerCount >= 17) {
          youWin();
          gameReset();
      // } else if (dealerCount >= 17 && dealerCount < 21 && dealerCount > playerCount) {
      //     alert('YOU LOSE! this should work everytime');
      //     console.log('hello there!');
      //     gameReset();
      } else if (dealerCount >= 17 && dealerCount < 21 && dealerCount < playerCount) {
          alert('YOU WIN!');
          gameReset();
      } else {
        console.log('no reset, return');
        return;
      }
    }, 800);
    console.log(playerCount);

// Reset game after playing a round
  function gameReset() {
    playerCount = 0;
    dealerCount = 0;
    player = [];
    dealer = [];
    setTimeout(function() {
    playerDisplay.innerText = `Player Cards Value: ${playerCount}`;
    dealerDisplay.innerText = `Dealer Cards Value: ${dealerCount}`;
    showDealerCard.innerHTML = '';
    showPlayerCard.innerHTML = '';
    }, 2000);

    function makeFalse() {
          hitCard = false;
          dealingHands = false;
          playerStand = false;
    }
  makeFalse();

  for (var i = 0; i < play.length; i++) {
      play[i].style.display = "none";
    }


  }

// If player "stays", dealer then...
if (playerStand) {
    console.log(playerStand);
    if (dealerCount < 17) {
        setTimeout(function() {
          console.log('dealer adds a card!');
          dealDealer();
          // playerStand = false;
          compare();
        }, 1000);
     }
  }

}







// Deal hand(s) to start game
function startDeal() {
  dealPlayer();
  setTimeout(function() {
    dealDealer();
      setTimeout(function() {
        dealPlayer();
          setTimeout(function() {
            secondDealerCard();
            compare();
          }, 800);
      }, 800);
  }, 800);
}


// Player decides to take a "hit"
function hit() {
  dealPlayer();
  compare();
  console.log('hitCard is true');
}


// Player decides to "stay"
function stay() {
  removeSecondCard();
  dealDealer();
  playerStand = true;
  compare();
  console.log('stay function runs');
}

//Win or Lose Alerts
let bet100 = document.getElementById('betBtn1');
let bet250 = document.getElementById('betBtn2');
let bet500 = document.getElementById('betBtn3');
let bet1000 = document.getElementById('betBtn4');
let bankroll = document.getElementById('playerChips');
let goBet = document.getElementById('betBtnGo');
let play = document.getElementsByClassName('playerMove');
let pot = document.getElementById('pot');
let startBank = 10000;
let cashStart = 10000;
let addedToPot = 0;
let showWinner = document.getElementById('winOrLostText');
let youWonAHand = false;
let youLostAHand = false;
let pushHand = false;

function youWin() {
  showWinner.style.display = 'block';
  showWinner.innerText = 'YOU WIN!';
  cashStart = (addedToPot * 2) + cashStart;
  bankroll.innerHTML = `BANKROLL $ ${cashStart}`;
  winner.play();
  setTimeout(function() {
    showWinner.style.display = 'none';
    addedToPot = 0;
    console.log(cashStart);
    pot.innerText = `POT: $ 0`;
  }, 3500);
}

function youLose() {
  showWinner.style.display = 'block';
  showWinner.innerText = 'YOU LOSE!';
  loser.play();
  setTimeout(function() {
    showWinner.style.display = 'none';
    addedToPot = 0;
    console.log(cashStart);
    pot.innerText = `POT: $ 0`;
  }, 3500);
}

function youBusted() {
  showWinner.style.display = 'block';
  showWinner.innerText = 'BUSTED!!!';
  loser.play();
  setTimeout(function() {
    showWinner.style.display = 'none';
    addedToPot = 0;
    console.log(cashStart);
    pot.innerText = `POT: $ 0`;
  }, 3500);
}

function push() {
  showWinner.style.display = 'block';
  showWinner.innerText = 'PUSH!';
  cashStart = cashStart + addedToPot;
  bankroll.innerHTML = `BANKROLL $ ${cashStart}`;
  loser.play();
  setTimeout(function() {
    showWinner.style.display = 'none';
    addedToPot = 0;
    console.log(cashStart);
    pot.innerText = `POT: $ 0`;
  }, 3500);
}

//Betting Functions


function clickHere() {
  bet100.onclick = function() {
    bettor.play();
    cashStart = cashStart - 100;
    bankroll.innerHTML = `BANKROLL: $ ${cashStart}`;
    addedToPot += 100;
    pot.innerText = `POT: $ ${addedToPot}`;
  };
  bet250.onclick = function() {
    bettor.play();
    cashStart = cashStart - 250;
    bankroll.innerHTML = `BANKROLL $ ${cashStart}`;
    addedToPot += 250;
    pot.innerText = `POT: $ ${addedToPot}`;
  };
  bet500.onclick = function() {
    bettor.play();
    cashStart = cashStart - 500;
    bankroll.innerHTML = `BANKROLL $ ${cashStart}`;
    addedToPot += 500;
    pot.innerText = `POT: $ ${addedToPot}`;
  };
  bet1000.onclick = function() {
    bettor.play();
    cashStart = cashStart - 1000;
    bankroll.innerHTML = `BANKROLL $ ${cashStart}`;
    addedToPot += 1000;
    pot.innerText = `POT: $ ${addedToPot}`;
  };
  goBet.onclick = function() {
    for (var i = 0; i < play.length; i++) {
      play[i].style.display = "block"; //display gameplay buttons
    }
    winningPot = (startBank - cashStart) * 2; //potential winning bet
    startDeal();
  }

}

clickHere();


// Game sounds

let winner = new Audio('Audio/win-cheer.wav');
let loser = new Audio('Audio/crowd-loser.wav');
let bettor = new Audio('Audio/betting-chip.wav');
let cardFlip = new Audio('Audio/card-flip.wav');







