/**
 * Created by artem on 05.04.17.
 */
import {Marionette, Backbone, Radio, $} from '../../vendor/vendor';
import {Player, PlayerCollection} from "./ShipClick.Player";
import {Ship, ShipCollection, G_VARIABLES} from "./ShipClick.Ship";
import {RootLayout, ControlsLayout} from './ShipClick.Layout';
import {TableView, ShipView, CurrentScore} from './ShipClick.View';

export class ShipClick extends Marionette.Application {
	channelName() {
		return 'all';
	}

	radioRequests() {
		return {
			'ship:remove': 'newShipAndScore',
			'ship:create': 'startAnimation',
			'player:game-over': 'savePlayer'
		}
	}

	initialize() {
		this.root = new RootLayout();
		this.currentPlayer = new Player();
		this.playerList = new PlayerCollection();
		this.currentShip = new Ship();
		this.timerId = 0;

	}

	newShipAndScore(view) {
		this.currentShip = new Ship();
		this.currentPlayer.set({score:view.model.attributes.score + this.currentPlayer.attributes.score});
		view.$el.stop();
		this.createShip();
	}

	startAnimation(shipView) {
		var fieldWidth = $('#game-field').width();
		shipView.$el.animate(
			{
				left: fieldWidth
			},
			{
				duration: 10000,
				easing: 'easeInCubic',
				step: () => {
					let score = G_VARIABLES.MAX_SCORE - Math.floor((G_VARIABLES.MAX_SCORE*shipView.$el.position().left) / fieldWidth);
					shipView.model.set({score:score});
				},
				complete: () => { this.stopGame(shipView);}
			}
		);
	}

	showCurrentScore(player){
		this.root.showChildView('currentScore', new CurrentScore({model:player}));
	}

	showScore(playerList) {
		this.root.showChildView('score', new TableView({collection: playerList}));
	}

	createShip() {
		let view = new ShipView({model: this.currentShip});
		this.root.showChildView('field', view);
	}

	stopGame(ship) {
		this.currentPlayer.save();
		this.playerList.add(this.currentPlayer);
		ship.remove();
	}

	stopTime() {
		clearInterval(this.timerId);
		this.timerId = 0;
	}

	onStart() {
		console.log(Math.random());
		this.showCurrentScore(this.currentPlayer);
		this.showScore(this.playerList);
		this.createShip();
		this.playerList.fetch();
		Backbone.history.start();
	}

}

