# Multi-Cloud Demo

A demonstration application showing how to deploy the same Node.js app to both AWS ECS Fargate and Google Cloud Run using a unified CircleCI pipeline.

## Features

- **Multi-cloud deployment**: Single pipeline deploys to AWS and GCP
- **Container-first architecture**: Works seamlessly across cloud providers
- **Parallel deployments**: AWS and GCP deployments run simultaneously

## Quick Start

1. **Clone and install dependencies**:

   ```bash
   git clone https://github.com/yemiwebby/multi-cloud-demo.git
   cd multi-cloud-demo
   npm install
   ```

2. **Run locally**:

   ```bash
   npm run dev
   ```

3. **Test the application**:

   ```bash
   npm test
   ```

4. **Build Docker image**:
   ```bash
   docker build -t multi-cloud-demo .
   docker run -p 3000:3000 -e CLOUD_PROVIDER=local multi-cloud-demo
   ```

## Endpoints

- `GET /` - Application info with cloud provider details
- `GET /health` - Health check endpoint
- `GET /info` - Detailed environment and deployment information

## Environment Variables

- `CLOUD_PROVIDER` - Which cloud is hosting (AWS/GCP/local)
- `CLOUD_REGION` - Cloud region identifier
- `APP_VERSION` - Application version (usually git commit)
- `DEPLOYMENT_TIME` - When the deployment occurred
- `PORT` - Server port (default: 3000)

## Prerequisites

Before deploying to the cloud, complete these one-time setup steps:

### AWS Setup

1. **Create IAM user** with programmatic access for CircleCI
2. **Set up ECS execution role** - See detailed instructions in [`aws/README.md`](aws/README.md)
3. **Configure CircleCI environment variables** (see deployment section below)

### GCP Setup

1. **Create service account** with necessary permissions for CircleCI
2. **Enable required APIs** (Cloud Run, Container Registry)
3. **Configure CircleCI environment variables** (see deployment section below)

## Deployment

This application is designed to be deployed via the CircleCI pipeline to:

- **AWS ECS Fargate** - Serverless container platform
- **Google Cloud Run** - Fully managed serverless platform

See the tutorial for complete deployment instructions.

## Project Structure

```
├── server.js              # Main application
├── package.json           # Dependencies and scripts
├── Dockerfile            # Container definition
├── test/
│   └── app.test.js       # Application tests
├── aws/
│   └── task-definition.json  # ECS task configuration
├── gcp/
│   └── service.yaml      # Cloud Run service definition
└── .circleci/
    └── config.yml        # CI/CD pipeline
```

## Development

- `npm run dev` - Start with auto-reload
- `npm test` - Run test suite
- `npm start` - Production server

## Cloud-Specific Features

### AWS Configuration

- ECS Fargate serverless containers
- Application Load Balancer integration
- CloudWatch logging
- Health check integration

### GCP Configuration

- Cloud Run serverless platform
- Automatic HTTPS certificates
- Stackdriver logging
- Built-in health monitoring

Both deployments include:

- Auto-scaling capabilities
- Zero-downtime deployments
- Health check endpoints
- Environment-specific configuration
