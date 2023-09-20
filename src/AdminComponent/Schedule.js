import React,{useEffect, useState} from 'react'

export default function Schedule() {
   const [venues,setVenues] = useState([]);

//delete function
const deletevenues = async (id) =>{
  try {
    const deletemainV = await fetch(`http://localhost:5000/venues/${id}`,{
      method:"DELETE"
    })
    setVenues(venues.filter(mainV => mainV.id !== id));
  } catch (err) {
    console.error(err.message)
  }
}
   const getVenues = async () => {
    try {
      const response = await fetch("http://localhost:5000/venues")
      const jsonData = await response.json();
      setVenues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
   }
    useEffect(() => {
        getVenues();
    },[]);
console.log(venues);
  return (
    <div class="container mt-5">
    <h2><center>Scheduled Event Details</center></h2>
    <table class="table table-light table-hover">
  <thead>
    <tr>
      <th scope="col">Venue Name</th>
      <th scope="col">Sport Name</th>
      <th scope="col">Event Date</th>
      <th scope="col">Event Time</th>
      <th scope="col">Capacity</th>
      <th scope="col">Location Venue</th>
      <th scope="col">Price</th>
      <th scope="col">EDIT</th>
      <th scope="col">DELETE</th>
    </tr>
  </thead>
  <tbody>

  {venues.map((mainV, index) => (
  <tr key={index.mainV_id}>
    <td>{mainV.venue_name}</td>
    <td>{mainV.sport_name}</td>
    <td>{new Date(mainV.event_date).toLocaleDateString()}</td>
    <td>{mainV.event_time}</td>
    <td>{mainV.capacity}</td>
    <td>{mainV.location_venue}</td>
    <td>{mainV.price}</td>
    <td>EDIT</td>
    <td><button className="btn btn-danger" onClick={() => deletevenues(mainV.id)}>DELETE</button></td>
  </tr>
))}
  
  </tbody>

</table>
    </div>
  )
}
