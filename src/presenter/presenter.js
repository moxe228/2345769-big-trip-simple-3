import CreateFormView from '../view/create_form_view';
import TripPointView from '../view/trip_point_view';
import TripEventsView from '../view/trip_events_view';
import SortView from '../view/sort_view';
import {render} from '../render';
import EditFormView from '../view/edit_form_view';

export default class BoardPresenter {
  boardComponent = new TripEventsView();

  init = (boardContainer, tripPointsModel) => {
    this.boardContainer = boardContainer;
    this.tripPointsModel = tripPointsModel;
    this.tripPoints = [...this.tripPointsModel.tripPoints];

    render(new SortView(), this.boardContainer);
    render(this.boardComponent, this.boardContainer);

    render(new CreateFormView(), this.boardComponent.getElement());
    render(new EditFormView(this.tripPoints[0]), this.boardComponent.getElement());

    for (let i = 1; i < this.tripPoints.length; i++) {
      render(new TripPointView({tripPoint: this.tripPoints[i]}), this.boardComponent.getElement());
    }

  };
}
