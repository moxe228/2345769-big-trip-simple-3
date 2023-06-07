import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const updateItem = (items, update) => (
  items.map((item) => item.id === update.id ? update : item)
);

const convertToEventDateTime = (date) => (dayjs(date).format('H:mm'));
const convertToEventDate = (date) => (dayjs(date).format('MMM D'));
const convertToEditFormDateTime = (date) => (dayjs(date).format('DD/MM/YY HH:mm'));

const isTripPointFuture = (tripPoint) => {
  const dateFrom = tripPoint.dateFrom;
  const dateTo = tripPoint.dateTo;

  return (dayjs().isAfter(dateFrom) && dayjs().isBefore(dateTo)) || dayjs().isSame(dateFrom) || dayjs().isBefore(dateFrom);
};

const sortTripPointDateUp = (tripPointA, tripPointB) => dayjs(tripPointA.dateFrom).diff(dayjs(tripPointB.dateFrom));

const sortTripPointPriceUp = (tripPointA, tripPointB) => tripPointA.basePrice - tripPointB.basePrice;

export {sortTripPointPriceUp, sortTripPointDateUp, updateItem, getRandomInteger, convertToEventDateTime, convertToEventDate, convertToEditFormDateTime, isTripPointFuture};
