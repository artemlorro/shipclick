/**
 * Created by artem on 05.04.17.
 */
import {Marionette} from '../../vendor/vendor';
import {CurrentScore} from './ShipClick.View'

export class RootLayout extends Marionette.View {
	constructor() {
		super();
		this.el = '#app';
	}

	regions() {
		return {
			controls: '#controls-panel',
			currentScore: '#current-score',
			field: '#game-field',
			score: '#total-score'
		}
	}
}

