import React, { useEffect, useState } from 'react';

export default function VB() {
  const [sports, setSports] = useState([]);
  const [selectedSport, setSelectedSport] = useState('');
  const [venues, setVenues] = useState([]);
  const [selectedVenueId, setSelectedVenueId] = useState('');
  const [eventDates, setEventDates] = useState([]);
  const [selectedEventDate, setSelectedEventDate] = useState('');
  const [eventTimes, setEventTimes] = useState([]);
  const [selectedEventTime, setSelectedEventTime] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedVenue, setSelectedVenue] = useState({});

  useEffect(() => {
    // Fetch the list of sports from your server
    fetch("http://localhost:5000/venues")
      .then((response) => response.json())
      .then((data) => {
        console.log("Sports Data:", data);
        setSports(data);
        setVenues(data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleSportChange = (e) => {
    const sportId = e.target.value;
    setSelectedSport(sportId);
    setSelectedVenueId('');
    setSelectedEventDate('');
    setSelectedEventTime('');
    setSelectedLocation('');

    // Fetch venues for the selected sport
    getVenues(sportId);
  };

  const getVenues = async (sportId) => {
    try {
      const response = await fetch(`http://localhost:5000/venues/${sportId}`);
      const jsonData = await response.json();
      setVenues(jsonData);
      console.log("Venue Data:", jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleVenueChange = (e) => {
    const venueId = e.target.value;
    setSelectedVenueId(venueId);
    setSelectedEventDate('');
    setSelectedEventTime('');
    setSelectedLocation('');

    // Fetch event dates for the selected venue and sport
    getEventDates(selectedSport, venueId);
  };

  const getEventDates = async (sportId, venueId) => {
    try {
      const response = await fetch(`http://localhost:5000/dates/${venueId}/${sportId}`);
      const jsonData = await response.json();
      setEventDates(jsonData);
      console.log("Event Dates:", jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEventDateChange = (e) => {
    const eventDate = e.target.value;
    setSelectedEventDate(eventDate);
    setSelectedEventTime('');
    setSelectedLocation('');

    // Fetch event times for the selected venue, sport, and date
    getEventTimes(selectedSport, selectedVenueId, eventDate);
  };

  const getEventTimes = async (sportId, venueId, eventDate) => {
    try {
      const response = await fetch(`http://localhost:5000/times/${venueId}/${sportId}/${eventDate}`);
      const jsonData = await response.json();
      setEventTimes(jsonData);
      console.log("Event Times:", jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleEventTimeChange = (e) => {
    const eventTime = e.target.value;
    setSelectedEventTime(eventTime);
    setSelectedLocation('');

    // Fetch locations for the selected venue, sport, date, and time
    getLocations(selectedSport, selectedVenueId, selectedEventDate, eventTime);
  };

  const getLocations = async (sportId, venueId, eventDate, eventTime) => {
    try {
      const response = await fetch(`http://localhost:5000/locations/${venueId}/${sportId}/${eventDate}/${eventTime}`);
      const jsonData = await response.json();
      setLocations(jsonData);
      console.log("Locations:", jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);

    // Fetch the price for the selected options
    getPrice(selectedSport, selectedVenueId, selectedEventDate, selectedEventTime, location);
  };

  const getPrice = async (sportId, venueId, eventDate, eventTime, location) => {
    try {
      const response = await fetch(`http://localhost:5000/prices/${venueId}/${sportId}/${eventDate}/${eventTime}/${location}`);
      const jsonData = await response.json();
      setSelectedVenue({ ...selectedVenue, price: jsonData.price });
      console.log("Price:", jsonData.price);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <form>
        <div className="form-group my-3">
          <label htmlFor="sport">Select a Sport</label>
          <select
            className="form-control"
            id="sport"
            value={selectedSport}
            onChange={handleSportChange}
            required
          >
            <option value="">Select a Sport</option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.sport_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="venue">Select a venue</label>
          <select
            className="form-control"
            id="venue"
            value={selectedVenueId}
            onClick={handleVenueChange}
            required
          >
            <option value="">Select a venue</option>
            {venues.map((venue) => (
              <option key={venue.id} value={venue.id}>
                {venue.venue_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="eventDate">Enter The Date</label>
          <select
            className="form-control"
            id="eventDate"
            value={selectedEventDate}
            onChange={handleEventDateChange}
            required
          >
            <option value="">Select a Date</option>
            {eventDates.map((date) => (
              <option key={date} value={date}>
                {new Date(date.event_date).toLocaleDateString()}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="eventTime">Enter The Time</label>
          <select
            className="form-control"
            id="eventTime"
            value={selectedEventTime}
            onChange={handleEventTimeChange}
            required
          >
            <option value="">Select a Time</option>
            {Array.isArray(eventTimes) ? (
      eventTimes.map((time) => (
        <option key={time} value={time}>
          {time.event_time}
        </option>
      ))
    ) : (
      <option value="">Loading Event Times...</option>
    )}
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="location">Enter The Location</label>
          <select
            className="form-control"
            id="location"
            value={selectedLocation}
            onChange={handleLocationChange}
            required
          >
            <option value="">Select a Location</option>
            {locations.map((location) => (
              <option key={location} value={location}>
                {location}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group my-3">
          <label htmlFor="price">The price for the current booking will be</label>
          <p>Price: {selectedVenue.price || 'Select a Venue'}</p>
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Submit Request
        </button>
      </form>
    </div>
  );
}
