# TTC Complaints

Single page application built on Node, Express, MongoDB, SASS



## Installation
Clone repository

    https://github.com/dkonieczek/TTC-Complaints.git

Install node modules

    cd TTC-Complaints && npm install

Create MongoDB folder

    mkdir -p data/db

Start MongoDB daemon

    mongod --dbpath ./data/db/

## Modifications

Compile SASS

    sass --watch ./public/styles.scss:./public/styles.css
