import {expect} from 'chai';

import Creature from './creature';

describe('Creature', () => {
  let creature;

  beforeEach(() => {
    creature = new Creature();
  });

  it('should be defined', () => {
    expect(creature).to.be.an('object');
  });

  it('should have all the properties set', () => {
    expect(creature.id).to.be.a('string');
    expect(creature.id).to.equal(creature.type + '_' + creature.captureTime);

    expect(creature.type).to.be.a('string');
    expect(creature.type).to.equal('phoenix');

    expect(creature.name).to.be.a('string');
    expect(creature.name).to.equal('creature');

    expect(creature.gettingFree).to.be.a('boolean');
    expect(creature.gettingFree).to.equal(false);

    expect(creature.captureTime).to.be.a('number');

    expect(creature.age).to.be.a('number');
    expect(creature.age).to.be.at.least(0);
    expect(creature.age).to.be.at.most(500);

    expect(creature.mana).to.be.a('number');
    expect(creature.mana).to.be.at.least(1000);
    expect(creature.mana).to.be.at.most(10000);
  });

  it('should set custom type and name', () => {
    const creature = new Creature('medusa', 'newname');

    expect(creature.type).to.be.a('string');
    expect(creature.type).to.equal('medusa');

    expect(creature.name).to.be.a('string');
    expect(creature.name).to.equal('newname');
  });
});
