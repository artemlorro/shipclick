import {$} from '../vendor/vendor';
import {ShipClick} from './components/ShipClick.Application';

$(() => {
	const application = new ShipClick();
	application.start();
});
