from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import os
import json

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

CHATBOT_MODEL_PATH = os.path.join('chatbot_model.pkl')
chatbot_model = joblib.load(CHATBOT_MODEL_PATH)

@app.route('/')
def index():
    # Render the main page using the templates folder
    return render_template('index.html')

@app.route('/ask', methods=['POST'])
def ask():
    user_question = request.form.get('question', '')
    if not user_question:
        return jsonify({"error": "No question provided."}), 400
    
    # Predict the answer
    predicted_answer = chatbot_model.predict([user_question])[0]
    return jsonify({"answer": predicted_answer})

# 1. Chatbot Endpoint
@app.route('/chatbot', methods=['POST'])
def chatbot_response():
    data = request.get_json()
    user_message = data.get('message', '')

    # Process user_message through chatbot model
    bot_response = chatbot_model_response(user_message)
    return jsonify({'response': bot_response})

def chatbot_model_response(user_message):
    # Assuming your model has a predict method
    response = chatbot_model.predict([user_message])
    return response[0]

# # 2. Tax Filing Bot Endpoint (currently placeholder)
# @app.route('/generate-ais', methods=['POST'])
# def generate_ais():
#     data = request.files.get('bank_statement')
#     if data is None:
#         return jsonify({'error': 'No bank statement uploaded'}), 400

#     # Placeholder response for tax model processing
#     # Uncomment and implement once the tax model is ready
#     # ais_report = tax_model_response(data)
#     return jsonify({'AIS_report': 'AIS report generation is currently disabled.'})

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Endpoint to accept a PDF and regime information
@app.route('/upload_pdf_and_regime', methods=['GET'])
def upload():
    # Get the regime information from query parameters
    regime = request.args.get('regime')
    
    # Get the PDF file from the query parameters
    pdf_file = request.args.get('pdf')  # This would typically be a URL or base64 encoded content

    # Check if regime is provided
    if not regime:
        return jsonify({"error": "Regime information is required"}), 400

    # Check if pdf_file is provided
    if not pdf_file:
        return jsonify({"error": "PDF file is required"}), 400

    # Save the PDF file (you would need to handle the actual file input)
    try:
        pdf_path = os.path.join(UPLOAD_FOLDER, 'uploaded_file.pdf')
        with open(pdf_path, 'wb') as f:
            f.write(request.get(pdf_file).content)  # assuming pdf_file is a URL

        # For demonstration, we will return the received information
        response = {
            "regime": regime,
            "message": "PDF uploaded successfully",
            "pdf_path": pdf_path
        }
        return jsonify(response), 200
    
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
## Endpoint to send predictions
@app.route('/get_model_output', methods=['POST'])
def predict():
    try:
        # Load data from the JSON file
        with open('./json_file/processed_income_tax.json', 'r') as f:
            data = json.load(f)
        
        # Assuming your JSON structure has keys 'output1', 'output2', and 'output3'
        output1 = data['income']
        output2 = data['taxable_income']
        output3 = data['tax']
        
        # Send response as JSON
        response = {
            "income": output1,
            "taxable_income": output2,
            "tax": output3
        }
        return jsonify(response)
    
    except Exception as e:
        return jsonify({"error": str(e)})

# Run the Flask application
if __name__ == '__main__':
    app.run(debug=True)