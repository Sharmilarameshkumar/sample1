const GROQ_API_KEY = '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'; // Replace this with your actual key


export async function extractMedicalEntities(transcriptText) {
  const endpoint = 'https://api.groq.com/openai/v1/chat/completions';

  const payload = {
    model: 'llama3-8b-8192',
    messages: [
      {
        role: 'system',
        content: `You are a helpful and intelligent medical assistant. You will be given a medical transcript or conversation from a patient or doctor.

Your job is to extract the following entities. If there are multiple values (like multiple symptoms), separate them with commas.

Entities to extract:
- Intent of speech
- Symptom
- Strength (e.g., 500 mg)
- Form (e.g., tablet, syrup, inhaler, capsule etc.)
- Frequency (morning, night, afternoon)
- Duration (e.g., 5 days, 1 week, 7 days etc.)
- Time (after food, before food)
"Frequency" refers to how often the drug is taken (e.g., once daily, morning, night). DO NOT confuse Frequency with Time or Duration.

"Time" refers to when the drug is taken relative to meals (e.g., after food, before food). Do NOT copy 'Time' value into 'Frequency' if 'Frequency' is missing.

If an entity is not found, leave it as an empty string.


Respond ONLY with a valid JSON object using the structure below:

{
  "Intent of speech": "",
  "Symptom": "",
  "Drug": "",
  "Strength": "",
  "Form": "",
  "Frequency": "",
  "Duration": "",
  "Time": ""
}

Leave "Drug" as an empty string. It will be filled separately using another model.
DO NOT include any explanation or extra text. Return ONLY the JSON.
`
      },
      {
        role: 'user',
        content: transcriptText,
      },
    ],
    temperature: 0.2,
  };

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`GROQ API error: ${response.statusText}`);
    }

    const data = await response.json();
    const rawContent = data.choices[0].message.content;

    let parsedEntities = {};
    try {
      parsedEntities = JSON.parse(rawContent);
    } catch (e) {
      console.error('❌ Failed to parse JSON from response:', rawContent);
      return {};
    }

    // Call the Flask API to extract the drug
    const drug = await extractDrugFromFlask(transcriptText);
    parsedEntities["Drug"] = drug;

    return parsedEntities;
  } catch (error) {
    console.error('❌ Error fetching from GROQ API:', error);
    return {};
  }
}

export async function extractDrugFromFlask(text) {
  try {
    const response = await fetch('http://localhost:5000/extract_drug', {
      method: 'POST', // 🔴 This must be POST, not GET
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }), // 🟢 Send the actual text here
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.drugs;
  } catch (error) {
    console.error('❌ Error fetching drug from Flask API:', error);
    return [];
  }
}


