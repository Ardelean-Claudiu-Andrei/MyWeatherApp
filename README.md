# Weather App README
This repository contains the "Weather App" project that I made during the internship. It contains a simple weather app built using React Native that allows users to search for the weather information of a specific city. The app uses the OpenWeatherMap API to fetch weather data and display it to the user.

# Features
* Weather Information: The app retrieves weather data from the OpenWeatherMap API based on the user's input and displays it on the screen.

* Background Image: The background image of the app changes based on the temperature of the location. There are different images for different temperature ranges.

* Loading Indicator: While the weather data is being fetched from the API, a loading indicator is displayed to provide feedback to the user.

## Video

https://github.com/Ardelean-Claudiu-Andrei/HelpMAP/assets/91498815/c915957e-07a9-4ea9-be4d-8af264638bab

# App Structure
The app consists of two main components:

* App Component (App.js): This is the main component that handles the user interface, fetching weather data, and displaying it on the screen. It also manages the background image based on the temperature.

* SearchInput Component (SearchInput.js): This component handles the input field where the user can type the city name. It also triggers the API call when the user submits the search.

# Technical
* JavaScript
* Frameworks: Expo, React Native
* axios: Used for making API requests.
* OpenWeatherMap API: Used to fetch weather data.
