import _ from 'lodash';
import Creature from '../creature/creature';

export default class CollectionController {
  /** @ngInject */
  constructor($timeout) {
    this.$timeout = $timeout;

    this.maxCages = 10;
    this.types = ['phoenix', 'medusa', 'hippogriff'];

    this.cages = [];
    this.stats = {};
    this.missed = false;

    this.ordering = 'captureTime';
  }

  cageIsFull() {
    return this.cages.length >= this.maxCages;
  }

  updateStats() {
    const stats = {
      totalMana: 0,
      totalAge: 0,
      totalCreatures: 0
    };

    if (this.cages.length === 0) {
      this.stats = stats;
    } else {
      this.stats = _.reduce(this.cages, (stats, creature) => {
        stats.totalMana += creature.mana;
        stats.totalAge += creature.age;
        stats.totalCreatures += 1;
        return stats;
      }, stats);
    }

    return this.stats;
  }

  addCreature() {
    if (this.cageIsFull()) {
      return null;
    }

    const type = this.types[_.random(this.types.length - 1)];

    const c = new Creature(type);
    this.cages.push(c);
    return c;
  }

  freeCreature(c) {
    c.gettingFree = true;

    this.$timeout(() => {
      const ind = _.findIndex(this.cages, {id: c.id});
      this.cages.splice(ind, 1);
      this.updateStats();
    }, 15000);
  }

  hunt() {
    if (_.random(1) === 0) {
      this.missed = true;
      return;
    }

    this.missed = false;
    this.addCreature();

    this.updateStats();
  }

  $onInit() {
    this.updateStats();
  }
}
