# User Roles

> **User Role Management API**

The **User-Roles API** exposes a [JSON:API Spec](http://jsonapi.org/) Compliant `REST API` that can be used by external services to implement Access Control Layer.

**API Documentation:**
-  A postman collection of the API requests is available at https://documenter.getpostman.com/view/2815732/RzteTCvb

**Postman Collection:**
- Postman collection for the API is available at
https://www.getpostman.com/collections/f3b583132bdaa58af11d

## Technology Stack
* Database - [Mysql](https://www.mysql.com/)
* ORM - [Sequelize](http://docs.sequelizejs.com/)
* Runtime - [Nodejs](https://nodejs.org/en/)
* App server - [express](https://expressjs.com/)

### Installation
to install this project on your local system follow these steps -
- clone this repo: use `git clone https://github.com/avinashb98/user-roles.git`
- change directory: `cd user-roles`
- install npm modules: `npm install`
- create `.env` from `.env_sample`
- enter environment variable values in .env

### Running the API
* use command `npm start` to start the api
* using API testing tools like postman hit the endpoint `localhost:3000/api`
* for more details go the API docs

### Testing
* use command `npm test` to run unit tests