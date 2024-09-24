# water_model.py

from sklearn.linear_model import LinearRegression
import numpy as np

def predict_water_usage(current_usage):
    # Sample training data
    X = np.array([[50], [100], [150], [200], [250]])  # Example input data in liters
    y = np.array([55, 110, 165, 220, 275])  # Example target output (future predictions)

    # Create and train the model
    model = LinearRegression()
    model.fit(X, y)

    # Predict future water usage based on current usage
    prediction = model.predict(np.array([[current_usage]]))
    return prediction[0]