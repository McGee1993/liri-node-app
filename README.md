# Liri Node APP
The Liri app is a Language Interpretation and Recognition Interface node comand line application that imployes APIs to retrieve data including information on songs from Spotify, information on movies from OMD, and information on live music events from Bands in Town. This application gives users easy access to this information from any three of these sorces just by entering a command in the terminal.

# APP Overview
Liri uses a series of switch/case statements and command phrases to instruct node to get the requested data from the api and print it in the console,
![Screenshot](screenshot.png)
![Screenshot](screenshot2.png)
![Screenshot](screenshot3.png)
The data is then appended into the log.txt file which keeps track of all the searches that pass through the app,
![Screenshot](screenshot4.png)

# Technologies
Liri uses Axios to retrieve the data from the APIs and convert it to JSON so it can be easily read by the user. Liri also uses node.js to run the app and process the users commands and present the data in a user friendly way.
