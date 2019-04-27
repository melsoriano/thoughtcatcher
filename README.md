# Serverless Note Taking App

Note taking app built with the Serverless Framework, AWS Amplify, and React

**Pre-Requisites**
- NodeJS
- NPM
- AWS Account
- Baseline knowledge of how to setup AWS Cognito User & Identity Pools, S3, and API Gateway

**Launch in Development**

1. Fork and clone repo
2. Install dependencies in `notes-app-api` **AND** `notes-app-client` directories: `npm install`
3. Change directory: `cd note-app-client`
4. Start application: `npm start`

**_*Note:_** You will need to create Cognito User and Identity Pools, S3 Bucket, and API Gateway to run this project in development. Create a config file in src: `src/config.js`. Copy and paste the code below and replace the following with your own credentials:

```
export default {
  s3: {
    REGION: "YOUR_S3_UPLOADS_BUCKET_REGION",
    BUCKET: "YOUR_S3_UPLOADS_BUCKET_NAME"
  },
  apiGateway: {
    REGION: "YOUR_API_GATEWAY_REGION",
    URL: "YOUR_API_GATEWAY_URL"
  },
  cognito: {
    REGION: "YOUR_COGNITO_REGION",
    USER_POOL_ID: "YOUR_COGNITO_USER_POOL_ID",
    APP_CLIENT_ID: "YOUR_COGNITO_APP_CLIENT_ID",
    IDENTITY_POOL_ID: "YOUR_IDENTITY_POOL_ID"
  },
    MAX_ATTACHMENT_SIZE: YOUR_FILE_SIZE_PREFERENCE,
};
```