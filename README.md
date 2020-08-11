# Travel-App-Capstone-Project-Udacity
 
Images API:
- Pixabay API

Location APIs:
- Mapquest Geocoding API
- GeoNames API
- REST Countries API

Weather APIs:
- Watherbit API
- OpenWeatherMap API

The application has a Micro-services back-end architecture, so there is a ServiceRegistry (port 3000) that registers the different
micro-services and is accessed by the client for retreiving the ip, port and version of the micro-service needed to
request data.

The environment variables are included in the repository so that the system can be reviewed. In a future, those files will be added
in the .gitignore and then removed from the repository.

For running the complete the architecture, just from the root folder (Travel-App-Capstone-Project-Udacity) run the command: npm run start.

After running those scripts, all the microservices will be registered on the service_registry. So they can be called from the
hosting server of the travel_app.

Then, from the browser request the html index page by typing localhost:8030, which is the specified port of the hosting server.

Travel App Client Application V1.0.0 Features:
- CREATE trips
- UPDATE trips
- ADD locations to a trip
- ADD checklist to a trip
- ADD notes to a trip
- ADD location dates and days in which the user will be in there
- SELECT one of the different countries when adding a location
- SEARCH a country location by pressing enter after typing the location
- Real life images for each location
- Use of local storage for passing data between each html page
- Display location current and 16 days forecast weather

TODOs Features on Future Updates:
- Multiple user authentication. Right now it only has the user richi_bonilla10
- Dynamic progress circles for images slider
- Delete trips
- Visited navbar option for expired trips
- Profile navbar option for user settings
- Pull in an image for the country from Pixabay API when the entered location brings up no results
- Allow the user to add hotel and/or flight data.
- Incorporate icons into forecast. Right now it only has one static weather icon
- Allow user to Print their trip and/or export to PDF
- Automatically sort additional trips by countdown