import React, { useState } from "react";

const Suggestions = () => {
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Suggestion submitted!\nEmail: ${email}\nSuggestion: ${suggestion}`);
    setEmail("");
    setSuggestion("");
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded p-6 mt-6">
      <h2 className="text-xl font-bold mb-4">Submit Your Suggestions</h2>
      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Email:</label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <label className="block mb-2 font-medium">Your Suggestion:</label>
        <textarea
          placeholder="Write your suggestion here..."
          value={suggestion}
          onChange={(e) => setSuggestion(e.target.value)}
          required
          className="w-full p-2 border border-gray-300 rounded mb-4"
        />

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Suggestions;
