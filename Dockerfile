FROM maven as backendBuilder

WORKDIR /app
COPY ployfroms-backend/pom.xml ./
RUN mvn dependency:resolve

COPY ployfroms-backend/ /app
RUN mvn clean install -DskipTests

FROM node:22-slim as frontendBuilder
WORKDIR /app
COPY polyforms-ui/package*.json ./
RUN npm install
COPY polyforms-ui .
COPY polyforms-ui/.env.local ./.env
RUN npm run build


FROM timbru31/java-node:21-jre-20
WORKDIR /app
# RUN apt-get install -y curl \
# 	&& curl -sL https://deb.nodesource.com/setup_18.x | bash - \
# 	&& apt-get install -y nodejs \
# 	&& curl -L https://www.npmjs.com/install.sh | sh \
# 	RUN npm install -g grunt grunt-cli

RUN npm install -g pm2

COPY --from=frontendBuilder /app /app/frontend

# Copy the Spring Boot JAR file from backend-build
COPY --from=backendBuilder /app/target/*.jar /app/backend/app.jar

# Expose ports for both frontend and backend
EXPOSE 8080 3000

# Copy and make the startup script executable
COPY startup.sh /app/startup.sh
RUN chmod +x /app/startup.sh

# Start both frontend and backend using PM2
CMD ["/app/startup.sh"]%