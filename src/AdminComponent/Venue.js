import React, { useState } from 'react'

export default function Venue() {
    const [formData, setFormData] = useState({
        venue_name: '',
        sport_name: '',
        event_date: '',
        event_time: '',
        capacity: '',
        location_venue: '',
        price: ''
      });
    const { venue_name, sport_name, event_date, event_time, capacity, location_venue, price } = formData;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
      const onSubmitForm = async (e) => {
        e.preventDefault();
        try {
          const body = {
            venue_name,
            sport_name,
            event_date,
            event_time,
            capacity,
            location_venue,
            price
          };
            const response = await fetch("http://localhost:5000/venues",{
                method: "POST",
                headers: {"Content-Type":"application/json"},
                body: JSON.stringify(body)
            });
            window.location = "/Schedule";
        } catch (err) {
            console.error(err.message);
        }
    }
  return (
    <div>
      {/* <form onSubmit={onSubmitForm}> */}
      <form>
        <div class="form-group my-3">
            <label for="venueName">Venue Name</label>
            <input type="text" class="form-control" id="venueName"  name="venue_name" value={venue_name} onChange={handleChange} placeholder="Enter venue name" required/>
        </div>
        <div class="form-group my-3">
            <label for="venueName">Sport Name</label>
            <input type="text" class="form-control" id="sportName" name="sport_name" value={sport_name} onChange={handleChange} placeholder="Enter Sport name" required/>
        </div>
        <div class="my-3">
    <label for="eventDate" class="form-label">Event Date</label>
    <input type="date" class="form-control" id="eventDate" name="event_date" value={event_date} onChange={handleChange} required/>
   </div>
   <div class="my-3">
    <label for="eventTime" class="form-label">Event Time</label>
    <input type="time" class="form-control" id="eventTime" name="event_time" value={event_time} onChange={handleChange} required/>
    </div>
        <div class="form-group my-3">
            <label for="capacity">Capacity</label>
            <input type="number" class="form-control" id="capacity" name="capacity" value={capacity} onChange={handleChange} placeholder="Enter capacity" required/>
        </div>
        <div class="form-group my-3">
            <label for="location">Location</label>
            <input type="text" class="form-control" id="location" name="location_venue" value={location_venue} onChange={handleChange} placeholder="Enter location" required/>
        </div>
        <div class="form-group my-3">
            <label for="Price">Price</label>
            <input type="text" class="form-control" id="price" name="price" value={price} onChange={handleChange} placeholder="Enter Price" required/>
        </div>
        <button type="button" onClick={onSubmitForm}  class="btn btn-primary my-3">Add Venue</button>
    </form>
    </div>
  )
}
