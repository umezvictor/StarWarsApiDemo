This documentation is intended to help developers learn how to use the resources provided by this API. It shows you how to consume the resources using http requests. All requests are made or returned in JSON format. Please read carefully.

Root URL

The root URL for this API is http://starwarsapitest.herokuapp.com/api/

Authentication

No authentication is required to use this API. It is a completely open API. So, feel free to use to it.

Resources

Movies This is a list of all Star Wars Movies

Endpoint: /list-all-movies/ --- returns all Star Wars in chronological order of their release dates

Request Type: GET

Sample request

http://starwarsapitest.herokuapp.com/api/list-all-movies/

Comments

These are comments by anonymous people. The request must be made in JSON format

Endpoints

/add-comments/ --- Adds a new comment (POST request). Stores the comment sent from the json request body.

Sample request for the /add-comments/ endpoint

{

  "comment": "I love this movie"
  
}

/list-all-comments/ --- lists all comments in reverse chronological order (GET requets)

Sample request

http://starwarsapitest.herokuapp.com/api/list-all-comments

Characters

These are the Characters (people) featured in the movies.

Request Type: GET

Endpoint: /get-characters/ -- returns the movie characters based on the supplied parameter

This endpoint accepts two types of parameters:

Sort parameter -- sorts by height. Returns all characters in ascending order of their height.

Example: http://starwarsapitest.herokuapp.com/api/get-characters/?search=male -- returns all male characters

Filter parameter -- filters by gender.

Example: http://starwarsapitest.herokuapp.com/api/get-characters/?height=165 -- returns all charcters in ascending order of their heights

Sample Request

http://starwarsapitest.herokuapp.com/api/get-characters/?search=female

HTTP Response codes

200 -- Returned when resource is successfully fetched

201 --- Returned when a new resource is successfully created

400 --- Returned when a request url syntax is malformed, has wrong parameters or if the request body format is invalid

404 --- Returned when requested resource is not found

Note: This api uses PostreSQL database

To read the full documentation, visit https://starwarsapitest.herokuapp.com
