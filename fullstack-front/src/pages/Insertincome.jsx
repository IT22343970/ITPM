import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InsertIncome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    source: "",
    category: "Employment Income",
    amount: "",
    note: "",
    date: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};

    if (!/^[1-9]\d{0,9}$/.test(formData.userId)) {
      newErrors.userId = "User ID must be a positive integer not exceeding 10 characters";
    }

    if (!formData.source) {
      newErrors.source = "Source is required";
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = "Amount must be a positive number";
    }

    if (formData.note.length > 30 || /\d/.test(formData.note)) {
      newErrors.note = "Note must be no longer than 30 characters and cannot contain numbers";
    }

    const selectedDate = new Date(formData.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);
    if (!formData.date || selectedDate > today) {
      newErrors.date = "Date must be today or a past date";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch("http://localhost:8080/api/income", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (!response.ok) {
          throw new Error("Failed to add income");
        }

        navigate("/income");
      } catch (error) {
        console.error("Error adding income:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-100 to-green-50 p-6">
      <div className="flex flex-col lg:flex-row items-stretch w-full max-w-5xl bg-white rounded-xl shadow-2xl overflow-hidden">
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="w-full lg:w-1/2 p-8 space-y-5 bg-white animate-fade-in"
        >
          <h2 className="text-2xl font-bold text-center text-green-700">Insert Income</h2>

          {[
            { id: "userId", label: "User ID", type: "text" },
            { id: "source", label: "Source", type: "text" },
            { id: "amount", label: "Amount", type: "number" },
            { id: "date", label: "Date", type: "date" }
          ].map(({ id, label, type }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-sm font-semibold text-gray-600">
                {label}
              </label>
              <input
                type={type}
                id={id}
                value={formData[id]}
                onChange={handleChange}
                className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                  errors[id] ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors[id] && <p className="text-red-500 text-sm mt-1">{errors[id]}</p>}
            </div>
          ))}

          {/* Category Dropdown */}
          <div>
            <label htmlFor="category" className="block text-sm font-semibold text-gray-600">
              Category
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition"
            >
              <option>Employment Income</option>
              <option>Passive Income</option>
              <option>Online Income</option>
              <option>Business Income</option>
              <option>Other</option>
            </select>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-sm font-semibold text-gray-600">
              Note
            </label>
            <textarea
              id="note"
              rows="3"
              value={formData.note}
              onChange={handleChange}
              className={`mt-1 w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-300 ${
                errors.note ? "border-red-500" : "border-gray-300"
              }`}
            ></textarea>
            {errors.note && <p className="text-red-500 text-sm mt-1">{errors.note}</p>}
          </div>

          {/* Buttons */}
          <div className="flex justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="w-full py-2 bg-gray-400 text-white rounded-md hover:bg-gray-600 transition"
            >
              Back
            </button>
            <button
              type="submit"
              className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
            >
              Submit
            </button>
          </div>
        </form>

        {/* Image Section */}
        <div className="hidden lg:flex w-1/2 items-center justify-center bg-green-100 p-6">
          <img
            src="/assets/images/insert.png"
            alt="Insert Income Illustration"
            className="rounded-lg shadow-lg w-full h-auto max-w-md"
          />
        </div>
      </div>
    </div>
  );
};

export default InsertIncome;
