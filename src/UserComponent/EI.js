import React,{useEffect,useState} from 'react'

export default function EI() {
    const [sports,setSports] = useState([]);
    const [equipmentData, setEquipmentData] = useState([]); // New state for equipment data
    const [selectedSport, setSelectedSport] = useState(''); // State to track the selected sport
    const getVenues = async () => {
      try {
        const response = await fetch("http://localhost:5000/venues")
        const jsonData = await response.json();
        setSports(jsonData);
      } catch (err) {
        console.error(err.message);
      }
     }
     
     const fetchEquipmentData = async () => {
      try {
        const response = await fetch('http://localhost:5000/equipment'); // Replace with your API endpoint
        const jsonData = await response.json();
        setEquipmentData(jsonData);
      } catch (err) {
        console.error(err.message);
      }
    };


      useEffect(() => {
          getVenues();
          fetchEquipmentData(); 
      },[]);
  console.log(sports);

const handleSubmit = async (e) => {
  e.preventDefault();
   // Get selected sport ID from the form
   const selectedSportId = e.target.sport.value;
   setSelectedSport(selectedSportId);

   // Send the equipment data to your backend API here (POST request)
   const equipmentName = e.target.Equipment.value;
   const equipmentNo = e.target.EquipmentNo.value;

   //an object to represent the equipment data
   const equipmentData = {
     sport_id: selectedSportId,
     equipment_name: equipmentName,
     equipment_no: equipmentNo,
   };
   //a POST request to your backend API to add equipment data
   try {
     const response = await fetch('http://localhost:5000/equipment', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(equipmentData),
     });

     if (response.status === 201) {
       // Data successfully added, you can update the equipmentData state or show a success message
       fetchEquipmentData();
     } else {
       // Handle errors or display error messages as needed
       console.error('Failed to add equipment data');
     }
   } catch (err) {
     console.error(err.message);
   }


   // Clear the form fields
   e.target.Equipment.value = '';
   e.target.EquipmentNo.value = '';
}


  return (
    <div>
     <h2>Equipment Booking</h2>
     <form onSubmit={handleSubmit}>
     <div className="form-group my-3">
          <label htmlFor="sport">Select a Sport</label>
          <select className="form-control" id="sport" required>
            <option value="">Select a Sport</option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.sport_name}
              </option>
            ))}
          </select>
          </div>

  <div class="mb-3">
    <label for="Equipment" class="form-label">Enter the Name of Required Equipments</label>
    <input type="text" class="form-control" id="Equipment"/>
  </div>
  <div class="mb-3">
    <label for="EquipmentNo" class="form-label">Enter the No. of Required Equipments w.r.t capacity</label>
    <input type="text" class="form-control" id="EquipmentNo"/>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
