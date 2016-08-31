import {expect} from 'chai';
import sinon from 'sinon';

import _ from 'lodash';

import CollectionController from './collection.controller';

describe('CollectionController', () => {
  let collectionController;
  let $timeout;

  beforeEach(() => {
    $timeout = sinon.spy(callback => {
      callback();
    });
    collectionController = new CollectionController($timeout);
  });

  it('should be defined', () => {
    expect(collectionController).to.be.an('object');
  });

  it('should have all the properties set', () => {
    expect(collectionController.ordering).to.be.a('string');
    expect(collectionController.ordering).to.equal('captureTime');

    expect(collectionController.missed).to.be.a('boolean');
    expect(collectionController.missed).to.equal(false);

    expect(collectionController.maxCages).to.be.a('number');
    expect(collectionController.maxCages).to.equal(10);

    expect(collectionController.types).to.be.an('array');
    expect(collectionController.types).to.eql(['phoenix', 'medusa', 'hippogriff']);

    expect(collectionController.cages).to.be.an('array');
    expect(collectionController.cages).to.eql([]);

    expect(collectionController.stats).to.be.an('object');
    expect(collectionController.stats).to.eql({});
  });

  describe('cageIsFull', () => {
    it('should be defined', () => {
      expect(collectionController.cageIsFull).to.be.a('function');
    });

    it('should return false', () => {
      expect(collectionController.cageIsFull()).to.equal(false);
    });

    it('should return true', () => {
      collectionController.cages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      expect(collectionController.cageIsFull()).to.equal(true);
    });
  });

  describe('updateStats', () => {
    it('should be defined', () => {
      expect(collectionController.updateStats).to.be.a('function');
    });

    it('should set empty stats', () => {
      collectionController.updateStats();

      expect(collectionController.stats).to.eql({
        totalMana: 0,
        totalAge: 0,
        totalCreatures: 0
      });
    });

    it('should set valid stats', () => {
      collectionController.addCreature();
      collectionController.cages[0].mana = 10;
      collectionController.cages[0].age = 10;
      collectionController.updateStats();

      expect(collectionController.stats).to.eql({
        totalMana: 10,
        totalAge: 10,
        totalCreatures: 1
      });
    });
  });

  describe('addCreature', () => {
    it('should be defined', () => {
      expect(collectionController.addCreature).to.be.a('function');
    });

    it('should return null', () => {
      collectionController.cages = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      const c = collectionController.addCreature();

      expect(c).to.equal(null);
    });

    it('should return a creature', () => {
      const c = collectionController.addCreature();

      expect(c).to.be.an('object');
      expect(collectionController.cages.length).to.equal(1);
    });
  });

  describe('freeCreature', () => {
    it('should be defined', () => {
      expect(collectionController.freeCreature).to.be.a('function');
    });

    it('should free a creature', () => {
      const c = collectionController.addCreature();

      collectionController.freeCreature(c);

      expect(c.gettingFree).to.equal(true);
      sinon.assert.calledOnce($timeout);
      expect(collectionController.cages.length).to.equal(0);
    });
  });

  describe('hunt', () => {
    it('should be defined', () => {
      expect(collectionController.hunt).to.be.a('function');
    });

    it('should set miss to true', () => {
      const random = sinon.stub(_, 'random', () => {
        return 0;
      });

      collectionController.hunt();
      expect(collectionController.missed).to.equal(true);

      random.restore();
    });

    it('should set miss to false and add a creature', () => {
      const random = sinon.stub(_, 'random', () => {
        return 1;
      });

      const updateStats = sinon.spy(collectionController, 'updateStats');

      collectionController.hunt();
      expect(collectionController.missed).to.equal(false);
      expect(collectionController.cages.length).to.equal(1);

      sinon.assert.calledOnce(updateStats);

      random.restore();
      updateStats.restore();
    });
  });

  describe('$onInit', () => {
    it('should be defined', () => {
      expect(collectionController.$onInit).to.be.a('function');
    });

    it('should call updateStats()', () => {
      const updateStats = sinon.spy(collectionController, 'updateStats');

      collectionController.$onInit();

      sinon.assert.calledOnce(updateStats);

      updateStats.restore();
    });
  });
});
