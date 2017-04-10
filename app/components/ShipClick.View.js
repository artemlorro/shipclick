/**
 * Created by artem on 05.04.17.
 */
import {Marionette, Backbone, Radio, $, _} from '../../vendor/vendor';
import {Player} from './ShipClick.Player';

export class PlayerView extends Marionette.View {
	className() { return 'player-view'}

	tagName() { return 'tr' }

	constructor(...args) {
		super(...args);
		this.className = 'player-view';
		this.template = '#template-player-item-view';
		this.modelEvents = {
			change: 'render'
		}
	}

}

export class ScoreViewListBody extends Marionette.CollectionView {
	className() { return 'score-view'}

	tagName() { return 'tbody' }

	constructor(...args) {
		super(...args);
		this.id = 'total-score';
		this.childView = PlayerView;
	}

	beforeRender(){
		this.sort();
	}

}
export class TableView extends Marionette.View {
	className() { return 'table-view'}

	tagName() { return 'table' }

	regions() {
		return {
			body: {
				el: '.rg-tbody',
				replaceElement: true
			}
		}
	}

	constructor(...args) {
		super(...args);
		this.id = 'table-score';
		this.template = '#template-player-item-body';
	}

	onRender() {
		this.showChildView('body', new ScoreViewListBody({collection: this.collection}));
	}

}

export class ShipView extends Marionette.View {
	className() {return 'ship-object';}

	ui() {
		return {
			destroy: '.figure'
		}
	}

	events() {
		return {
			'click @ui.destroy': 'clickToShip'
		}
	}

	modelEvents() {
		return {
			remove: 'render'
		}
	}

	constructor(...args) {
		super(...args);
		this.template = _.template(`<div class="<%=type%> figure" ></div>`);
		this.rChannel = Radio.channel('all');
	}

	onRender() {
		this.$el.css({top: this.model.attributes.posY + 'px', left: -this.model.attributes.size});
		this.$el.width(this.model.attributes.size).height(this.model.attributes.size);
		if (this.model.attributes.type == 'triangle') {
			this.$el.find('.figure').css({
				'border-left-width': this.model.attributes.size / 2 + 'px',
				'border-right-width': this.model.attributes.size / 2 + 'px',
				'border-bottom-width': this.model.attributes.size + 'px'
			});
		}
		this.rChannel.request('ship:create', this);
	}

	clickToShip() {
		this.model.attributes.health -= 1;
		if (this.model.attributes.health <= 0) {
			this.destroyModel();
		}
	}

	destroyModel() {
		this.rChannel.request('ship:remove', this);
		this.remove();
	}
}

export class CurrentScore extends Marionette.View {
	constructor(...args){
		super(...args);
		this.template = _.template(`<div><%=score%></div>`);
	}

	initialize(){
		this.model.on('change', this.render, this);
	}

}



