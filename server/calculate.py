import json

# Tax data provided
tax_data = {
    "tax_slabs": {
        "old_tax_regime": {
            "individuals_below_60": [
                {"income_slab": "Up to ₹ 2,50,000", "tax_rate": 0.0},
                {"income_slab": "₹ 2,50,001 - ₹ 5,00,000", "tax_rate": 0.05},
                {"income_slab": "₹ 5,00,001 - ₹ 10,00,000", "tax_rate": 0.2},
                {"income_slab": "Above ₹ 10,00,000", "tax_rate": 0.3}
            ],
            "individuals_60_to_80": [
                {"income_slab": "Up to ₹ 3,00,000", "tax_rate": 0.0},
                {"income_slab": "₹ 3,00,001 - ₹ 5,00,000", "tax_rate": 0.05},
                {"income_slab": "₹ 5,00,001 - ₹ 10,00,000", "tax_rate": 0.2},
                {"income_slab": "Above ₹ 10,00,000", "tax_rate": 0.3}
            ],
            "individuals_above_80": [
                {"income_slab": "Up to ₹ 5,00,000", "tax_rate": 0.0},
                {"income_slab": "₹ 5,00,001 - ₹ 10,00,000", "tax_rate": 0.2},
                {"income_slab": "Above ₹ 10,00,000", "tax_rate": 0.3}
            ]
        }
    },
    "tax_deductions": {
        "chapter_VIA": {
            "sections": {
                "80C": {"maximum_limit": 150000},
                "80CCC": {"maximum_limit": 150000},
                "80CCD1": {"maximum_limit": 150000},
                "80CCD1B": {"maximum_limit": 50000},
                "80D": {"limits": {"self_spouse_children": 25000, "parents": 25000}}
            }
        }
    }
}

# Load the transactions from a JSON file
input_file_path = 'json_file/bank_statement.json'  # Input file path
output_file_path = 'json_file/processed_income_tax.json'  # Output file path for results

# Read JSON data from file
with open(input_file_path, 'r') as file:
    data = json.load(file)

# Initialize variables
total_income = 0
deductions = 0

# Process each transaction
for transaction in data['transactions']:
    # Calculate total income from credits
    total_income += transaction['credit']
    
    # Calculate deductions based on tax deduction category
    if transaction['tax_deduction_category'] in tax_data['tax_deductions']['chapter_VIA']['sections']:
        limit = tax_data['tax_deductions']['chapter_VIA']['sections'][transaction['tax_deduction_category']]['maximum_limit']
        deductions += limit

# Calculate taxable income
taxable_income = max(0, total_income - deductions)

# Define tax slabs for old regime
def calculate_tax(income):
    tax = 0
    slabs = tax_data['tax_slabs']['old_tax_regime']['individuals_below_60']  # Assuming age < 60 for simplicity
    for slab in slabs:
        slab_limit = int(slab['income_slab'].split('₹ ')[-1].replace(',', '').split()[0]) if "Above" not in slab['income_slab'] else float('inf')
        slab_rate = slab['tax_rate']
        
        if income > slab_limit:
            if slab['income_slab'].startswith("Up to"):
                continue
            else:
                tax += (slab_limit - (int(slab['income_slab'].split('₹ ')[0].replace(',', '')) if ' - ' in slab['income_slab'] else 0)) * slab_rate
        else:
            if slab['income_slab'].startswith("Up to"):
                tax += income * slab_rate
            else:
                tax += (income - (int(slab['income_slab'].split('₹ ')[0].replace(',', '')) if ' - ' in slab['income_slab'] else 0)) * slab_rate
            break
    return tax

# Calculate tax after deductions
tax = calculate_tax(taxable_income)

# Prepare results to save
results = {
    "income": total_income,
    "taxable_income": taxable_income,
    "tax": tax
}

# Write results to a new JSON file
with open(output_file_path, 'w') as output_file:
    json.dump(results, output_file, indent=4)

# Output success message
print(f"Processed data saved to {output_file_path}.")