/**
 * Created by artem on 06.04.17.
 */
import {Backbone} from '../../vendor/vendor';

export const G_VARIABLES = {
	MAX_HEALTH: 1,
	MAX_SCORE: 100,
	SCORE_COEFFICIENT_PART: 0.5,
	MIN_POS_Y: 45,
	MAX_POS_Y: 355,
	MIN_SIZE: 15,
	MAX_SIZE: 45,
};

export class Ship extends Backbone.Model {
	defaults() {
		return {
			'type': this.randomFigure(),
			'posX': 0,
			'posY': this.random(G_VARIABLES.MIN_POS_Y,G_VARIABLES.MAX_POS_Y),
			'health': G_VARIABLES.MAX_HEALTH,
			'size': this.random(G_VARIABLES.MIN_SIZE,G_VARIABLES.MAX_SIZE),
			'score': G_VARIABLES.MAX_SCORE,
		}
	}

	random(min,max){
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	randomFigure(){
		let FIGURES = ['square', 'circle', 'triangle', 'rhombus'];
		return FIGURES[this.random(0, FIGURES.length-1)];
	}

	constructor(...args){
		super(...args);
	}

}

export class ShipCollection extends Backbone.Collection {
	constructor(...args) {
		super(...args);
		this.model = Ship;
	}
}