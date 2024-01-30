<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ pnpm install
```

## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```


## Environment 

```bash
NEST_DEBUG = true
```

## Watch Directory 

The strategy for how entire directory trees are watched under systems that lack recursive file-watching functionality.

- [x] fixedPollingInterval: Check every directory for changes several times a second at a fixed interval.
- [x] dynamicPriorityPolling: Use a dynamic queue where less-frequently modified directories will be checked less often.
- [x] useFsEvents (the default): Attempt to use the operating system/file system’s native events for directory changes.

```json
"compilerOptions":{
"watchOptions": {
    "watchFile": "fixedPollingInterval"
  }
}  
```

## Circular Dependency Packages

`Nest can't resolve dependencies of the <provider> (?).`

[DependenciesMetaInjected](https://pnpm.io/package_json#dependenciesmetainjected)

```json
{
  "name": "card",
  "dependencies": {
    "@nestjs/core": "workspace:10.0.0",
    "react": "16"
  },
  "dependenciesMeta": {
    "@nestjs/core": {
      "injected": true
    }
  }
}
```


# Nest.js Microservices with NATS, MySQL, & Docker

This repository contains 3 Nest.js projects:

- http-api-gateway
- orders-microservice
- users-microservice

You can find the video tutorial for this project [here]('https://youtube.com/)

# Getting Started

Want to set this up locally on your own? The best way to set this project up is by using Docker.

1. Pull down this repository and make sure you install each projects' dependencies by running `npm run install`.

2. Ensure Docker is running then run `docker-compose up --build` to build the container, images, and pull down the mysql and nats image from Docker.

3. Verify that all services are up and running. The HTTP Server runs on port 3000.

# Application Structure

### HTTP API Gateway

This is a [hybrid application](https://docs.nestjs.com/faq/hybrid-application) that uses both HTTP and NATS as sources to listen to requests from. This is the entry point to the entire platform. It forwards the request by publishing a message to the NATS server, and then the NATS server distributes it to its subscribers.

Any HTTP API endpoints should be defined in this project.

### orders Microservice

This is a sample microservice that has a createOrder event handler from the NATS server whenever it is triggered. It will create a order record and save it to the database.

### Users Microservice

This is a user microservice that has a createUser event handler from the NATS server whenever it is triggered. It will create a user record and save it to the database.



## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).
