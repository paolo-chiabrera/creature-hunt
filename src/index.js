import angular from 'angular';

import ngMaterial from 'angular-material';

import {main} from './app/main';
import {collection} from './app/collection/collection';

import './index.scss';
import '../node_modules/angular-material/angular-material.min.css';

angular
  .module('app', ['ngMaterial'])
  .component('app', main)
  .component('collectionCmp', collection);
