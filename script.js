const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let countMatches = 0;
let firstCard, secondCard;
let beginningTime;
let endTime;
let result;

if(localStorage.getItem('bestTime')!=null){
   document.getElementById("bestTime").innerHTML += localStorage.getItem('bestTime');
   }

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add('flip');

  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
  
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
    countMatches++;
    if (countMatches == 8) {
      endedGame();
    }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}



function flipAllCards(){
    document.getElementById("result").style.visibility = 'hidden';
    document.getElementById("result").innerHTML = `Time: `;
    countMatches = 0;
    lockBoard = true;
    cards.forEach(card => card.classList.add('flip'));
        setTimeout(() => {
            cards.forEach(card => card.classList.remove('flip'));
        }, 3000);
    (function shuffle() {
    
        cards.forEach(card => {
            let randomPos = Math.floor(Math.random() * 16);
            card.style.order = randomPos;
        });
        resetBoard();
        cards.forEach(card => card.addEventListener('click', flipCard));
        
    })();
    beginningTime = Date.now();
}

cards.forEach(card => card.addEventListener('click', flipCard));

function endedGame() {
    endTime = Date.now();
    result = endTime - beginningTime;
    console.log(endTime);
    document.getElementById("result").innerHTML += `${Math.trunc(result/1000)} segundos`;
    document.getElementById("result").style.visibility = 'visible';
    if(Math.trunc(result/1000)<localStorage.getItem("bestTime") || localStorage.getItem("bestTime")==null){
        localStorage.setItem("bestTime", Math.trunc(result/1000));
        document.getElementById("bestTime").innerHTML += `${localStorage.getItem('bestTime')} segundos`;
    }
}