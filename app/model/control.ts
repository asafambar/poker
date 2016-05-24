
import * as _ from 'underscore';
export class Game {
	maxPz: number = 0;
	turn: number = 0;
	dealerPy:number = 110;
	dealerPx:number = 170;
	dealerPz:number = 0;
	hands:Array<Hand> = [];
	cards:Array<Card> = [];
	dealerCards:Array<Card> = [];
	allOptions:Array<string> = [];
    chars:Array<string> = ['C','D','H','S'];
	numbers:Array<string> = ['2','3','4','5','6','7','8','9','10'];
	royal:Array<string> = ['J','K','Q','A'];
    constructor(){
    	var that = this;
    	this.chars.forEach(function(sign:string){
 				that.numbers.forEach(function(numb:string){
 					that.allOptions.push(numb+sign);
 				})
 				that.royal.forEach(function(r:string){
 					that.allOptions.push(r+sign);
 				})
        })
        this.allOptions = _.shuffle(this.allOptions)
        this.allOptions.forEach(function(option){
             that.cards.push(new Card(option,that.dealerPx,that.dealerPy,that.dealerPz));
        })
        this.dealerCards = _.clone(this.cards)
    }
	addHand(name:string,px:number,py:number){
		var count = this.hands.length;
		px = px + count * 150;
		var hand = new Hand(name,px,py);
		this.hands.push(hand);
	}
	
	removeHand(){
		this.hands.pop();
	}
	allCards():Array<string>{
		return this.allOptions;
	}
	removeFirstCard(){
		this.dealerCards = _.rest(this.dealerCards);
	}
	bringRandomCard():string{
		var randNum = Math.floor(Math.random() * this.allOptions.length);
		var card = this.allOptions[randNum];
		this.allOptions.splice(randNum, 1)
		return card;
	}
	nextTurn(){
		var handsCount = this.hands.length;
		if (this.turn+1 > handsCount-1){
			this.turn = 0;
		}
		else{
			this.turn++
		}
	}
}

export class Hand{
	hand:Hand;
	maxPx:number;
	name:string;
	py:number;
	px:number;
	pz:number;
	cards:Array<Card> = [];
    constructor(name:string,py:number,px:number){
    	this.name = name;
		this.py = py;
		this.px = px;
		this.maxPx = this.px;
    }
    newCard(card:Card){
      this.cards.push(card);
    }
}

export class Card{
  hand:Hand;
  active:boolean = true;
  name:string;
  flipped:boolean = true;
  py:number;
  px:number;
  pz:number;
  constructor(cardName:string,px:number,py:number,pz:number){
     this.name = cardName;
     this.pz = pz;
     this.py = py;
     this.px = px;
  }
  setPlace(px:number,py:number){
  	this.px = px;
  	this.py = py;
  }
  turnFlip(hand:Hand){
  	this.hand = hand;
  	this.flipped = false;
  }
  flip(hand:Hand){
  	if(this.flipped){
 		this.active =!this.active
    	this.py = hand.py -25;
    	this.px = hand.maxPx +100;
   	 	hand.maxPx = hand.maxPx+60;
   	 	hand.newCard(this);
    	this.flipped = false;
	}
  }
  flipFlop(py:number,px:number){
  	if(this.flipped){
 		this.active = !this.active
    	this.py = py -25;
    	this.px = px + 100;
    	this.flipped = false;
	}
  }
}
export class Dealer{
	cards:Array<Card>;
	py:number;
	px:number;
	maxPx:number;
	constructor(cards:Array<Card>){
		this.cards = cards;
 	}
 	removeFirstCard(){}

}
export class Flop{
	cards:Array<Card> = [];
	py:number;
	px:number;
	maxPx:number;
	constructor(py:number,px:number) {
		this.px = px;
		this.py = py;
		this.maxPx = this.px;
	}
	addCard(card:Card){
		this.cards.push(card);
		this.maxPx = this.maxPx+100;

	}
}