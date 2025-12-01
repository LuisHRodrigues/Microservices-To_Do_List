@echo off
echo Iniciando projeto de microservices...
echo.

echo Parando containers existentes...
docker-compose down

echo.
echo Construindo e iniciando todos os servicos...
docker-compose up --build

echo.
echo Projeto iniciado!
echo.
echo Servicos disponiveis:
echo - Frontend React: http://localhost:3000
echo - API Autenticacao: http://localhost:8080
echo - API To-Do List: http://localhost:8081
echo - MySQL: localhost:3306
echo.
pause