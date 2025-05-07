from flask import Flask, request, jsonify
from flask_cors import CORS
from transformers import pipeline



app = Flask(__name__)
CORS(app)

nlp = pipeline(
    "ner",
    model="d4data/biomedical-ner-all",
    tokenizer="d4data/biomedical-ner-all",
    grouped_entities=True
)

@app.route('/extract_drug', methods=['POST'])
def extract_drug():
    data = request.get_json()
    text = data.get('text', '')
    print("Received text:", text)

    result = nlp(text)
    print("NER result:", result)

    valid_labels = ['Medication', 'Chemical', 'Drug']
    extracted_drugs = []

    current_drug = ""
    for ent in result:
        if ent['entity_group'] in valid_labels:
            word = ent['word']
            if word.startswith("##"):
                current_drug += word[2:]
            else:
                if current_drug:
                    extracted_drugs.append(current_drug)
                current_drug = word

    # Add final drug
    if current_drug:
        extracted_drugs.append(current_drug)

    print("Extracted Drugs:", extracted_drugs)
    return jsonify({'drugs': extracted_drugs})




if __name__ == "__main__":
    app.run(debug=True)
