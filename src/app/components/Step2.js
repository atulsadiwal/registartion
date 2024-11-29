'use client';

import React, { useState } from 'react';

const Step2 = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    dob: '',
    city: '',
    collegeName: '',
    highestQualification: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-1.5 px-3 border outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="city" className="block text-sm font-medium text-gray-700">City</label>
        <input
          type="text"
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-1.5 px-3 border outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="collegeName" className="block text-sm font-medium text-gray-700">College Name</label>
        <input
          type="text"
          id="collegeName"
          name="collegeName"
          value={formData.collegeName}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-1.5 px-3 border outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>
      <div>
        <label htmlFor="highestQualification" className="block text-sm font-medium text-gray-700">Highest Qualification</label>
        <select
          id="highestQualification"
          name="highestQualification"
          value={formData.highestQualification}
          onChange={handleChange}
          required
          className="mt-1 block w-full py-1.5 px-3 border outline-none rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        >
          <option value="">Select Qualification</option>
          <option value="highSchool">High School</option>
          <option value="bachelor">Bachelor's Degree</option>
          <option value="master">Master's Degree</option>
          <option value="phd">Ph.D.</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Continue Payment
      </button>
    </form>
  );
};

export default Step2;

