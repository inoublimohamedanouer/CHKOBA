const createCard = (card) => {
  let newDiv = document.createElement("div");
  newDiv.classList.add("card");
  newDiv.classList.add("table-card");
  let newImg = document.createElement("img");
  newImg.src = `${card.src}`;
  newImg.alt = `${card.alt}`;
  newImg.style.width = "100px";
  newImg.style.height = "100px";
  newDiv.appendChild(newImg);
  return newDiv;
};
const round = () => {
  counter = 3;
  for (let i = 0; i < 3; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("pc-card");
    let newImg = document.createElement("img");
    let card = deck.pop();
    newImg.src = `assets/images/Cartes/${card.src()}.png`;
    newImg.alt = card.src();
    newImg.style.width = "100px";
    newImg.style.height = "100px";
    newDiv.appendChild(newImg);
    $(".pc-container").append(newDiv);
  }
  for (let i = 0; i < 3; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("player-card");
    let newImg = document.createElement("img");
    let card = deck.pop();
    newImg.src = `assets/images/Cartes/${card.src()}.png`;
    newImg.alt = card.src();
    newImg.style.width = "100px";
    newImg.style.height = "100px";
    newDiv.appendChild(newImg);
    $(".player-container").append(newDiv);
  }
  kickCard();
  selectCards();
};
const sum = (array) => {
  s = -Number(
    array[0].firstChild.alt.substring(1, array[0].firstChild.alt.length)
  );
  for (let i = 1; i < array.length; i++) {
    s += Number(
      array[i].firstChild.alt.substring(1, array[i].firstChild.alt.length)
    );
  }
  return s;
};
const launch = () => {
  createDeck();
  for (let i = 0; i < 4; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("card");
    newDiv.classList.add("table-card");
    let newImg = document.createElement("img");
    let card = deck.pop();
    newImg.src = `assets/images/Cartes/${card.src()}.png`;
    newImg.alt = card.src();
    newImg.style.width = "100px";
    newImg.style.height = "100px";
    newDiv.appendChild(newImg);
    $(".table-container").append(newDiv);
  }
  pickCards();
  round();
};

const calculatePlayerScore = () => {
  if (playerWonCards.length > 20) {
    score.player++;
  } else if (playerWonCards < 20) {
    score.opponent++;
  }
  if (playerWonCards.includes("d7")) {
    score.player++;
  } else {
    score.opponent++;
  }
  let sevens = 0;
  let dineri = 0;
  for (let card of playerWonCards) {
    if (card[1] == "7") {
      sevens++;
    }
    if (card[0] == "d") {
      dineri++;
    }
  }
  if (sevens > 2) {
    score.player++;
  } else if (sevens < 2) {
    score.opponent++;
  } else {
    sixes = 0;
    for (let card of playerWonCards) {
      if (card[1] == "6") {
        sixes++;
      }
    }
    if (sixes > 2) {
      score.player++;
    } else if (sixes < 2) {
      score.opponent++;
    }
  }
  if (dineri > 5) {
    score.player++;
  } else if (dineri < 5) {
    score.opponent++;
  }
};
const checkEndGame = () => {
  if (playerLastAte) {
    [...document.getElementsByClassName("table-card")].map((x) => {
      playerWonCards.push(x.firstChild.alt);
      x.parentNode.removeChild(x);
    });
  } else {
    [...document.getElementsByClassName("table-card")].map((x) => {
      x.parentNode.removeChild(x);
    });
  }
};