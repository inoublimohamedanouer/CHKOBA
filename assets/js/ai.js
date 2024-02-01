const pcPlay = () => {
  if (playerTurn) {
    return;
  }
  playerTurn = true;
  let pcCards = [...$(".pc-card")];
  let tableCards = [...$(".table-card")];
  const Posibilities = [
    [[1]],
    [[2], [1, 1]],
    [[3], [1, 1, 1], [1, 2]],
    [[4], [1, 1, 1, 1], [1, 1, 2], [2, 2], [1, 3]],
    [[5], [1, 4], [2, 3], [1, 1, 1, 2], [1, 2, 2], [1, 1, 3]],
    [
      [6],
      [1, 5],
      [2, 4],
      [3, 3],
      [1, 1, 1, 1, 2],
      [1, 1, 4],
      [1, 1, 1, 3],
      [1, 2, 3],
      [2, 2, 2],
    ],
    [
      [7],
      [1, 6],
      [2, 5],
      [3, 4],
      [1, 1, 5],
      [1, 1, 1, 4],
      [1, 2, 4],
      [1, 3, 3],
      [1, 1, 2, 3],
      [1, 1, 1, 1, 3],
      [2, 2, 2, 1],
    ],
    [
      [8],
      [1, 7],
      [2, 6],
      [3, 5],
      [4, 4],
      [1, 1, 6],
      [1, 1, 1, 5],
      [1, 1, 1, 1, 4],
      [1, 2, 5],
      [2, 2, 4],
      [1, 1, 2, 4],
      [1, 1, 3, 3],
      [2, 3, 3],
      [1, 1, 1, 2, 3],
      [1, 2, 2, 3],
      [2, 2, 2, 2],
    ],
    [
      [9],
      [1, 8],
      [2, 7],
      [3, 6],
      [4, 5],
      [1, 1, 7],
      [1, 1, 1, 6],
      [1, 1, 1, 1, 5],
      [1, 2, 6],
      [1, 1, 1, 1, 5],
      [1, 3, 5],
      [2, 2, 5],
      [2, 2, 2, 2, 1],
      [2, 3, 4],
    ],
    [
      [10],
      [1, 9],
      [2, 8],
      [3, 7],
      [4, 6],
      [5, 5],
      [2, 2, 2, 4],
      [1, 1, 2, 2, 4],
      [1, 2, 3, 4],
      [1, 1, 8],
      [1, 1, 1, 7],
      [1, 1, 1, 1, 6],
      [1, 4, 5],
      [1, 1, 1, 7],
      [1, 2, 7],
      [2, 2, 6],
      [1, 2, 2, 5],
      [2, 3, 5],
      [3, 3, 4],
    ],
  ];
  pcCards = pcCards.map((x) =>
    parseInt(x.firstChild.alt.substr(1, x.firstChild.alt.length))
  );
  tableCards = tableCards.map((x) =>
    parseInt(x.firstChild.alt.substr(1, x.firstChild.alt.length))
  );
  for (let card of pcCards) {
    let currentPosibilities = Posibilities[card - 1];
    for (possibility of currentPosibilities) {
      let temp = [];
      let tempTable = tableCards;
      for (step of possibility) {
        if (tableCards.includes(step)) {
          temp.push(tableCards.indexOf(step));
          tempTable.splice(tempTable.indexOf(step), 1);
        } else {
          break;
        }
      }
      if (temp.length == possibility.length) {
        for (let pos of temp) {
          document
            .getElementsByClassName("table-container")[0]
            .removeChild(
              document.getElementsByClassName("table-container")[0].children[
                pos
              ]
            );
        }
        let pos = pcCards.indexOf(card);
        document
          .getElementsByClassName("pc-container")[0]
          .removeChild(
            document.getElementsByClassName("pc-container")[0].children[pos]
          );
        pickCards();
        if ([...document.getElementsByClassName("table-card")].length == 0) {
          score.opponent++;
          alert("CHKOBA");
        }
        playerLastAte = false;
        //check for end game
        if (counter == 0) {
          if (deck.length == 0) {
            checkEndGame();
            calculatePlayerScore();
            document.getElementsByClassName("score")[0].style.visibility =
              "visible";
            document.getElementById("score-pc").innerHTML = score.opponent;
            document.getElementById("score-player").innerHTML = score.player;
            if (score.opponent < points && score.player < points) {
              return;
            }
            if (score.opponent > score.player) {
              document.getElementById("end").innerHTML = "Pc Won";
            } else if (score.opponent < score.player) {
              document.getElementById("end").innerHTML = "Player Won";
            } else {
              document.getElementById("end").innerHTML = "Tie";
            }
            return;
          }
          round();
        }
        return;
      }
    }
  }
  let elementToRemove =
    document.getElementsByClassName("pc-container")[0].children[0].children[0];
  document
    .getElementsByClassName("table-container")[0]
    .appendChild(createCard(elementToRemove));
  document
    .getElementsByClassName("pc-container")[0]
    .removeChild(elementToRemove.parentNode);
  pickCards();
  if (counter == 0) {
    delay = 1000;
    setTimeout(() => {}, delay);
    if (deck.length == 0) {
      checkEndGame();
      delay = 1000;
      setTimeout(() => {}, delay);
      calculatePlayerScore();
      document.getElementsByClassName("score")[0].style.visibility = "visible";
      document.getElementById("score-pc").innerHTML = score.opponent;
      document.getElementById("score-player").innerHTML = score.player;
      if (score.opponent < points && score.player < points) {
        return;
      }
      if (score.opponent > score.player) {
        document.getElementById("end").innerHTML = "Pc Won";
      } else if (score.opponent < score.player) {
        document.getElementById("end").innerHTML = "Player Won";
      } else {
        document.getElementById("end").innerHTML = "Tie";
      }
      return;
    }
    delay = 1000;
    setTimeout(() => {}, delay);
    round();
  }
  //check for end game
  if (counter == 0) {
    if (deck.length == 0) {
      checkEndGame();
      delay = 1000;
      setTimeout(() => {}, delay);
      calculatePlayerScore();
      document.getElementsByClassName("score")[0].style.visibility = "visible";
      document.getElementById("score-pc").innerHTML = score.opponent;
      document.getElementById("score-player").innerHTML = score.player;
      if (score.opponent < points && score.player < points) {
        return;
      }
      if (score.opponent > score.player) {
        document.getElementById("end").innerHTML = "Pc Won";
      } else if (score.opponent < score.player) {
        document.getElementById("end").innerHTML = "Player Won";
      } else {
        document.getElementById("end").innerHTML = "Tie";
      }
      return;
    }
    round();
  }
};
