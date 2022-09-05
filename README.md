# E-Commerce Back End

[![License: Unlicense](https://img.shields.io/badge/license-Unlicense-blue.svg)](http://unlicense.org/)

## Description
A simple program the uses Node.js, MySQL and Express.js to create and manage a database of items for sale.

You can watch a demonstration of it [here](https://youtu.be/WeMWIyU2tpw).

<br/>

## Table Of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributors](#contributors)
- [Tests](#tests)
- [Contact](#contact)

<br/>

## Installation
Create the database with:
~~~
mysql -u root -p
~~~
~~~
source db/schema.sql
~~~

Seed the database with:
~~~
npm run seed
~~~

Run the following command to install necessary dependencies:
~~~
npm i
~~~

<br/>

## Usage
You'll need to create a .env file with the credentials for mysql, something like this:
~~~
DB_NAME='ecommerce_db'
DB_USER='root'
DB_PASSWORD='<YOUR PASSWORD HERE>'
~~~

Then install the dependencies, run it with npm start, and make calls to the api.

<br/>

## License
This project is licensed under the The Unlicense license.

<br/>

## Contributors
Alex Scrivener

<br/>

## Contact
If you have any questions about the repo, open an issue or contact me directly at [awombattree@gmail.com](mailto:awombattree@gmail.com). You can find more of my work at [my repo](https://github.com/Wombattree).
 
