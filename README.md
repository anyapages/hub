# Smart City Hub: AI-Driven Solar Forecasting & Dynamic Pricing ☀️

##  Overview

This full-stack web application predicts future energy consumption and dynamic electricity pricing using an AI-powered backend. The application visualises solar energy metrics, including solar radiation, carbon footprint, and energy supply. Future integration with NASA APIs will enhance forecasting accuracy by using real-time data from satellites and sensors, allowing users to select and analyse data from cities worldwide.

## Technologies

- Frontend: React
- Backend: Flask (Python)
- Scikit-learn (for solar forecasting and dynamic pricing models)

## How to Run

Frontend:

	1.	Navigate to the frontend directory.
	2.	Run npm start to start the React development server.
	3.	Visit http://localhost:3000.

Backend:

	1.	Navigate to the backend directory.
	2.	Activate the virtual environment: source venv/bin/activate.
	3.	Run python app.py to start the Flask server on http://localhost:5000.

AI Models

- Solar Forecasting: Uses historical solar radiation data to predict future energy supply.
- Dynamic Pricing: Implements a regression model to calculate electricity pricing based on solar energy supply, carbon footprint, and other environmental factors.

## Future Enhancements

- Integration with NASA APIs for satellite data to enhance predictions.
- Users can select cities worldwide to analyse and visualise energy data dynamically.
- Integration with real-time sensors for enhanced prediction accuracy.
- Expansion of AI models for energy and water management.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

- Developed by Quanta, Faculty of Engineering and IT, University of Melbourne.