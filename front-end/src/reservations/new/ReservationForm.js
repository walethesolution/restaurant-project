import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm({ reservation, setReservation }) {
  const history = useHistory();

  function cancelHandler() {
    history.goBack();
  }

  function changeHandler({ target: { name, value } }) {
    setReservation((previousReservation) => ({
      ...previousReservation,
      [name]: value,
    }));
  }

  return (
    <>
      <div className="col-md-6 col-lg-6">
        <label htmlFor="first_name" className="form-label">
          First Name:
        </label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          className="form-control"
          require="true"
          onChange={changeHandler}
          value={reservation.first_name}
        />
      </div>
      <div className="col-md-6 col-lg-6">
        <label htmlFor="last_name" className="form-label">
          Last Name:
        </label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          className="form-control"
          require="true"
          onChange={changeHandler}
          value={reservation.last_name}
        />
      </div>
      <div className="col-md-6 col-lg-4">
        <label htmlFor="mobile_number" className="form-label">
          Mobile Number:
        </label>
        <input
          id="mobile_number"
          name="mobile_number"
          type="tel"
          className="form-control"
          require="true"
          onChange={changeHandler}
          value={reservation.mobile_number}
        />
        <div id="mobileNumberHelp" className="form-text">
          Format: XXX-XXX-XXXX or XXX-XXXX
        </div>
      </div>
      <div className="col-md-6 col-lg-4">
        <label htmlFor="people" className="form-label">
          Number of People in Party:
        </label>
        <input
          id="people"
          name="people"
          type="text"
          className="form-control"
          pattern="[1-6]"
          require="true"
          onChange={changeHandler}
          value={reservation.people}
        />
        <div id="peopleHelp" className="form-text">
          Party size must range from 1-6
        </div>
      </div>
      <div className="col-md-4 col-lg-4">
        <label htmlFor="reservation_date" className="form-label">
          Date of Reservation:
        </label>
        <input
          id="reservation_date"
          name="reservation_date"
          type="date"
          className="form-control text-center"
          pattern="\d{4}-\d{2}-\d{2}"
          require="true"
          onChange={changeHandler}
          value={reservation.reservation_date}
        />
      </div>
      <div className="col-md-4 col-lg-3 pr-3">
        <label htmlFor="reservation_time" className="form-label">
          Time of Reservation:
        </label>
        <input
          id="reservation_time"
          name="reservation_time"
          type="time"
          className="form-control text-center"
          pattern="[0-9]{2}:[0-9]{2}"
          require="true"
          onChange={changeHandler}
          value={reservation.reservation_time}
        />
        <div id="reservationTimeHelp" className="form-text">
          Business Hours: 10:30AM to 10:30PM (latest reservation allowed:
          9:30PM)
        </div>
      </div>
      <div className="mt-4 d-grid gap-3 d-flex justify-content-end pr-3">
        <button
          type="button"
          className="btn btn-danger"
          onClick={cancelHandler}
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </div>
    </>
  );
}

export default ReservationForm;
