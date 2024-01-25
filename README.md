## Project Description
This project was created to learn and apply industry standard software engineering concepts, technology, and design. I did this by building a [website](https://jacktabb.net/) using react.js and node/express js that displays city information. Concepts that I furthered my knowledge in through building this website are:

* [Rest Apis](#RestAPI). My backend is built as a rest api. I did this to make clients such as the front end web pages easily retrieve, modify, or delete data from various resources.


* [User authentication and distributed cache](#UserA). I have user authentication for this website, so if a user wants to gain access to the protected parts of this website, they must either create an account or give a valid username and password 

* [Databases](#db). I use a postgreSQL database to store user information as well as be a source of weather info. 

* [Cloud deployment](#cld). This website is hosted on google cloud platform.

* [Software design patterns](#sft). This project helped me understand how following a good design pattern is important.


## Rest apis:
<details>
	<summary>rest api</summary>


* My backend is built as a rest api, using node.js and express.js. This involved creating various endpoints to handle different types of requests.
* This allowed me to have a backend that acts independent of my frontend website, or any other clients that use the backend. Nothing in any client code will have any effect on my backend. My backend is simply a service that clients can use to retrieve or update information.
* Rest apis are also very easy for clients to use. All any client has to do is call upon the endpoint, supplying the necessary parameters, and the rest api will do the rest.

![simple diagram of backend logic](imagesForReadme/restapi.png)

* I have implemented 5 http methods: get, put, post, delete, and patch. Each endpoint, when called upon, will handle the request accordingly, performing operations such as updating a database with weather information, or a getting static google map of a city.
* To add more orgainization to my api, I have added OAS (open api spec) support, the official contract can be viewed [here](https://jtabb1213.github.io/weather/#/). With this addition, people that are either working on this project or using the backend can clearly tell what each endpoint in the api does, what type of method it performs, and the request and response formats.


</details>

<a id="RestAPI"></a>

## User authentication and distributed cache:

<details>
	<summary>user authentication and distributed cache</summary>

* In order to use the webpage to search for city information, users first must login with a valid username and password. They can also create a new account.
* When the user attempts to login, a request, with the username and password in the body, is sent to the database to confirm that the user is found, which if successful, will make a 30 minute session for the user. This allows the user to access the protected endpoints of the website.

![chart of logic in user authorization](imagesForReadme/imagedb.png)

* Additionally, I have added a distributed cache, which stores the user session in a redis store. Now, all user session infomation is in a distributed cache. This is useful because now if I wish to scale up my web application to meet traffic demand, users will not have any authentication issues when switching between instances of my app, as that info will be in a distributed cache.

![distributed cache](imagesForReadme/imageSC.png){width=50%}

</details>

<a id="UserA"></a> 

## Databases:

<details>
	<summary>databases</summary>


* As mentioned earlier, I have implemented a postgre sql database in this application.
* Using a database allowed me to do two things, store user information as well as be a source of weather information that I can add myself. 
* I have added 'city weather' and 'user' models that can be used with the ORM library sequalize to create instances of these models and use them to update or retrieve info from the database.
* To update weather information, I have endpoints in my backend that when called upon, will delete, update, patch, post, or get information in the database. This will obviously only work if the specified provider for weather is the database, so if it is not and you try to do an api call, you will simply get an error message saying 'function is not supported'.

![image of logic flow in updating the database with new weather info:](imagesForReadme/imageWeatherDB.png)

* To update the user information, a very similar apprach is taken only now isntead of using postman to update the database, users will do it when creating their account or logging into the website.



</details>

<a id="db"></a>

## Cloud deployment:

<details>
	<summary>google cloud deployment</summary>

* This application was made accessible by anyone on the internet by deploying it to google cloud. I also had to host the redis store, which was done with redislabs, and host the postgre database, which was done with elephantSQL.

![Model of cloud deployment:](imagesForReadme/image1.png){width=50%}

</details>

<a id="sft"></a>

## Software design patterns:

<details>
	<summany>Software Design</summary>

* While building this website, it taught me how important it was to follow good design organization and patterns to ease the development process.
* One design pattern that I followed was the delegation pattern. This meant that when the backend service recieves a request, rather than proccess that request direcly, it delegates that task to another object. In my case, those objects are the 'index' files found in each of the services. This helps greatly to make a organized codebase, as well as it makes it easier to understand and modify individual components.
* Below is a model of the backend design, where I followed this pattern: 

![Model of backend design](imagesForReadme/image2.png)

* One benifit that this offers, other than being orgainized, is now the providers to get informtaion can easily be switched. All that has to be done is specify the provider for the service you want in the 'config' file. No code has to be changed. 
* 

</details>
