import {Component,Input} from '@angular/core';



@Component({
	selector:'my-hand',
    templateUrl: '/html/hand.html'
})

export class HandComponent {
	constructor(){}
	@Input('py')
    py: number
    @Input('px')
    px: number
    @Input('name')
    name: string
}