[![](https://scdn.rapidapi.com/RapidAPI_banner.png)](https://rapidapi.com/package/LaminarFlightData/functions?utm_source=RapidAPIGitHub_LaminarFunctions&utm_medium=button&utm_content=RapidAPI_GitHub)


#LaminarFlightData Package
The tool below enables you to explore the Flight Data APIs by building queries and viewing live data
* Domain: laminardata.aero
* Credentials: userKey

## How to get credentials: 
0. Login to your [LaminarData account](developer.laminardata.aero) 
1. Got to [Admin Page](https://developer.laminardata.aero/admin)
2. Copy and save your `userKey`

## LaminarFlightData.getFlightsByAirline
Retrieves a list of flight summaries for a given airline using an extended version of FIXM 3.0, including scheduled and airborne flights.

| Field        | Type       | Description
|--------------|------------|----------
| userKey      | credentials| Required: User Key Authentication Parameter
| airlinePrefix| String     | Required: The ICAO prefix for an airline e.g. BAW (Case sensitive)
| status       | String     | Flight Status (airborne, cancelled, completed, filed or scheduled)

## LaminarFlightData.getFlightDetailByGUFI
Retrieves the most complete picture of a single flight using an extended version of FIXM 3.0. Completed flights will remain accessible in the API for 3 hours after the flight has landed. Note that the example GUFI below will not work; you will need a current one from one of the other API calls (e.g. Flights by Airline).

| Field  | Type       | Description
|--------|------------|----------
| userKey| credentials| Required: User Key Authentication Parameter
| gufi   | String     | Required: GUFI of the flight to look up e.g. `761b728a-9a50-4222-8325-8be4a1574241`

## LaminarFlightData.getFlightsByTile
Retrieves a list of flight summaries for a given tile using an extended version of FIXM 3.0. For more information on tiling see below. The API only returns airborne flights.

| Field       | Type       | Description
|-------------|------------|----------
| userKey     | credentials| Required: User Key Authentication Parameter
| xCoordinate | Number     | Required: The x coordinate in the Mercator projection e.g. 3 (Accepts values 0 - 7)
| yCoordinate | Number     | Required: The y coordinate in the Mercator projection e.g. 2 (Accepts values 0 - 7)

## LaminarFlightData.flightsByAerodromePair
Retrieves a list of flight summaries between a pair of aerodromes using an extended version of FIXM 3.0, including scheduled and airborne flights.

| Field          | Type       | Description
|----------------|------------|----------
| userKey        | credentials| Required: User Key Authentication Parameter
| originIcao     | String     | Required: The ICAO code for an aerodrome of origin e.g. EGLL (Case sensitive)
| destinationIcao| String     | Required: The ICAO code for an aerodrome destination e.g. KJFK (Case sensitive)

