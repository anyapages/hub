import os
import pandas as pd

# Formula coefficients (you can adjust these based on your model)
alpha = 0.5   # Coefficient for solar radiation
beta = 0.3    # Coefficient for carbon footprint
gamma = 0.2   # Coefficient for electricity demand
delta = 0.1   # Coefficient for cloud coverage
epsilon = 0.4 # Coefficient for solar energy supply

# Function to calculate the dynamic price based on 24-hour data (lists)
def calculate_price(solar_radiation, carbon_footprint, electricity_demand, cloud_coverage, solar_energy_supply):
    # Calculate averages of the lists for each parameter
    avg_solar_radiation = sum(solar_radiation) / len(solar_radiation) if solar_radiation else 0.01
    avg_carbon_footprint = sum(carbon_footprint) / len(carbon_footprint) if carbon_footprint else 0
    avg_electricity_demand = sum(electricity_demand) / len(electricity_demand) if electricity_demand else 0
    avg_cloud_coverage = sum(cloud_coverage) / len(cloud_coverage) if cloud_coverage else 0
    avg_solar_energy_supply = sum(solar_energy_supply) / len(solar_energy_supply) if solar_energy_supply else 0
    
    # Avoid division by zero for solar radiation (assume minimum radiation is 0.01 kW/m²)
    if avg_solar_radiation <= 0:
        avg_solar_radiation = 0.01

    # Formula for dynamic pricing based on averages
    price = (alpha * (1 / avg_solar_radiation)) + (beta * avg_carbon_footprint) + (gamma * avg_electricity_demand) \
            + (delta * avg_cloud_coverage) - (epsilon * avg_solar_energy_supply)
    
    return round(price, 4)  # Return price rounded to 4 decimal places

