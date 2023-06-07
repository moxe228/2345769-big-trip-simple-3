import TripEventsView from '../view/trip_events_view';
import SortView from '../view/sort_view';
import {render} from '../framework/render';
import EmptyPointListView from '../view/empty_point_list_view';
import PointPresenter from './point_presenter';
import {updateItem} from '../utils/trip_point';
import {SortType} from '../const';
import {sortTripPointDateUp, sortTripPointPriceUp} from '../utils/trip_point';

export default class BoardPresenter {
  #boardComponent = new TripEventsView();
  #emptyPointListComponent = new EmptyPointListView();
  #sortComponent = new SortView();
  #tripPointPresenter = new Map();
  #boardContainer = null;
  #tripPointsModel = null;
  #currentSortType = SortType.DATE_UP;
  #tripPoints = [];

  constructor(boardContainer, tripPointsModel) {
    this.#boardContainer = boardContainer;
    this.#tripPointsModel = tripPointsModel;
  }

  init = () => {
    this.#tripPoints = [...this.#tripPointsModel.tripPoints];
    this.#renderBoard();
  };

  #renderTripPoint = (tripPoint) => {
    const tripPointPresenter = new PointPresenter({
      boardComponent: this.#boardComponent,
      onModeChange: this.#handleModeChange
    });
    tripPointPresenter.init(tripPoint);
    this.#tripPointPresenter.set(tripPoint.id, tripPointPresenter);
  };

  #handleModeChange = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.resetView());
  };

  #handleTripPointChange = (updatedTripPoint) => {
    this.#boardComponent = updateItem(this.#tripPoints, updatedTripPoint);
    this.#tripPointPresenter.get(updatedTripPoint.id).init(updatedTripPoint);
  };

  #sortTripPoints = (sortType) => {
    if (sortType === SortType.DATE_UP) {
      this.#tripPoints.sort(sortTripPointDateUp);
    } else {
      this.#tripPoints.sort(sortTripPointPriceUp);
    }
    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortTripPoints(sortType);
    this.#clearTripPoints();
    this.#renderTripPoints();
  };

  #clearTripPoints = () => {
    this.#tripPointPresenter.forEach((presenter) => presenter.destroy());
    this.#tripPointPresenter.clear();
  };

  #renderNoTripPoints = () => {
    render(this.#emptyPointListComponent, this.#boardComponent.element);
  };

  #renderTripPoints = () => {
    if (this.#tripPoints.length === 0) {
      this.#renderNoTripPoints();
    }
    for (let i = 0; i < this.#tripPoints.length; i++) {
      this.#renderTripPoint(this.#tripPoints[i]);
    }
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#boardComponent.element);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderBoard = () => {
    render(this.#boardComponent, this.#boardContainer);
    this.#renderSort();
    this.#renderTripPoints();
  };
}
