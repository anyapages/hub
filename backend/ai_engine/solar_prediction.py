import os
import pandas as pd

# Formula coefficients (you can adjust these based on your model)
alpha = 0.5   # Coefficient for solar radiation
beta = 0.3    # Coefficient for carbon footprint
gamma = 0.2   # Coefficient for electricity demand
delta = 0.1   # Coefficient for cloud coverage
epsilon = 0.4 # Coefficient for solar energy supply

# Function to calculate the dynamic price
def calculate_price(solar_radiation, carbon_footprint, electricity_demand, cloud_coverage, solar_energy_supply):
    # Avoid division by zero for solar radiation (assume minimum radiation is 0.01 kW/m²)
    if solar_radiation <= 0:
        solar_radiation = 0.01

    # Formula for dynamic pricing
    price = (alpha * (1 / solar_radiation)) + (beta * carbon_footprint) + (gamma * electricity_demand) \
            + (delta * cloud_coverage) - (epsilon * solar_energy_supply)
    
    return round(price, 4)  # Return price rounded to 4 decimal places

