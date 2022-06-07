/**
 * List handler for reservation resources
 */
const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../utils/has-properties");
const hasOnlyValidProperties = require("../utils/has-only-valid-properties");
const {
  validateDate,
  storeIsOpen,
  dateIsNotBeforeToday,
  validateTime,
  validatePeople,
  validateReservationTime,
  validateStatus,
  validateCurrentStatus,
  validateStatusUpdate,
} = require("../utils/validation");

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
  "status",
];

const hasRequiredProperties = hasProperties(
  ...[
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ]
);
const hasOnlyValidReservationProperties = hasOnlyValidProperties(
  ...VALID_PROPERTIES
);
const hasRequiredUpdateProperties = hasProperties(
  ...[
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
  ]
);
const hasOnlyValidUpdatePropeties = hasOnlyValidProperties(
  ...[
    "first_name",
    "last_name",
    "mobile_number",
    "reservation_date",
    "reservation_time",
    "people",
    "status",
    "reservation_id",
    "created_at",
    "updated_at",
  ]
);

async function reservationExist(req, res, next) {
  const { reservation_id } = req.params;
  const reservation = await service.read(reservation_id);

  if (reservation) {
    res.locals.reservation = reservation;
    return next();
  }
  next({ status: 404, message: reservation_id });
}

async function checkQueryParams(req, res, next) {
  const { date = "", mobile_number = "" } = req.query;
  if (date) {
    res.locals.reservations = await service.searchByReservationDate(date);
  } else if (mobile_number) {
    res.locals.reservations = await service.searchByPhone(mobile_number);
  }
  next();
}

async function getReservationsByFilterOptions(req, res) {
  const reservations = res.locals.reservations || (await service.listAll());
  const reservationsNotFinished = reservations.filter(
    (reservation) => reservation.status !== "finished"
  );
  const sortedReservations = reservationsNotFinished.sort(
    (firstElem, secElem) => {
      return firstElem.reservation_time.localeCompare(secElem.reservation_time);
    }
  );

  res.status(200).json({ data: sortedReservations });
}

async function create(req, res) {
  res.status(201).json({ data: await service.create(req.body.data) });
}

function read(req, res) {
  res.status(200).json({ data: res.locals.reservation });
}

async function update(req, res) {
  const updatedReservation = {
    ...req.body.data,
    reservation_id: res.locals.reservation.reservation_id,
  };
  res.status(200).json({ data: await service.update(updatedReservation) });
}

async function updateStatus(req, res) {
  const updatedReservation = {
    ...res.locals.reservation,
    status: req.body.data.status,
  };
  res.status(200).json({ data: await service.update(updatedReservation) });
}

module.exports = {
  getReservations: [
    asyncErrorBoundary(checkQueryParams),
    asyncErrorBoundary(getReservationsByFilterOptions),
  ],
  create: [
    hasOnlyValidReservationProperties,
    hasRequiredProperties,
    validateDate,
    storeIsOpen,
    dateIsNotBeforeToday,
    validateTime,
    validatePeople,
    validateReservationTime,
    validateStatus,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExist), asyncErrorBoundary(read)],
  update: [
    asyncErrorBoundary(reservationExist),
    hasRequiredUpdateProperties,
    hasOnlyValidUpdatePropeties,
    validateDate,
    storeIsOpen,
    dateIsNotBeforeToday,
    validateTime,
    validatePeople,
    validateReservationTime,
    asyncErrorBoundary(update),
  ],
  updateStatus: [
    asyncErrorBoundary(reservationExist),
    validateCurrentStatus,
    validateStatusUpdate,
    asyncErrorBoundary(updateStatus),
  ],
};
