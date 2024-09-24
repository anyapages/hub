from flask import Flask, request, jsonify
from flask_cors import CORS
from ai_engine.water_model import predict_water_usage

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        current_usage = float(data['waterUsage'])
        prediction = predict_water_usage(current_usage)
        return jsonify({'prediction': round(prediction, 2)})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)