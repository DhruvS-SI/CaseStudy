import React, { useEffect, useState } from 'react';

export default function Equipment() {
  const [equip, setEquip] = useState([]);

  const getEquip = async () => {
    try {
      const response = await fetch("http://localhost:5000/equipment");
      const jsonData = await response.json();
      setEquip(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getEquip();
  }, []);

  console.log(equip);

  return (
    <div className="container mt-5">
      <h2>
        <center>Equipment Approval Details</center>
      </h2>
      <table className="table table-light table-hover">
        <thead>
          <tr>
            <th scope="col">Sport Name</th>
            <th scope="col">Equipment Names</th>
            <th scope="col">No of Equipments</th>
            <th scope="col">Approval</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {equip.map((equipment, index) => (
            <tr key={equipment.equipment_id}>
              <td>{equipment.sport_name}</td>
              <td>{equipment.equipment_name}</td>
              <td>{equipment.equipment_no}</td>
              <td>{/* Add approval value here */}</td>
              <td>{/* Add delete button or functionality here */}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
