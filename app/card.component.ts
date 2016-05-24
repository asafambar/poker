import {Component,Input} from '@angular/core';
import {Game, Hand,Card} from './model/control';


@Component({
	selector:'my-card',
	
    templateUrl:'/html/card.html' 
})

export class CardComponent {
  constructor() {
  }
  @Input('card')
  	card:Card
  @Input('game')
  	game:Game
  @Input('px')
  	px:number  
  @Input('py')
  	py:number  
  @Input('pz')
  	pz:number  
  @Input('name')
  	name:string
  @Input('active')
  	active:boolean	
}

