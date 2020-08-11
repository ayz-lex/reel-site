# thereel.xyz

## Overview

Website that offers movie recommendations, and keeps track of watched movies when signed in.

## Functionality

### Main Page

The cover page of this application offers users a brief description of the movie, and the ability to either skip (when not logged in), or declare the movie as watched (if logged in). 

### Watched Page

The watched page, which is only accessible if a user is logged in, provides a list of all the movies that the user has previously watched.

### Authentication

There are several different pages that deal with authentication, and their accessibility is determined by whether or not a user is logged in. These pages include the login page, sign up page, as well as the logout button. 

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