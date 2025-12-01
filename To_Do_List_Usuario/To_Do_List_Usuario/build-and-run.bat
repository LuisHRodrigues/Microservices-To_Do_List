@echo off
echo "Building the application..."
mvn clean package -DskipTests

echo "Building and starting containers..."
docker-compose up --build

pause