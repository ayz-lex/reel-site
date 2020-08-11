# thereel.xyz

## Overview

Website that offers movie recommendations, and keeps track of watched movies when signed in.

## Functionality

### Main Page

The cover page of this application offers users a brief description of the movie, and the ability to either skip (when not logged in), or declare the movie as watched (if logged in). 

![Screenshot from 2020-08-11 14-05-32](https://user-images.githubusercontent.com/54557530/89932539-ce149e80-dbdb-11ea-86ee-d8ba56ac8ec8.png)

### Watched Page

The watched page, which is only accessible if a user is logged in, provides a list of all the movies that the user has previously watched.

![Screenshot from 2020-08-11 13-48-50](https://user-images.githubusercontent.com/54557530/89932383-8ee64d80-dbdb-11ea-9baf-9a3172586d84.png)

### Authentication

There are several different pages that deal with authentication, and their accessibility is determined by whether or not a user is logged in. These pages include the login page, sign up page, as well as the logout button. 

![Screenshot from 2020-08-11 13-48-17](https://user-images.githubusercontent.com/54557530/89932367-88f06c80-dbdb-11ea-9c0f-dca3b85f575d.png)

## Built With

### Backend

* Node.js
* Express.js - Node Framework
* PostgreSQL (AWS RDS)

### Frontend

* React
* Material UI - React UI component library
* Nginx - Server, and reverse proxy for backend server

### Deployment

* AWS EC2
* Docker
