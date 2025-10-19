const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Environment info
const cloudProvider = process.env.CLOUD_PROVIDER || "unknown";
const deploymentTime = process.env.DEPLOYMENT_TIME || new Date().toISOString();
const appVersion = process.env.APP_VERSION || "1.0.0";

// Routes
app.get("/", (req, res) => {
  res.json({
    message: "Multi-Cloud Demo Application",
    cloud: cloudProvider,
    version: appVersion,
    deployedAt: deploymentTime,
    timestamp: new Date().toISOString(),
  });
});

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    cloud: cloudProvider,
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
});

app.get("/info", (req, res) => {
  res.json({
    environment: {
      nodeVersion: process.version,
      platform: process.platform,
      cloud: cloudProvider,
      region: process.env.CLOUD_REGION || "unknown",
    },
    deployment: {
      version: appVersion,
      deployedAt: deploymentTime,
    },
  });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(500).json({
    error: "Internal Server Error",
    cloud: cloudProvider,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
    cloud: cloudProvider,
  });
});

if (require.main === module) {
  // App listen
  app.listen(port, "0.0.0.0", () => {
    console.log(`Multi-cloud demo app running on port ${port}`);
    console.log(`Cloud Provider: ${cloudProvider}`);
    console.log(`Version: ${appVersion}`);
  });
}

module.exports = app;
