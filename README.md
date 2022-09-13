# YKY restaurant | Restaurant Reservation System

YKY is a restaurant reservation system. 
This application is used by restaurant employees to track tables and reservations of customers.

## Live Deployment
- View [Periodic Tables App](https://restaurant-v1-frontend.herokuapp.com/dashboard/)
- View [Periodic Tables server](https://restaurant-v1-backend.herokuapp.com/)

### API
| Method | Routes | Description                                                      |
| ------ | ------ | ------------------------------------- |
| `GET`  |  `/reservations`  | List all reservations for current date. |
| `GET`  | `/reservations?date=YYYY-MM-DD`| List all reservations for query date. |
| `POST` | `/reservations` | Create a new reservation. No `reservation_id` or `status` should be provided. Other fields are required. |
| `GET` | `/reservations/:reservation_id` | Read a specific reservation by `reservation_id`. |
| `PUT` | `/reservations/:reservation_id` | Update reservation by `reservation_id`' |
| `PUT` | `/reservations/:reservation_id/status` | Update the status of a reservation |
| `GET` | `tables` | List all tables |
| `POST` | `tables` | Create a new table. Only `table_name` and `capacity` should be provided. |
| `PUT` | `tables/:tables_id/seat` | Assign a table to a reservation and change that reservation's `status` to seated.|
| `DELETE` | `tables/:tables_id/seat`| Removes a reservation from a table and changes the reservation's `status` to finished.|

### Description
This application creates a new reservation with the guest's name, number, party size, date, and time.

Reservations can only be made during business hours. Periodic Tables limits the creation of new reservations to future dates and during business hours (currently, between 10:30 am and 9:30 pm every day except Tuesdays).

Periodic Tables assigns a status of booked, seated, finished, or canceled. finished and canceled reservations are hidden from the dashboard.

The Periodic Tables search a partial or complete phone number and get back a list of all matching reservations.

Modify or cancel a reservation to keep the reservations up to date. Periodic Tables allows reservations that have not yet been seated to be edited or canceled.

### Technology

##### Frontend
- React	
- JavaScript	
- HTML	
- JSX	
- CSS	
- React Router/Hooks

##### Backend
- Node.js
- Express
- Knex
- CORS
- PostgreSQL

## Installation

1. Fork and clone this repository.
1. Run `cp ./back-end/.env.sample ./back-end/.env`.
1. Update the `./back-end/.env` file with the connection URL's to your ElephantSQL database instance.
1. Run `cp ./front-end/.env.sample ./front-end/.env`.
1. You should not need to make changes to the `./front-end/.env` file unless you want to connect to a backend at a location other than `http://localhost:5001`.
1. Run `npm install` to install project dependencies.
1. Run `npm run start:dev` to start your server in development mode.




