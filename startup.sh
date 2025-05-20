#!/bin/bash

# Start the Spring Boot backend with PM2 (via a Java command)
pm2 start java --name "backend" -- -jar /app/backend/app.jar

# Start the Next.js frontend with PM2
cd /app/frontend
ls
pm2 start "npm run start" --name "frontend"


# Keep PM2 running (to prevent container from exiting)
pm2 logs