import _ from  'underscore';
import Backbone from 'backbone';
import $ from 'jquery';
import easing from 'jquery.easing';
import Marionette from 'backbone.marionette';
import Radio from 'backbone.radio';
import LocalStorage from 'backbone.localstorage';
Backbone.$ = $;
easing.$ = $;
window.$ = $;
export {_, $, Backbone, Marionette, Radio, easing, LocalStorage};