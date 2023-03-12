window.onload = function(){
    var music = new Audio("sounds/Jazz.mp3");
    music.loop = true;
    music.volume = 0.5;
    music.play();
    newDeck = new Deck();
    newDeck.shuffleDeck();

    let application = new Application();
    application.start();
    
}
class Card{
    constructor(){
    }
    getValue(card){
        let data = card.split("-");
        let value = data[0];

        if(value === "A"){
            return 1;
        }
        else if(value === "J"){
            return 11;
        }
        else if(value === "Q"){
            return 12;
        }
        else if(value === "K"){
            return 13;
        }

        return parseInt(value);
    }
}

class Deck{
    constructor(){
        this.deck = [];
        let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9","10", "J", "Q", "K"];
        let types = ["C", "D", "H", "S"];
        for(let i = 0; i<types.length; i++){
            for(let j = 0; j<values.length; j++){
                this.deck.push(values[j] + "-" + types[i]);
            }
        }
    }
    shuffleDeck(){
        for(let i = 0; i < this.deck.length; i++){
            let j = Math.floor(Math.random() * this.deck.length);
            let temp = this.deck [i];
            this.deck [i] = this.deck [j];
            this.deck [j] = temp;
        }
    }
    draw(){
        let randomCard = Math.floor(Math.random() * this.deck.length);
        let drawnCard = this.deck[randomCard];
        console.log(drawnCard);
        return drawnCard;
    }

}

class Player{
    constructor(name){
        this.value = new Card();
        this.hand = [];
        this.score = 0;
        this.name = name;
    }
    flip(){
        let randomCard = Math.floor(Math.random() * this.hand.length);
        let flippedCard = this.hand.pop([randomCard]);
        console.log(this.value.getValue(flippedCard));
        return flippedCard;
    }
    draw(){
        for(let i = 1; i<=26; i++){
            let draw = new Deck();
            this.hand.push(draw.draw());
        }
        console.log(this.hand);
    }
    describe(){
        console.log(
            `${this.name}
             Score: ${this.score}
             Hand: ${this.hand}`);
    }
}

class Application{
    constructor(){
        this.player1 = new Player("Player 1");
        this.player2 = new Player("Player 2");
        this.cards1 = new Card();
        this.cards2 = new Card();
    }
    start(){
        this.player1.draw();
        this.player2.draw();
        let round = 1;
        var applause = new Audio("sounds/Applause.mp3");
        var cardFlip = new Audio("sounds/CardFlip.mp3");
        applause.volume = 0.3;

        document.getElementById("war").addEventListener("click", () => {
            if(this.player1.hand.length>0 && this.player2.hand.length>0){
                cardFlip.play();
            document.getElementById("round_number").innerHTML = round++;
            let cardImgOne = document.createElement("img");
            this.card1 = this.player1.flip();
            cardImgOne.src = "./cards/" + this.card1 +".png";
            document.getElementById("player-1-cards").firstElementChild.src = cardImgOne.src;

            let cardImgTwo = document.createElement("img");
            this.card2 = this.player2.flip();
            cardImgTwo.src = "./cards/" + this.card2 +".png";
            document.getElementById("player-2-cards").firstElementChild.src = cardImgTwo.src; 

            if(this.cards1.getValue(this.card1) > this.cards2.getValue(this.card2)){
                this.player1.score++;
                document.getElementById("player-1-sum").innerHTML = this.player1.score;
                console.log(`Player 1 wins this round!`)
            }    
            else if(this.cards1.getValue(this.card1) < this.cards2.getValue(this.card2)){
                this.player2.score++;
                document.getElementById("player-2-sum").innerHTML = this.player2.score;
                console.log(`Player 2 wins this round!`)
            }
            else{
                console.log(`This round is tied!`)
            }  
            }
            else{
                if(this.player1.score>this.player2.score){
                    applause.play();
                    alert(`Player 1 won the game with ${this.player1.score} points! Press 'OK' to restart the game!`);
                }
                else if(this.player1.score<this.player2.score){
                    applause.play();
                    alert(`Player 2 won the game with ${this.player2.score} points! Press 'OK' to restart the game!`);
                }
                else{
                    alert(`Both players are tied! Press 'OK' to restart the game!`);
                }
                location.reload();
            }
        })
    }

}

