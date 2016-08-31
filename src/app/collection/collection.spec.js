import angular from 'angular';
import 'angular-mocks';
import {collection} from './collection';

describe('collection component', () => {
  beforeEach(() => {
    angular
      .module('collection', ['app/collection/collection.html'])
      .component('collectionCmp', collection);
    angular.mock.module('collection');
  });

  it('should render collection', angular.mock.inject(($rootScope, $compile) => {
    const element = $compile('<collection-cmp></collection-cmp>')($rootScope);
    $rootScope.$digest();
    const toolbar = element.find('md-toolbar');
    expect(toolbar.length).toEqual(1);
    const grid = element.find('md-grid-list');
    expect(grid.length).toEqual(1);
  }));
});
