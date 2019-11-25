import React from 'react'

 function Body() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <br />
                    <h3 className="text-success">Documentation</h3>
                    <hr />
                    <h3>Introduction</h3>
                    <p>
                        Welcome to the Star Wars API. This documentation is intended to help developers learn how to use the resources 
                        provided by this API. It shows you how to consume the resources using http requests. All requests are made or returned in JSON format.
                        Please read carefully.
                    </p>

                    <h6>Getting Started</h6>
                    <p>
                        Let's try making our first API request. Using Postman or any other HTTP client of your choice, 
                        make a GET request to http://starwarsapitest.herokuapp.com/api/list-all-comments <br />
                        Below is the response gotten
                    </p>
                    <div className="bg-light">
                        <pre><code>
                            {'{'}<br />
                            "id": 1,<br />
                                "ipaddress": "154.113.98.190",<br />
                                "created_at": "Sun, 24 Nov 2019",<br />
                                "substring": "I love this great movie"<br />
                            {'}'}
                        </code></pre>
                    </div>


                    <h6>Root URL</h6>
                    <p>The root URL for this API is http://starwarsapitest.herokuapp.com/api/</p>

                    <h6>Authentication</h6>
                    <p>No authentication is required to use this API. It is a completely open API. So, feel free to use to it.</p>

                    <hr />

                    <h3 className="text-success">Resources</h3>
                    <hr />

                    <h4>Movies</h4>
                    <p>This is a list of all Star Wars Movies</p>

                    <h6>Endpoint</h6>
                    <p>/list-all-movies/  --- returns all Star Wars in chronological order of their release dates <br />
                    Request Type: GET </p>


                    <h6>Sample request</h6>
                    <p>http://starwarsapitest.herokuapp.com/api/list-all-movies/</p>

                    <h6>Sample response</h6>
                    <div className="bg-light">
                        <pre><code>
                        {'{'}<br />
                            "title": "A New Hope", <br />
                            "episode_id": 4,<br />
                            "opening_crawl": "It is a period of civil war.\r\nRebel spaceships, striking\r\nfrom a hidden base, have won\r\ntheir
                             first victory against\r\nthe evil Galactic Empire.\r\n\r\nDuring the battle,<br />
                              Rebel\r\nspies managed to steal secret\r\nplans to the Empire's\r\nultimate weapon, <br />the DEATH\r\nSTAR, 
                              an armored space\r\nstation with enough power\r\nto destroy an entire planet.<br />\r\n\r\nPursued by the 
                              Empire's\r\nsinister agents, Princess\r\nLeia races home aboard her\r\nstarship, custodian of the\r\nstolen plans
                               that can save her\r\npeople and restore\r\nfreedom to the galaxy....",<br />
                            "director": "George Lucas",<br />
                            "producer": "Gary Kurtz, Rick McCallum",<br />
                            "release_date": "1977-05-25",<br />
                            "characters": [<br />
                                "https://swapi.co/api/people/1/",<br />
                                "https://swapi.co/api/people/2/",<br />
                                "https://swapi.co/api/people/3/",<br />   
                            ],<br />
                            "planets": [<br />
                                "https://swapi.co/api/planets/2/",<br />
                                "https://swapi.co/api/planets/3/",<br />

                            ],<br />
                            "starships": [<br />
                                "https://swapi.co/api/starships/2/",<br />
                                "https://swapi.co/api/starships/3/",<br />
                               
                            ],<br />
                            "vehicles": [<br />
                                "https://swapi.co/api/vehicles/4/",<br />
                                "https://swapi.co/api/vehicles/6/",<br />
                               
                            ],<br />
                            "species": [<br />
                                "https://swapi.co/api/species/5/",<br />
                                "https://swapi.co/api/species/3/",<br />
                            ],
                            "created": "2014-12-10T14:23:31.880000Z",<br />
                            "edited": "2015-04-11T09:46:52.774897Z",<br />
                            "url": "https://swapi.co/api/films/1/"<br />
                            {'}'}
                            
                        </code></pre>
                    </div>
                   

                    <h6>Attributes</h6>
                    <ul>
                        <li><code>title</code> <em>string</em>
                        -- The title of this film</li>
                        <li><code>episode_id</code> <em>integer</em>
                        -- The episode number of this film.</li>
                        <li><code>opening_crawl</code> <em>string</em>
                        -- The opening paragraphs at the beginning of this film.</li>
                        <li><code>director</code> <em>string</em>
                        -- The name of the director of this film.</li>
                        <li><code>producer</code> <em>string</em>
                        -- The name(s) of the producer(s) of this film. Comma separated.</li>
                        <li><code>release_date</code> <em>date</em>
                        -- The ISO 8601 date format of film release at original creator country.</li>
                        <li><code>species</code> <em>array</em>
                        -- An array of species resource URLs that are in this film.</li>
                        <li><code>starships</code> <em>array</em>
                        -- An array of starship resource URLs that are in this film.</li>
                        <li><code>vehicles</code> <em>array</em>
                        -- An array of vehicle resource URLs that are in this film.</li>
                        <li><code>characters</code> <em>array</em>
                        -- An array of people resource URLs that are in this film.</li>
                        <li><code>planets</code> <em>array</em>
                        -- An array of planet resource URLs that are in this film.</li>
                        <li><code>url</code> <em>string</em>
                        -- the hypermedia URL of this resource.</li>
                        <li><code>created</code> <em>string</em>
                        -- the ISO 8601 date format of the time that this resource was created.</li>
                        <li><code>edited</code> <em>string</em>
                        -- the ISO 8601 date format of the time that this resource was edited.</li>
                    </ul>







                    <h4>Comments</h4>
                    <p>These are comments by anonymous people. The request must be made in JSON format</p>

                    <h6>Endpoints</h6>
                    
                    <ul>
                        <li>/add-comments/ --- Adds a new comment (POST request) </li>
                        <li>/list-all-comments/ --- lists all comments in reverse chronological order (GET requets)</li>
                    </ul>
                    
                    <h6>Sample request</h6>
                    <p>http://starwarsapitest.herokuapp.com/api/list-all-comments</p>

                    <h6>Sample response</h6>
                    <div className="bg-light">
                        <pre><code>
                        {'{'}<br />
                        "id": 1,<br />
                                "ipaddress": "154.113.98.190",<br />
                                "created_at": "Sun, 24 Nov 2019",<br />
                                "substring": "I love this great movie"<br />
                         {'}'}
                        </code></pre>
                      
                    </div>
                   
                        

                    <h6>Attributes</h6>
                    <ul>
                        <li><code>id</code> <em>Integer</em>
                        -- The id of the commenter</li>
                        <li><code>ipaddress</code> <em>String</em>
                        -- IP address of the commenter</li>
                        <li><code>created_at</code> <em>string</em>
                        -- date the comment was created in UTC format</li>
                        <li><code>substring</code> <em>string</em>
                        -- an extract from the comment added by the commenter, limited to 500 characters</li> 
                       
                    </ul>






                    <h4>Characters</h4>
                    <p>These are the Characters (people) featured in the movies. <br />
                    Request Type: GET </p>
                   

                    <h6>Endpoint</h6>
                    <p>/get-characters/ <br />
                    This endpoint accepts two types of parameters:</p>
                    
                    <p>Sort parameter -- sorts by height. Returns all characters in ascending order of their geight. <br />
                    Example: http://starwarsapitest.herokuapp.com/api/get-characters/?search=male  -- returns all male characters</p>
                    <p>Filter parameter -- filters by gender. <br />
                    Example: http://starwarsapitest.herokuapp.com/api/get-characters/?height=165  -- returns all charcters in ascending order of their heights</p>
                    
                    
                    
                    <h6>Sample Request</h6>
                    <p>http://starwarsapitest.herokuapp.com/api/get-characters/?search=female</p>
                    

                    <h6>Sample response</h6>
                    <div className="bg-light">
                        <pre><code>
                            {'{'}<br />
                            
                                "name": "Leia Organa",<br />
                                "height": "150",<br />
                                "mass": "49",<br />
                                "hair_color": "brown",<br />
                                "skin_color": "light",<br />
                                "eye_color": "brown",<br />
                                "birth_year": "19BBY",<br />
                                "gender": "female",<br />
                                "homeworld": "https://swapi.co/api/planets/2/",<br />
                                "films": [<br />
                                    "https://swapi.co/api/films/2/",<br />
                                    "https://swapi.co/api/films/6/",<br />
                                    "https://swapi.co/api/films/3/",<br />
                                    "https://swapi.co/api/films/1/",<br />
                                    "https://swapi.co/api/films/7/"<br />
                                ],<br />
                                "species": [<br />
                                    "https://swapi.co/api/species/1/"<br />
                                ],<br />
                                "vehicles": [<br />
                                    "https://swapi.co/api/vehicles/30/"<br />
                                ],<br />
                                "starships": [],<br />
                                "created": "2014-12-10T15:20:09.791000Z",<br />
                                "edited": "2014-12-20T21:17:50.315000Z",<br />
                                "url": "https://swapi.co/api/people/5/"<br />
                            },<br />
                    
                            {'}'}  
                        </code></pre>
                    </div>    

                    <h6>Meta structure</h6>
                    <p>This is a summary of the response above</p>
                    <div className="bg-light">
                        <pre><code>
                            "meta": {'{'}<br />
                            
                            "totalCharacters": 2,<br />
                            "totalHeight": "315cm",<br />
                            "totalHeightInCentimetres": "315cm",<br />
                            "totalHeightInFeetAndInch": "10ft and 124.02inches"<br />
                        
                            {'}'}
                        </code></pre>
                    </div>
                   
                <h6>Attributes</h6>
                    <ul>
                    <li><code>name</code> <em>string</em>
                    -- The name of this person.</li>
                    <li><code>birth_year</code> <em>string</em>
                    -- The birth year of the person, using the in-universe standard of <strong>BBY</strong> or <strong>ABY</strong> - Before the Battle of Yavin or After the Battle of Yavin. The Battle of Yavin is a battle that occurs at the end of Star Wars episode IV: A New Hope.</li>
                    <li><code>eye_color</code> <em>string</em>
                    -- The eye color of this person. Will be "unknown" if not known or "n/a" if the person does not have an eye.</li>
                    <li><code>gender</code> <em>string</em>
                    -- The gender of this person. Either "Male", "Female" or "unknown", "n/a" if the person does not have a gender.</li>
                    <li><code>hair_color</code> <em>string</em>
                    -- The hair color of this person. Will be "unknown" if not known or "n/a" if the person does not have hair.</li>
                    <li><code>height</code> <em>string</em>
                    -- The height of the person in centimeters.</li>
                    <li><code>mass</code> <em>string</em>
                    -- The mass of the person in kilograms.</li>
                    <li><code>skin_color</code> <em>string</em>
                    -- The skin color of this person.</li>
                    <li><code>homeworld</code> <em>string</em>
                    -- The URL of a planet resource, a planet that this person was born on or inhabits.</li>
                    <li><code>films</code> <em>array</em>
                    -- An array of film resource URLs that this person has been in.</li>
                    <li><code>species</code> <em>array</em>
                    -- An array of species resource URLs that this person belongs to.</li>
                    <li><code>starships</code> <em>array</em>
                    -- An array of starship resource URLs that this person has piloted.</li>
                    <li><code>vehicles</code> <em>array</em>
                    -- An array of vehicle resource URLs that this person has piloted.</li>
                    <li><code>url</code> <em>string</em>
                    -- the hypermedia URL of this resource.</li>
                    <li><code>created</code> <em>string</em>
                    -- the ISO 8601 date format of the time that this resource was created.</li>
                    <li><code>edited</code> <em>string</em>
                    -- the ISO 8601 date format of the time that this resource was edited.</li>
                    <li><code>meta</code> <em>Object</em>
                    -- a summary of the all records retrieved.</li>
                    <li><code>totalCharacters</code> <em>Integer</em>
                    -- total number of characters retrieved</li>
                    <li><code>totalHeight</code> <em>Integer</em>
                    -- sum of the heights of all the characters</li>
                    <li><code>totalHeightInCentimetres</code> <em>String</em>
                    -- sum of the heights of all the characters, given in cm</li>
                    <li><code>totalHeightInFeetAndInch</code> <em>String</em>
                    -- sum of the heights of all the characters, given in feet and inches</li>
                </ul>

               
                    <h4 className="text-success">HTTP Response codes</h4>
                    <ul>
                                <li>200 -- Returned when resource is successfully fetched</li>
                                <li>201 --- Returned when a new resource is successfully created</li>
                                <li>400 --- Returned when a request url syntax is malformed, has wrong parameters or if the request body 
                                    format is invalid </li>
                                <li>404 --- Returned when requested resource is not found</li>
                    </ul>

                    <br />
                    <br />
                            
                    <p className="text-center">Created with <span style={{color: 'red'}}><i className="fa fa-heart" aria-hidden="true"></i></span> by Victor Umezuruike</p>
                </div>
            </div>
        </div>
    )
}

export default Body;