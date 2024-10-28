import os
import pdfplumber
import json5

# PDF file path and JSON output path
pdf_path = r"D:\UTSAV\Hackathon\brAInwave\TaxMate\server\data\sample.pdf"
json_output_path = "bank_statement.json"

# Function to parse PDF and extract data
def extract_data_from_pdf(pdf_path):
    data = []
    
    with pdfplumber.open(pdf_path) as pdf:
        # Only process page 2 and page 3
        for page_num in [1, 2]:  # pdfplumber page indices start from 0
            page = pdf.pages[page_num]
            text = page.extract_text()
            if text is None:
                print(f"Warning: No text found on page {page_num + 1}")
                continue
            
            lines = text.split('\n')
            headers = ["DATE", "TRANSACTION DETAILS", "CHEQUE/REFERENCE#", "DEBIT", "CREDIT", "BALANCE"]
            lines = [line for line in lines if not any(header in line for header in headers)]

            for line in lines:
                columns = line.split()

                # Skip lines that don’t have the expected number of columns
                if len(columns) < 5:
                    print(f"Skipping line due to unexpected format: {line}")
                    continue

                # Try parsing each line with error handling
                try:
                    # Date: First two columns (assumed to be "DD MMM, YYYY" format)
                    date = columns[0] + ' ' + columns[1].strip(',')
                    # Remaining columns
                    narration_start_idx = 2
                    narration_end_idx = len(columns) - 4
                    narration = ' '.join(columns[narration_start_idx:narration_end_idx])
                    ref_no = columns[narration_end_idx]

                    # Debit, Credit, and Balance: Handle signs and format
                    debit = 0
                    credit = 0
                    balance = 0

                    # Check for debit and credit values
                    if columns[-3].startswith('-'):
                        debit = float(columns[-3].replace(',', '').replace('-', ''))
                    elif columns[-3].startswith('+'):
                        credit = float(columns[-3].replace(',', '').replace('+', ''))
                    balance = float(columns[-1].replace(',', ''))

                    # Create transaction entry
                    transaction = {
                        "Date": date,
                        "Narration": narration,
                        "Reference No": ref_no,
                        "Debit": debit,
                        "Credit": credit,
                        "Balance": balance
                    }
                    data.append(transaction)

                except Exception as e:
                    print(f"Error parsing line: {line} - {e}")

    return data

# Ensure the directory for JSON output exists
# os.makedirs(os.path.dirname(json_output_path), exist_ok=True)

# Extract data and save as JSON
data = extract_data_from_pdf(pdf_path)

if data:
    with open(json_output_path, 'w') as json_file:
        json5.dump(data, json_file, indent=4)
    print(f"Data successfully extracted to {json_output_path}")
else:
    print("No data was extracted; check the PDF structure or parsing logic.")


# # Load JSON data from file
# with open(json_output_path, 'r') as file:
#     json_string = file.read()

# # Replace with your actual API key and external user ID
# API_KEY = '6J5VFwbLUBqBoFFWUGguOgmZLeY3SHcd'
# EXTERNAL_USER_ID = 'BrainWave'

# # Create Chat Session
# create_session_url = 'https://api.on-demand.io/chat/v1/sessions'
# create_session_headers = {
#     'apikey': API_KEY
# }
# create_session_body = {
#     "pluginIds": [],
#     "externalUserId": EXTERNAL_USER_ID
# }

# response = requests.post(create_session_url, headers=create_session_headers, json=create_session_body)
# response_data = response.json()

# # Extract session ID from the response
# session_id = response_data['data']['id']

# query = "Here's my bank statement in json form: " + json_string + ". Could you analyze each transaction's narration and classify it into the relevant tax deduction category. Also add this information to a new column and export all the information in the form of json format"

# # Submit Query
# submit_query_url = f'https://api.on-demand.io/chat/v1/sessions/{session_id}/query'
# submit_query_headers = {
#     'apikey': API_KEY
# }
# submit_query_body = {
#     "endpointId": "predefined-openai-gpt4o",
#     "query": query,
#     "pluginIds": ["plugin-1712327325", "plugin-1713962163", "plugin-1729882684"],
#     "responseMode": "sync"
# }

# query_response = requests.post(submit_query_url, headers=submit_query_headers, json=submit_query_body)
# query_response_data = query_response.json()

# # Print the response from the query
# print(query_response_data['data']['answer'])