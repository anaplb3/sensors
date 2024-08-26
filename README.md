# Sensors

This solution consists of a PostgreSQL database, a Flask backend with three endpoints, and a React frontend page where you can view the average values of each sensor over the last 24 hours, 48 hours, 1 week, or 1 month.

![Solution's architecture](./img/sensors.png)

# How to run the solution
You will have to fill the variables `POSTGRES_USER` and
`POSTGRES_PASSWORD` on the .env file.
You will also need to have [Docker](https://www.docker.com/) installed on your machine. Having that, you can simply run:

 `docker-compose up -d --build`
 
 After that the application should start, and you can access the frontend by going to http://localhost:3000. If you want to access the api's swagger, you can go to http://localhost:5000/.