/**
 * Created by artem on 05.04.17.
 */
import {Backbone, Radio, LocalStorage} from '../../vendor/vendor';

export class Player extends Backbone.Model {
	constructor(...args){
		super(...args);
		this.rChannel = Radio.channel('all');
		this.localStorage = new LocalStorage('player-collection');
		console.log(this);
	}

	defaults() {
		return {
			'rank': 0,
			'username': 'player',
			'score': 0
		}
	}
}

export class PlayerCollection extends Backbone.Collection {
	constructor(models = []){
		super(models);
		this.model = Player;
		this.localStorage = new LocalStorage('player-collection');
		console.log(this);
	}
	comparator(item){
		return -item.get('score')
	}
}
