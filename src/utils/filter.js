import {FilterType} from '../const';
import {isTripPointFuture} from './trip_point';


const filter = {
  [FilterType.EVERYTHING]: (tripPoints) => tripPoints,
  [FilterType.FUTURE]: (tripPoints) => tripPoints.filter((tripPoint) => isTripPointFuture(tripPoint))
};

const filterNameUpperLetter = {
  'everything': 'Everything',
  'future': 'Future'
};

export {filter, filterNameUpperLetter};
