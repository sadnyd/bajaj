import React, { useState } from "react";
import axios from "axios";

function App() {
  const [jsonInput, setJsonInput] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState("");

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("SENDING FETCH REQUESTs", jsonInput)
    e.preventDefault();
    try {
      const parsedInput = JSON.parse(jsonInput);
      console.log(parsedInput);
      
      // Validate that parsedInput is the expected format
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError("Invalid JSON format. Expected format: { \"data\": [\"A\",\"B\",\"z\"] }");
        return;
      }

      setError("");

      // Make the API request
      const response = await axios.post("http://localhost:5000/bfhl", parsedInput);
      setResponseData(response.data);
    } catch (err) {
      setError("Invalid JSON format or network error");
    }
  };

  const handleOptionChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedOptions([...selectedOptions, value]);
    } else {
      setSelectedOptions(selectedOptions.filter((option) => option !== value));
    }
  };

  const renderResponse = () => {
    if (!responseData) return null;

    const filteredResponse = {};
    if (selectedOptions.includes("Alphabets")) {
      filteredResponse.alphabets = responseData.alphabets;
    }
    if (selectedOptions.includes("Numbers")) {
      filteredResponse.numbers = responseData.numbers;
    }
    if (selectedOptions.includes("Highest Lowercase Alphabet")) {
      filteredResponse.highest_lowercase_alphabet = responseData.highest_lowercase_alphabet;
    }

    return (
      <div>
        <h3>Response:</h3>
        <pre>{JSON.stringify(filteredResponse, null, 2)}</pre>
      </div>
    );
  };

  return (
    <div>
      <h1>JSON Input Application</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <textarea
            rows="5"
            cols="50"
            value={jsonInput}
            onChange={handleJsonInputChange}
            placeholder='Enter JSON, e.g. { "data": ["A","B","z"] }'
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <button type="submit">Submit</button>
      </form>

      {responseData && (
        <div>
          <h2>Select Options to Display</h2>
          <label>
            <input
              type="checkbox"
              value="Alphabets"
              onChange={handleOptionChange}
            />
            Alphabets
          </label>
          <label>
            <input
              type="checkbox"
              value="Numbers"
              onChange={handleOptionChange}
            />
            Numbers
          </label>
          <label>
            <input
              type="checkbox"
              value="Highest Lowercase Alphabet"
              onChange={handleOptionChange}
            />
            Highest Lowercase Alphabet
          </label>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
