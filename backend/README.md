# FastAPI Backend Workflow Overview

## Overview

This FastAPI backend serves as the primary interface for collecting and managing data from a front-end Bluetooth device. The backend communicates with AWS Lambda functions to fetch data from the device and store it in DynamoDB (or a vector database). Below is an overview of the components and the interaction flow.

## Components

- **FastAPI**: The main web framework that handles API requests for data collection and retrieval.
- **AWS Lambda**: Executes serverless functions that interact with the Bluetooth device and DynamoDB.
- **DynamoDB**: Stores the collected data in a scalable NoSQL database.

## Workflow

1. **Data Collection Endpoint (/collect-data/)**:
   - Client sends a request to FastAPI to initiate data collection from a Bluetooth device.
   - FastAPI triggers the `FetchBluetoothDataLambda` Lambda function via AWS SDK (Boto3).
   - The Lambda function fetches the data from the device and returns it to FastAPI.

2. **Data Storage Endpoint (/store-data/)**:
   - Client sends data to FastAPI via POST request.
   - FastAPI triggers the `StoreDataLambda` Lambda function, which stores the received data in DynamoDB.

3. **Data Retrieval Endpoint (/retrieve-data/{device_id})**:
   - Client requests stored data by providing the `device_id`.
   - FastAPI queries DynamoDB using Boto3 and returns the stored data to the client.

## Architecture Diagram

```plaintext
                 +-----------------------------+
                 | Frontend Bluetooth Device    |
                 +-----------------------------+
                              |
                              v
                     +------------------+
                     | FastAPI Backend  |
                     +------------------+
                              |
                 +-----------------------------+
                 | AWS Lambda (Fetch & Store)  |
                 +-----------------------------+
                              |
                     +-------------------+
                     | AWS DynamoDB      |
                     +-------------------+