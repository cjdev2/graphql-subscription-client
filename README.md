# GraphQL Subscription Client
This project is a demonstration of how to subscribe to CJ's upcoming GraphQL API. It demonstrates the pattern of how to connect and reconnect to the API server.

## Requirements
Running this project requires node and npm.

## Usage
### Setup Your Environment
Copy `.env.sample` to a new `.env` file and fill in the parameters in the new file. The `.env` file is git ignored and is intended for local testing with credentials.

### Download Dependencies
```sh
npm install
```

### Run
Run using the `run.sh` script, with the name of the subscription operation as a parameter:
```sh
./run.sh conversions
```
```sh
./run.sh paymentStatusEvents
```
