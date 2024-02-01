//core game logic
const deck = []
const points = 4
playerWonCards = []
playerLastAte = false
playerTurn = true
const score = {player : 0 , opponent : 0}

//card representation and functions
const createDeck = () =>{
    const types = ["c","d","h","s"]
    const numbers = [1,2,3,4,5,6,7,8,9,10]
    for(const type of types){
        for(const number of numbers){
            deck.push(new card(type,number))
        }
    }
    shuffleDeck(deck)
}
const shuffleDeck = (deck) => {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        let aux = deck[i];
        deck[i] = deck[j];
        deck[j] = aux;
      }
}