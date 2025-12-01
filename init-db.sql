-- Criar banco de dados para autenticação se não existir
CREATE DATABASE IF NOT EXISTS auth_db;

-- Criar banco de dados para to-do list se não existir
CREATE DATABASE IF NOT EXISTS todolist_db;

-- Garantir que o usuário root tenha acesso aos bancos
GRANT ALL PRIVILEGES ON auth_db.* TO 'root'@'%';
GRANT ALL PRIVILEGES ON todolist_db.* TO 'root'@'%';
FLUSH PRIVILEGES;