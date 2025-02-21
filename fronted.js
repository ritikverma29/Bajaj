import React, { useState } from "react";
import axios from "axios";

export default function App() {
  const [inputData, setInputData] = useState("");
  const [response, setResponse] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const API_URL = "https://your-deployed-api.com/bfhl"; // Replace with actual backend URL

  const handleSubmit = async () => {
    try {
      const parsedData = JSON.parse(inputData);
      if (!parsedData.data) throw new Error("Invalid JSON format");

      const res = await axios.post(API_URL, parsedData);
      setResponse(res.data);
    } catch (error) {
      alert("Invalid JSON or server error");
    }
  };

  return (
    <div className="App">
      <h1>Your Roll Number</h1>
      <textarea
        rows="5"
        placeholder='Enter JSON (e.g., {"data": ["A","1","B","3"]})'
        value={inputData}
        onChange={(e) => setInputData(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>

      {response && (
        <>
          <select multiple onChange={(e) => setSelectedFilters([...e.target.selectedOptions].map(o => o.value))}>
            <option value="alphabets">Alphabets</option>
            <option value="numbers">Numbers</option>
            <option value="highest_alphabet">Highest Alphabet</option>
          </select>

          <pre>
            {JSON.stringify(
              Object.fromEntries(Object.entries(response).filter(([key]) => selectedFilters.includes(key))),
              null,
              2
            )}
          </pre>
        </>
      )}
    </div>
  );
}
