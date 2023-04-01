[![Tests](https://github.com/michaelzaslavsky/node-infrastructures/actions/workflows/main.yml/badge.svg)](https://github.com/michaelzaslavsky/node-infrastructures/actions/workflows/main.yml)

# Contact Us API

A fully ChatGPT development of a Node.js application built with Express and TypeScript, providing a REST API for a Contact Us feature. The API allows users to send messages, which are forwarded as emails to a specified address.

## Features

✔️ Modular structure

✔️ RESTful API

✔️ Express framework

✔️ TypeScript

✔️ Contact Us feature (sends email)

✔️ Error handling middleware

✔️ Winston logging

✔️ Validation middleware (using express-validator)

✔️ Unit tests

✔️ Swagger documentation and authentication

✔️ Rate limiting

✔️ Redis Cluster

✔️ Docker support

✔️ GitHub Actions CI/CD

## Installation

1. Clone the repository
```
git clone https://github.com/MichaelZaslavsky/node-infrastructures.git
```

2. Install dependencies
```
cd node-infrastructures
npm install
```

1. Create a `.env` file and add the following keys:
```
AUTH_USER=your-auth-user
AUTH_PASSWORD=your-auth-password
MAIL_USER=your-email
MAIL_PASS=your-email-password
MAIL_HOST=your-email-host
REDIS_HOST=localhost
```

1. Run the application
```nodejs
npm start
```

## Usage

Visit http://localhost:3000 to access the API. You can view the Swagger documentation at http://localhost:3000/api-docs.

## Running with Docker

1. Build the Docker image
```
docker build -t contact-us-api .
```

2. Run the Docker container
```
docker run -p 3000:3000 contact-us-api
```

## Running with Docker Compose
```
docker-compose up
```

## Running tests

Run the following command to execute the tests:
```nodejs
npm test
```

## License

This project is licensed under the MIT License.