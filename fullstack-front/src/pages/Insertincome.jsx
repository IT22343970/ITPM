import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const InsertIncome = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userId: "",
    source: "",
    category: "Salary",
    amount: "",
    note: "",
    date: ""
  });
  const [errors, setErrors] = useState({}); //hold error for validation feedback

  const validate = () => {
    let newErrors = {};

    // Validation rules
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
//handle form submition
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

        // Redirect after successful submission
        navigate("/income");
      } catch (error) {
        console.error("Error adding income:", error);
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="flex justify-center items-center w-full max-w-4xl bg-white p-6 border rounded-lg shadow-lg">
        {/* Container holding both form and image */}
        <div className="flex w-full">
          {/* Form Section */}
          <form className="space-y-4 w-full lg:w-1/2" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold text-center text-gray-800">Insert Income</h2>

            <div className="flex flex-col gap-1">
              <label htmlFor="userId" className="font-medium text-gray-700">User ID</label>
              <input
                type="text"
                id="userId"
                className="border p-2 rounded-md"
                onChange={handleChange}
                value={formData.userId}
              />
              {errors.userId && <span className="text-red-500 text-sm">{errors.userId}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="source" className="font-medium text-gray-700">Source</label>
              <input
                type="text"
                id="source"
                className="border p-2 rounded-md"
                onChange={handleChange}
                value={formData.source} //bind value to formdata state
              />
              {errors.source && <span className="text-red-500 text-sm">{errors.source}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-medium text-gray-700">Category</label>
              <select
                id="category"
                className="border p-2 rounded-md"
                onChange={handleChange}
                value={formData.category}
              >
                <option>Employment Income</option>
                <option>Passive Income</option>
                <option>Online Income</option>
                <option>Business Income</option>
                <option>Other</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="amount" className="font-medium text-gray-700">Amount</label>
              <input
                type="number"
                id="amount"
                className="border p-2 rounded-md"
                onChange={handleChange}
                value={formData.amount}
              />
              {errors.amount && <span className="text-red-500 text-sm">{errors.amount}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="note" className="font-medium text-gray-700">Note</label>
              <textarea
                id="note"
                rows="3"
                className="border p-2 rounded-md"
                onChange={handleChange}
                value={formData.note}
              ></textarea>
              {errors.note && <span className="text-red-500 text-sm">{errors.note}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="date" className="font-medium text-gray-700">Date</label>
              <input
                type="date"
                id="date"
                className="border p-2 rounded-md"
                onChange={handleChange}
                value={formData.date}
              />
              {errors.date && <span className="text-red-500 text-sm">{errors.date}</span>}
            </div>

            <div className="flex justify-between">
              <button
                    type="button"
                        onClick={() => navigate(-1)}
                       className="bg-green-500 text-white px-4 py-2 w-32 text-center rounded-md hover:bg-gray-600 transition"
              >
                      Back
              </button>
            <button
               type="submit"
               className="bg-green-500 text-white px-4 py-2 w-32 text-center rounded-md hover:bg-blue-700 transition"
          >
               Submit
            </button>
            

            </div>
          </form>

          {/* Image Section */}
          <div className="hidden lg:flex w-1/2 justify-center items-center">
  <img
    src="assets/images/insert.png"
    alt="Income Illustration"
    className="w-full max-w-lg h-auto rounded-lg shadow-md self-center"
  />
</div>

        </div>
      </div>
    </div>
  );
};

export default InsertIncome;
