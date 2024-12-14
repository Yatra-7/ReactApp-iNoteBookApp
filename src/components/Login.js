import React,{useState} from "react";
import { useNavigate } from 'react-router-dom';
const Login = () => {
const [credentials,setCredentials] = useState({email:"",password:""})
const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1NmRmYTUwZjAxYTk3YWQ5NWQ5ZTQyIn0sImlhdCI6MTczMzgwNzgwMn0.VKbYK4dcS78aS92HPjD-DaxH0mr1OWSPtiJpyhBdUhs",
      },
      body: JSON.stringify({ email:credentials.email, password:credentials.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and redirect
      localStorage.setItem('token',json.authtoken)
      navigate('/');      
    }
    else{
      alert("Invalid credentials")
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" onChange={onChange}
            value={credentials.email}
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            name="password" onChange={onChange}
            value={credentials.password}
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
