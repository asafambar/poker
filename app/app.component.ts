import {Component} from '@angular/core';
import {CardComponent} from './card.component';
import {HandComponent} from  './hand.component';
import {Game,Hand,Flop} from './model/control';

@Component({
    selector: 'my-app',
    directives: [CardComponent,HandComponent],
    templateUrl:'/html/app.html' 

})
export class AppComponent {
  game = new Game();
  px:number = 110;
  py:number = 170;
  pz: number = 0;
  playerPy: number = 100;
  playerPx: number = 900;
  p: string = "1";
  startPlaying:boolean = true;
  stopPlaying:boolean = false;
  thirdFlop:boolean = false;
  floopX:number = 200;    
  floopY:number = 300;
  flop = new Flop(this.floopY,this.floopX);
  secondFlopButton:boolean = true;
  constructor() {

  }
  init(){
    if (this.stopPlaying) {
      console.log(2)
      this.game = new Game();
      this.p = "1";
      this.startPlaying = true;
      this.stopPlaying = false;
      this.thirdFlop = false;
      this.secondFlopButton = true;
      this.flop = new Flop(this.floopY, this.floopX);
    }
  }
  addPlyar(){
	this.game.addHand(this.p,this.playerPy,this.playerPx);
    var num = +this.p;
    num++
    this.p = String(num);
    +this.p>2? this.startPlaying=false:null;

  }
  removePlyar(){
    this.game.removeHand();
    var num = +this.p;
    num == 1? null:num--
    this.p = String(num);
  }
  startGame(){
    if (!this.stopPlaying) {
      this.stopPlaying = true;
      this.firstFlop();
    }
    
  }
  myLoop(i:number){
  	    var that = this
 		setTimeout(function(){
 			that.game.dealerCards[0].flip(that.game.hands[that.game.turn]);
    		that.game.maxPz++;
    		that.game.nextTurn();
    		that.game.removeFirstCard();
    		i++
    		if(i < 2 *(+that.p-1)){
    			that.myLoop(i);
    		}
    	},800);
 }
 mySecondLoop(i:number){
  	    var that = this
 		setTimeout(function(){
 			that.game.dealerCards[0].flipFlop(that.flop.py,that.flop.maxPx);
 			that.flop.addCard(that.game.dealerCards[0])
    		that.game.removeFirstCard();
    		i++
    		if(i < 3){
    			that.mySecondLoop(i);
    		}
    	},800);
 }
 myThirdLoop(i: number) {
   var that = this
     setTimeout(function() {
     that.game.dealerCards[0].flipFlop(that.flop.py, that.flop.maxPx);
     that.flop.addCard(that.game.dealerCards[0])
     that.game.removeFirstCard();
     i++
     if (i < 1) {
       that.mySecondLoop(i);
     }
   }, 800);
 }

 controlFlop(){
 	if(!this.thirdFlop){
      this.mySecondLoop(0);
      this.thirdFlop = true;
 	}
 	else if(this.flop.cards.length < 5){
 		this.myThirdLoop(0);
 	}
 }

firstFlop(){
  		this.myLoop(0);
  		this.secondFlopButton = false;
 }
}
  






