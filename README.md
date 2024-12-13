# Home Library Service

## Prerequisites

- Git - [Download & Install Git](https://git-scm.com/downloads).
- Node.js - [Download & Install Node.js](https://nodejs.org/en/download/) and the npm package manager.
- Node version = 22.x.x

## Downloading

```
git clone [{repository URL}](https://github.com/NastyaTsimanovich97/nodejs2024Q3-service.git)
```

## Running application in docker

Build docker containers
```
docker-compose build --no-cache
```

Run docker containers
```
docker-compose up
```

Run DB migration in APPLICATION container terminal
```
npm run migration:run
```

Service docs
http://localhost:4000/doc

PgAdmin
http://localhost:5050/browser/

## Installing NPM modules

```
npm install
```

## Running application
Create .env file in the root and copy .env.example to .env

```
npm start
```

Start application in development mode
```
npm start:dev 
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

After application running open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```

To run all test with authorization

```
npm run test:auth
```

To run only specific test suite with authorization

```
npm run test:auth -- <path to suite>
```

### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

For more information, visit: https://code.visualstudio.com/docs/editor/debugging
