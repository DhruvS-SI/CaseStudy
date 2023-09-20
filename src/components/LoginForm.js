import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';
export default function LoginForm({onLogin}) {

  const navigate = useNavigate();
    // State for form input values
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

 // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add your authentication logic here
    // Example: Send a request to your authentication API
    console.log('Form submitted with data:', formData);
    navigate("/NavbarA");
    onLogin();


  };
  return (
    <div>
    <h2>Admin Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Admin Username</label>
          <input type="text" className="form-control form-control-sm" id="username" name="username" value={formData.username} onChange={handleInputChange} required/>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Admin Password</label>
          <input type="password" className="form-control form-control-sm" id="password" name="password" value={formData.password} onChange={handleInputChange} required/>
        </div>
        <button type="submit" onClick = {handleSubmit}className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}
