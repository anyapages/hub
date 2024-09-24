import pandas as pd
from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_engine.solar_prediction import calculate_price

app = Flask(__name__)
CORS(app)  # Enable CORS

# Path to the dataset file
dataset_file = './dataset/data.csv'  # Point to the specific dataset file

# Load the dataset once when the application starts
try:
    df = pd.read_csv(dataset_file)
    print("Dataset loaded successfully.")
except FileNotFoundError:
    print(f"File {dataset_file} not found.")
    exit()
except Exception as e:
    print(f"Error reading dataset: {e}")
    exit()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get parameters from request
        data = request.get_json()
        
        # Example: using the first row of the dataset for prediction
        if not data.get('index'):
            return jsonify({'error': 'Index not provided.'}), 400
        
        index = int(data['index'])

        if index < 0 or index >= len(df):
            return jsonify({'error': 'Index out of bounds.'}), 400

        # Extract parameters from the specified row
        row = df.iloc[index]
        
        solar_radiation = row['Solar Radiation (kW/m²)']
        carbon_footprint = row['Carbon Footprint (kgCO₂)']
        electricity_demand = row['Electricity Demand (kWh)']
        cloud_coverage = row['Cloud Coverage (%)']
        solar_energy_supply = row['Energy Supply from Solar (kWh)']

        # Calculate the price
        prediction = calculate_price(solar_radiation, carbon_footprint, electricity_demand, cloud_coverage, solar_energy_supply)

        return jsonify({'prediction': round(prediction, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)