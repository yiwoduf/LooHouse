import React, { useState } from "react";
import "../app/globals.css";

interface Option {
  value: number;
  label: string;
}

interface Question {
  key: string;
  question: string;
  options: Option[];
}

const Form: React.FC = () => {
  const questions: Question[] = [
    {
      key: "bedrooms",
      question: "Number of Bedrooms",
      options: [
        { value: 1, label: "1 Bedroom" },
        { value: 2, label: "2 Bedroom" },
        { value: 3, label: "3 Bedroom" },
      ],
    },
    {
      key: "bathrooms",
      question: "Number of Bathrooms",
      options: [
        { value: 1, label: "1 Bath" },
        { value: 2, label: "2 Bath" },
        { value: 3, label: "3 Bath" },
      ],
    },
    {
      key: "stories",
      question: "Number of Stories",
      options: [
        { value: 1, label: "1 Str" },
        { value: 2, label: "2 Str" },
        { value: 3, label: "3 Str" },
      ],
    },
    {
      key: "mainroad",
      question: "Mainroad",
      options: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ],
    },
    {
      key: "guestroom",
      question: "Guestroom",
      options: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ],
    },
    {
      key: "hotwater",
      question: "Hot Water",
      options: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ],
    },
    {
      key: "basement",
      question: "Basement",
      options: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ],
    },
    {
      key: "airconditioning",
      question: "air conditioning",
      options: [
        { value: 1, label: "Yes" },
        { value: 0, label: "No" },
      ],
    },
    {
      key: "parking",
      question: "parking",
      options: [
        { value: 1, label: "1 p" },
        { value: 2, label: "2 p" },
        { value: 3, label: "3 p" },
      ],
    },
  ];

  const [formData, setFormData] = useState<Record<string, number>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    key: string
  ) => {
    const value = parseInt(e.target.value, 10);
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // prevent default form sub

    const queryParams = new URLSearchParams();
    Object.keys(formData).forEach((key) => {
      queryParams.append(key, formData[key].toString());
    });
    const queryString = queryParams.toString();

    const response = await fetch(
      `http://localhost:5328/predict?${queryString}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="bg-zinc-100 dark:bg-zinc-900 pt-5 pb-5 justify-center">
      <form
        className="max-w-lg mx-auto pt-5 pb-5 space-y-4 justify-center"
        onSubmit={handleSubmit}
      >
        {questions.map((question, index) => (
          <div key={question.key}>
            {" "}
            <label
              htmlFor={`dropdown-${question.key}`}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {question.question}
            </label>
            <select
              id={`dropdown-${question.key}`}
              className="block w-full px-4 py-2 text-base text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => handleChange(e, question.key)}
              value={formData[question.key]}
            >
              {question.options.map((option) => (
                <option key={option.value.toString()} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        ))}
        <div className="flex justify-center">
          <button
            type="submit"
            className="submit-button cursor-pointer inline-block text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center dark:focus:ring-yellow-900"
          >
            Get Estimate
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
