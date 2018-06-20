# Project Name

**Rooms N Board**

An airbnb clone room listing page including four main components:
* description-listing
* booking-servie
* reviews
* filter-listing

## Related Projects

# Original Source
  - https://github.com/n-app/

# Current Organization
  - https://github.com/roomNboard/

## Table of Contents

1. [Usage](#Usage)
1. [Requirements](#requirements)
1. [Development](#development)

## Usage

* clone the github repo to your local drive
* Form within in the root directory:
```sh
npm run react-dev
npm run dev-server
```

## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).
(not applicable)

- Node 10.2.1
- mysql 5.7

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install
```

### Inserting initial mock data

From within the root directory:

```sh
mysql -u [username] -p [password] < database/schema.sql
```
