import os
import json
from simple_salesforce import Salesforce
import pandas as pd
from datetime import datetime

# Get credentials from environment variables
USERNAME = 'pruthvibr0794-dx@gmail.com'
PASSWORD = 'pruvi@0794'
SECURITY_TOKEN = 'vLyrO1qRvmEY047NTzinBTRDY'

# Connect to Salesforce
sf = Salesforce(username=USERNAME, password=PASSWORD, security_token=SECURITY_TOKEN)

# Define lead owners
lead_owners = ['Pruthvi B R', 'lakshmi ranganath']

# Query to get leads based on owner name
query = f"""
SELECT Name, Company, Status, CreatedDate, Owner.Name
FROM Lead
WHERE Owner.Name IN {tuple(lead_owners)} 
ORDER BY Owner.Name, CreatedDate
"""
leads = sf.query_all(query)

# Convert the data to a DataFrame
records = leads['records']

# Extract data and handle nested dictionaries
data = []
for record in records:
    leads_name = record.get('Name', 'N/A')
    company = record.get('Company', 'N/A')
    status = record.get('Status', 'N/A')
    created_date = record.get('CreatedDate', 'N/A')
    owner_name = record.get('Owner', {}).get('Name', 'N/A')
    
    # Format the CreatedDate to yyyy-mm-dd
    if created_date != 'N/A':
        try:
            # Parse the date with milliseconds and timezone offset
            created_date_parsed = datetime.strptime(created_date, '%Y-%m-%dT%H:%M:%S.%f%z')
            
            # Format it to yyyy-mm-dd
            formatted_created_date = created_date_parsed.strftime('%Y-%m-%d')
        except ValueError as e:
            print(f"Date format error: {e}")
            formatted_created_date = 'N/A'
    else:
        formatted_created_date = 'N/A'

    data.append({
        'Lead Name': leads_name,
        'Company': company,
        'Lead Status': status,
        'Created Date': formatted_created_date,
        'Owner Name': owner_name
    })

df = pd.DataFrame(data, columns=['Lead Name', 'Company', 'Lead Status', 'Created Date', 'Owner Name'])

# Filter the DataFrame to get only 2 records per owner
filtered_data = []
for owner in lead_owners:
    owner_data = df[df['Owner Name'] == owner].head(2)  # Get up to 2 records for each owner
    filtered_data.append(owner_data)

# Combine the filtered data into a single DataFrame
filtered_df = pd.concat(filtered_data).reset_index(drop=True)

# Convert the filtered DataFrame to JSON
json_output = filtered_df.to_json(orient='records', date_format='iso')

# Print the JSON output
print(json_output)
