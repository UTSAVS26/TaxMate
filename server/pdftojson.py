import pdfplumber
import json5

# Define PDF file path and JSON output path
pdf_path = r"D:\UTSAV\Hackathon\brAInwave\TaxMate\server\data\Salaried Individuals for AY 2024-25  Income Tax Department.pdf"
json_output_path = 'bank_statement.json'

# Function to parse PDF and extract data
def extract_data_from_pdf(pdf_path):
    data = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            text = page.extract_text().split('\n')
            
            for line in text:
                columns = line.split()
                
                # Basic parsing based on known structure: Date, SNo, Narration, Debit, Credit, Balance
                if len(columns) > 5:
                    date = columns[0]
                    sno = columns[1]
                    narration = ' '.join(columns[2:-3])
                    
                    # Try converting Debit, Credit, and Balance to floats, skip non-numeric headers
                    try:
                        debit = float(columns[-3]) if columns[-3].replace('.', '', 1).isdigit() else 0
                    except ValueError:
                        debit = 0

                    try:
                        credit = float(columns[-2]) if columns[-2].replace('.', '', 1).isdigit() else 0
                    except ValueError:
                        credit = 0

                    try:
                        balance = float(columns[-1]) if columns[-1].replace('.', '', 1).isdigit() else 0
                    except ValueError:
                        balance = 0
                    
                    # Create transaction entry
                    transaction = {
                        "Date": date,
                        "SNo": sno,
                        "Narration": narration,
                        "Debit": debit,
                        "Credit": credit,
                        "Balance": balance
                    }
                    data.append(transaction)
    

# Extract data and save as JSON
data = extract_data_from_pdf(pdf_path)

with open(json_output_path, 'w') as json_file:
    json5.dump(data, json_file, indent=4)

print(f"Data successfully extracted to {json_output_path}")
import json5

# Path to the JSON file
file_path = 'bank_statement.json'

# Read the JSON file as a string
with open(file_path, 'r') as file:
    json_string = file.read()

# Parse the JSON string using json5
data = json5.loads(json_string)

# Print the JSON string and parsed data
print(type(json_string))
#print("Parsed Data:", data)

# Print or process the data
#print(data)


import requests

# Replace with your actual API key and external user ID
API_KEY = '6J5VFwbLUBqBoFFWUGguOgmZLeY3SHcd'
EXTERNAL_USER_ID = 'BrainWave'


# Create Chat Session
create_session_url = 'https://api.on-demand.io/chat/v1/sessions'
create_session_headers = {
    'apikey': API_KEY
}
create_session_body = {
    "pluginIds": [],
    "externalUserId": EXTERNAL_USER_ID
}

response = requests.post(create_session_url, headers=create_session_headers, json=create_session_body)
response_data = response.json()

# Extract session ID from the response
session_id = response_data['data']['id']


query = "Here’s my bank statement in json form: "+json_string+". Could you analyze each transaction’s narration and classify it into the relevant tax deduction category. Also add this information to a new column and export all the information in the form of json format"
# Submit Query
submit_query_url = f'https://api.on-demand.io/chat/v1/sessions/{session_id}/query'
submit_query_headers = {
    'apikey': API_KEY
}
submit_query_body = {
    "endpointId": "predefined-openai-gpt4o",
    "query": query,
    "pluginIds": ["plugin-1712327325", "plugin-1713962163", "plugin-1729882684"],
    "responseMode": "sync"
}

query_response = requests.post(submit_query_url, headers=submit_query_headers, json=submit_query_body)
query_response_data = query_response.json()

# Print the response from the query
print(query_response_data['data']['answer'])