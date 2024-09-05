import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import "../styling/CarDetails.css";

const CarDetails = () => {
  const { model } = useParams();
  const modelEngineCapacities = useMemo(
    () => ({
      Camry: ["2000 CC", "2500 CC"],
      Corolla: ["1300 CC", "1600 CC", "1800 CC"],
      Civic: ["1500 CC Turbo", "1800 CC"],
      City: ["1300 CC", "1500 CC"],
      Swift: ["799 CC", "1300 CC"],
      Ciaz: ["1300 CC", "1500 CC"],
    }),
    []
  );

  const [formData, setFormData] = useState({
    model: model,
    engineCapacity: "",
    rims: "",
    color: "",
    estimate: 15000,
  });

  const [engineOptions, setEngineOptions] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});
  const [userFeedback, setUserFeedback] = useState("");

  useEffect(() => {
    if (model in modelEngineCapacities) {
      setEngineOptions(modelEngineCapacities[model]);
    } else {
      setEngineOptions([]);
    }

    const storedFeedbacks = JSON.parse(localStorage.getItem("feedbacks")) || {};
    setFeedbacks(storedFeedbacks);
  }, [model, modelEngineCapacities]);

  const calculateEstimate = (data) => {
    let estimate = 15000;

    if (data.rims === "Alloy") {
      estimate += 2000;
    }

    if (data.engineCapacity) {
      const engineIndex = engineOptions.indexOf(data.engineCapacity);
      if (engineIndex !== -1) {
        estimate += (engineIndex + 1) * 1500;
      }
    }

    return estimate;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      const newData = { ...prevData, [name]: value };
      return {
        ...newData,
        estimate: calculateEstimate(newData),
      };
    });
  };

  const handleFeedbackChange = (e) => {
    setUserFeedback(e.target.value);
  };

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();

    setFeedbacks((prevFeedbacks) => {
      const updatedFeedbacks = {
        ...prevFeedbacks,
        [formData.model]: [
          ...(prevFeedbacks[formData.model] || []),
          userFeedback,
        ],
      };

      // Save feedbacks to local storage
      localStorage.setItem("feedbacks", JSON.stringify(updatedFeedbacks));

      return updatedFeedbacks;
    });

    setUserFeedback("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Form Submitted! Final Estimate: $${formData.estimate}`);
  };

  return (
    <div className="page-content">
      <h2>Explore Variants</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Model: </label>
          <input
            type="text"
            disabled
            name="model"
            value={formData.model}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Engine Capacity: </label>
          <select
            name="engineCapacity"
            value={formData.engineCapacity}
            onChange={handleChange}
          >
            <option value="">Select Capacity</option>
            {engineOptions.map((capacity, index) => (
              <option key={index} value={capacity}>
                {capacity}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Rims: </label>
          <select name="rims" value={formData.rims} onChange={handleChange}>
            <option value="Normal">Normal</option>
            <option value="Alloy">Alloy</option>
          </select>
        </div>

        <div>
          <label>Color: </label>
          <select name="color" value={formData.color} onChange={handleChange}>
            <option value="">Select Color</option>
            <option value="White">White</option>
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="Red">Red</option>
          </select>
        </div>

        <div>
          <label>Estimate: </label>
          <input
            type="text"
            disabled
            name="estimate"
            value={`$${formData.estimate}`}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Submit</button>
      </form>

      <div className="feedback-section">
        <h3>Feedback for {formData.model}</h3>
        <ul>
          {(feedbacks[formData.model] || []).map((feedback, index) => (
            <li key={index}>{feedback}</li>
          ))}
        </ul>
        <form onSubmit={handleFeedbackSubmit}>
          <div>
            <label>Your Feedback: </label>
            <textarea
              value={userFeedback}
              onChange={handleFeedbackChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit Feedback</button>
        </form>
      </div>
    </div>
  );
};

export default CarDetails;
