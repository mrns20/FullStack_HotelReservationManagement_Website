/*import React, { useState } from "react";
import "./SignUp.module.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    pass: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Αντικαταστήστε με το URL του API σας ή το backend server σας
    const url = "http://localhost:5000/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert("Welcome to Hotel Gourdo!");
    } else {
      alert("An error has occurred.");
    }
  };

  return (
    <div className="container">
      <div className="logo-text">Hotel Gourdo</div>
      <div className="logo-text2">- Sign Up Page -</div>

      <form onSubmit={handleSubmit}>
        <div className="box">
          <label className="fl fontLabel">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="textBox"
            placeholder="First Name"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="textBox"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Phone Number:</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="textBox"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="textBox"
            placeholder="Email"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Password:</label>
          <input
            type="password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            className="textBox"
            placeholder="Password"
            required
            minLength={8}
            maxLength={12}
          />
        </div>
        <div className="box terms">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          &nbsp; I accept the terms and conditions
        </div>
        <div className="box" style={{ background: "#2d3e3f" }}>
          <button type="submit" className="submit">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
*/
import React, { useState } from "react";
import "./SignUp.module.css";

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNo: "",
    email: "",
    pass: "",
    terms: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = "http://localhost:5000/signup";

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    if (result.success) {
      alert("Welcome to Hotel Gourdo!");
    } else {
      alert("An error has occurred.");
    }
  };

  return (
    <div className="container">
      <div className="logo-text">Hotel Gourdo</div>
      <div className="logo-text2">- Sign Up Page -</div>

      <form onSubmit={handleSubmit}>
        <div className="box">
          <label className="fl fontLabel">First Name:</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="textBox"
            placeholder="First Name"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Last Name:</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="textBox"
            placeholder="Last Name"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Phone Number:</label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={handleChange}
            className="textBox"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="textBox"
            placeholder="Email"
            required
          />
        </div>
        <div className="box">
          <label className="fl fontLabel">Password:</label>
          <input
            type="password"
            name="pass"
            value={formData.pass}
            onChange={handleChange}
            className="textBox"
            placeholder="Password"
            required
            minLength={8}
            maxLength={12}
          />
        </div>
        <div className="box terms">
          <input
            type="checkbox"
            name="terms"
            checked={formData.terms}
            onChange={handleChange}
            required
          />
          &nbsp; I accept the terms and conditions
        </div>
        <div className="box button-box">
          <button type="submit" className="submit">
            SIGN UP
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
