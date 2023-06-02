import FormView from '../view/form_view';
import TripPointView from '../view/trip_point_view';
import TripEventsView from '../view/trip_events_view';
import {render} from '../render';

export default class BoardPresenter {
  boardComponent = new TripEventsView();

  init = (boardContainer) => {
    this.boardContainer = boardContainer;

    render(this.boardComponent, this.boardContainer);

    render(new FormView(), this.boardComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new TripPointView(), this.boardComponent.getElement());
    }

  };
}
