// src/DrugExtractor.js

import React, { useState } from "react";

const DrugExtractor = () => {
  const [inputText, setInputText] = useState(""); // Store user input
  const [extractedDrugs, setExtractedDrugs] = useState([]); // Store extracted drugs
  const [loading, setLoading] = useState(false); // Loading state

  const handleExtract = async () => {
    setLoading(true); // Show loading spinner
    try {
      const response = await fetch("http://127.0.0.1:5000/extract_drug", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      console.log("Response data:", data);

      // Update state with extracted drugs
      if (data.drugs) {
        setExtractedDrugs(data.drugs);
      } else {
        setExtractedDrugs([]);
      }
    } catch (error) {
      console.error("Error during extraction:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };

  return (
    <div>
      <h1>Drug Extractor</h1>
      <textarea
        value={inputText}
        onChange={(e) => setInputText(e.target.value)} // Capture user input
        placeholder="Enter text for drug extraction"
      />
      <button onClick={handleExtract} disabled={loading}>
        {loading ? "Extracting..." : "Extract Drug"}
      </button>

      {extractedDrugs.length > 0 && (
        <ul>
          {extractedDrugs.map((drug, index) => (
            <li key={index}>{drug}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DrugExtractor;
