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
        # Get the last 24 rows of the dataset
        last_24_rows = df.tail(24)
        
        # Extract parameters from the last 24 rows as lists
        solar_radiation = last_24_rows['Solar Radiation (kW/m²)'].tolist()
        carbon_footprint = last_24_rows['Carbon Footprint (kgCO₂)'].tolist()
        electricity_demand = last_24_rows['Electricity Demand (kWh)'].tolist()
        cloud_coverage = last_24_rows['Cloud Coverage (%)'].tolist()
        solar_energy_supply = last_24_rows['Energy Supply from Solar (kWh)'].tolist()

        # Calculate a single price based on the last 24 hours
        prediction = calculate_price(solar_radiation, carbon_footprint, electricity_demand, cloud_coverage, solar_energy_supply)

        # Return the single predicted price along with all the last 24 hours of data
        return jsonify({
            'prediction': prediction,
            'solar_radiation': solar_radiation,
            'carbon_footprint': carbon_footprint,
            'electricity_demand': electricity_demand,
            'cloud_coverage': cloud_coverage,
            'solar_energy_supply': solar_energy_supply
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)