# CRUD-Manufacturer

You can also:
  - Import and save files from GitHub

### Tech

CRUD-Manufacturer uses a number of open source projects to work properly:

* [node.js] - evented I/O for the backend
* [Hapi] - build powerful, scalable applications, with minimal overhead and full out-of-the-box functionality
* [Gulp] - the streaming build system
* [sequelize] - sequelize is a promise-based Node.js ORM
* [sqlite3] - a small, fast, self-contained, high-reliability, full-featured, SQL database engine

And of course Wilton O. Ferreira itself is open source with a [public repository][wof]
 on GitHub.

### Installation

CRUD-Manufacturer requires [Node.js](https://nodejs.org/) v12+ to run.

Install the dependencies and devDependencies and start the server.

```sh
$ cd crud-manufacturer
$ npm install
$ node run start
```

For production environments...
Create a .env file in the root of your project and insert your key/value pairs in the following format of KEY=VALUE:

>NODE_ENV=prod

For development environments...
Create a .env file in the root of your project and insert your key/value pairs in the following format of KEY=VALUE:

>NODE_ENV=dev 

For test environments...
Create a .env file in the root of your project and insert your key/value pairs in the following format of KEY=VALUE:

>NODE_ENV=test

Rest API documentation http://127.0.0.1:3000/docs

### Development

Want to contribute? Great!

CRUD-Manufacturer uses Gulp for fast developing.
Make a change in your file and instantaneously see your updates!

Open your favorite Terminal and run these commands.

First Tab:
```sh
$ npm run start
```

Second Tab:
```sh
$ npm run test
```

#### Building for source
For production release:
```sh
$ npm run build
```

### Todos

 - Write MORE Tests
 - Tests another databases
 - Implements JWT Autentication
 - Implements Schema Authorization with roles
 
License
----

MIT


**Free Software!**

[//]: #

   [wof]: <https://github.com/wiltonof>
   [node.js]: <http://nodejs.org>
   [hapi]: <https://hapi.dev/api/>
   [Gulp]: <http://gulpjs.com>
   [sequelize]: <https://sequelize.org/>
   [sqlite3]: <https://www.sqlite.org/version3.html>