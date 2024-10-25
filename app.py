from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import pickle
import joblib


app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# def load_tax_model():
#     with open("path/to/tax_model.pkl", "rb") as file:
#         tax_model = pickle.load(file)
#     return tax_model

chatbot_model = joblib.load('./server/chatbot_model.pkl')
# tax_model = load_tax_model()

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
    # Assuming your model has a predict or generate method
    response = chatbot_model.predict([user_message])
    return response[0]


# 2. Tax Filing Bot Endpoint
@app.route('/generate-ais', methods=['POST'])
def generate_ais():
    data = request.files.get('bank_statement')
    if data is None:
        return jsonify({'error': 'No bank statement uploaded'}), 400

    # # Pass data to tax model for processing
    # ais_report = tax_model_response(data)
    # return jsonify({'AIS_report': ais_report})

# def tax_model_response(data):
#     # Process the bank statement data as required by your model
#     bank_statement_data = data.read().decode('utf-8')
#     processed_data = preprocess_bank_statement(bank_statement_data)  # Implement preprocessing
#     ais_report = tax_model.predict([processed_data])  # Example prediction
#     return ais_report[0]

# Run the Flask application
if __name__ == '_main_':
    app.run(debug=True)