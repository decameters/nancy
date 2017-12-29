# Name of Project

One Paragraph of project description goes here. Link to the live version of the app if it's hosted on Heroku.

## Built With

List technologies and frameworks here

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Link to software that is required to install the app (e.g. node).

- [Node.js](https://nodejs.org/en/)
- List other prerequisites here


### Installing

Copy and paste database.sql file to set up basic database structure.

```sql
CREATE TABLE "users" (
  "id" serial primary key,
  "username" varchar(80) not null UNIQUE,
  "password" varchar(240) not null,
  "first_name" varchar(25),
  "last_name" varchar(25),
  "phone" bigint ***this might change***
);
```

## Screen Shot

Include one or two screen shots of your project here (optional). Remove if unused.

## Documentation

Link to a read-only version of your scope document or other relevant documentation here (optional). Remove if unused.

### Completed Features

High level list of items completed.

- [x] Feature a
- [x] Feature b

### Next Steps

Features that you would like to add at some point in the future.

- [ ] Feature c

## Deployment

Add additional notes about how to deploy this on a live system

## Authors

* Liz Elton


## Acknowledgments

* Thanks to Scott Bromander and Kris Szafranski at Prime Digital Academy for the registration and authentication code. 
