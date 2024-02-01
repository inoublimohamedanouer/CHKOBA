const kickCard = () => {
  $(".player-card").dblclick(function () {
    if (!playerTurn) {
      return;
    }
    $(".table-container").append(createCard(this.firstChild));
    this.remove();
    pickCards();
    playerTurn = false;
    delay = 1000;
    counter--;
    setTimeout(() => {
      pcPlay();
    }, delay);
  });
};
const selectCards = () => {
  tempStack = [];
  $(".player-card").click(function () {
    if (tempStack.length == 0) {
      this.firstChild.classList.add("triggered");
      tempStack.push(this);
    } else {
      tempStack[0].firstChild.classList.remove("triggered");
      [...tempStack].map((x) => x.classList.remove("selected"));
      tempStack = [];
      this.firstChild.classList.add("triggered");
      tempStack.push(this);
    }
  });
};
const pickCards = () => {
  $(".table-card").click(function () {
    if (!playerTurn) {
      return;
    }
    if (tempStack.length > 0 && !this.classList.contains("selected")) {
      this.classList.add("selected");
      tempStack.push(this);
      if (sum(tempStack) > 0) {
        tempStack[0].firstChild.classList.remove("triggered");
        [...tempStack].map((x) => x.classList.remove("selected"));
        tempStack = [];
      } else if (sum(tempStack) == 0) {
        tempStack.map((x) => {
          playerWonCards.push(x.firstChild.alt);
          x.parentNode.removeChild(x);
          tempStack = [];
          playerTurn = false;
          playerLastAte = true;
          if ([...document.getElementsByClassName("table-card")].length == 0) {
            score.player++;
            alert("CHKOBA");
          }
        });
        counter--;
        delay = 1000;
        setTimeout(() => {
          pcPlay();
        }, delay);
      }
    }
  });
};

$(".next").click(function () {
  if (!(score.opponent < points && score.player < points)) {
    playerWonCards = [];
    playerLastAte = false;
    playerTurn = true;
    score.opponent = 0;
    score.player = 0;
    window.location.href="index.html";
    return;
  }
  document.getElementsByClassName("score")[0].style.visibility = "hidden";
  playerWonCards = [];
  playerLastAte = false;
  playerTurn = true;
  launch();
});

$(".exit").click(function () {
  playerWonCards = [];
  playerLastAte = false;
  playerTurn = true;
  score.opponent = 0;
  score.player = 0;
});
