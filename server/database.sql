CREATE TABLE mainV (
  id SERIAL PRIMARY KEY,
  venue_name VARCHAR(255),
  sport_name VARCHAR(255),
  event_date DATE,
  event_time TIME,
  capacity INT,
  location_venue VARCHAR(255),
  price NUMERIC(10, 2)
);