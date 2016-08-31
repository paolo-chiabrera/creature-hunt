import _ from 'lodash';

export default class Creature {
  constructor(type = 'phoenix', name = 'creature') {
    this.type = type;
    this.name = name;
    this.age = _.random(500);
    this.mana = 1000 + _.random(9000);
    this.captureTime = Date.now();
    this.gettingFree = false;

    this.id = this.type + '_' + this.captureTime;
  }
}
