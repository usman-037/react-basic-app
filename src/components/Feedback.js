import React, { useState, useEffect } from "react";
import "../styling/Feedback.css"; 

const Feedback = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [feedbacks, setFeedbacks] = useState([]);
  const [carFeedbacks, setCarFeedbacks] = useState({});

  useEffect(() => {
    const storedFeedbacks =
      JSON.parse(localStorage.getItem("generalFeedbacks")) || [];
    setFeedbacks(storedFeedbacks);

    const storedCarFeedbacks =
      JSON.parse(localStorage.getItem("feedbacks")) || {};
    setCarFeedbacks(storedCarFeedbacks);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newFeedback = { ...formData, date: new Date().toISOString() };

    if (formData.carModel) {
      const updatedCarFeedbacks = { ...carFeedbacks };
      if (!updatedCarFeedbacks[formData.carModel]) {
        updatedCarFeedbacks[formData.carModel] = [];
      }
      updatedCarFeedbacks[formData.carModel].push(newFeedback);
      setCarFeedbacks(updatedCarFeedbacks);
      localStorage.setItem("carFeedbacks", JSON.stringify(updatedCarFeedbacks));
    } else {
      const updatedFeedbacks = [...feedbacks, newFeedback];
      setFeedbacks(updatedFeedbacks);
      localStorage.setItem(
        "generalFeedbacks",
        JSON.stringify(updatedFeedbacks)
      );
    }

    setFormData({
      name: "",
      email: "",
      message: "",
      carModel: "", 
    });
  };

  return (
    <div className="feedback-container">
      <h2>Feedback Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="feedback-list">
        <h3>General Feedbacks</h3>
        <ul>
          {feedbacks.map((feedback, index) => (
            <li key={index}>
              <strong>{feedback.name}</strong> ({feedback.email}) -{" "}
              {new Date(feedback.date).toLocaleDateString()}
              <p>{feedback.message}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="car-feedback-list">
        <h3>Car-Specific Feedbacks</h3>
        {Object.entries(carFeedbacks).map(([model, modelFeedbacks]) => (
          <div key={model}>
            <h4>{model}</h4>
            <ul>
              {modelFeedbacks.map((feedback, index) => (
                <li key={index}>
                  <p>{feedback}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
