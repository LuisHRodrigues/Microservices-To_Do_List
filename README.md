# Projeto Microservices - To-Do List

Este projeto implementa uma arquitetura completa de microservices para gerenciamento de listas de tarefas, com autenticação de usuários e interface web moderna.

## 🏗️ Arquitetura

- **API de Autenticação** (Spring Boot - Porta 8080)
- **API de To-Do List** (Spring Boot - Porta 8081)  
- **Frontend React** (Porta 3000)
- **Banco MySQL** (Porta 3306)

## ✨ Funcionalidades

### 🔐 Sistema de Autenticação
- **Cadastro de usuários** com validação de dados (nome, email, telefone, CPF, senha)
- **Login seguro** com autenticação por token
- **Gerenciamento de sessão** com persistência local
- **Logout** com limpeza de dados de sessão

### 📝 Gerenciamento de To-Do Lists
- **Criar múltiplas listas** de tarefas por usuário
- **Adicionar tarefas** em listas específicas
- **Remover tarefas** individualmente
- **Excluir listas** completas
- **Visualização organizada** com seleção de listas
- **Persistência de dados** no banco MySQL

### 🎨 Interface do Usuário
- **Design responsivo** com Tailwind CSS
- **Navegação intuitiva** entre login/cadastro
- **Feedback visual** para ações do usuário
- **Estados de loading** e tratamento de erros
- **Interface limpa** e moderna

## 🚀 Como executar

### Opção 1: Script automático (Windows)
```bash
./start-microservices.bat
```

### Opção 2: Docker Compose manual
```bash
# Parar containers existentes
docker-compose down

# Iniciar todos os serviços
docker-compose up --build
```

## 📡 Endpoints da API

### API de Autenticação (http://localhost:8080)
- `POST /usuarios` - Criar novo usuário
  ```json
  {
    "nome": "João Silva",
    "email": "joao@email.com",
    "telefone": "11999999999",
    "cpf": "12345678901",
    "senha": "minhasenha"
  }
  ```
- `POST /usuarios/login` - Autenticar usuário
  ```json
  {
    "email": "joao@email.com",
    "senha": "minhasenha"
  }
  ```
- `GET /usuarios` - Status da API

### API de To-Do List (http://localhost:8081)
- `GET /api/todo-lists` - Listar todas as listas
- `GET /api/todo-lists/usuario/{usuarioId}` - Listar listas por usuário
- `POST /api/todo-lists` - Criar nova lista
  ```json
  {
    "titulo": "Minha Lista",
    "listaDeTarefas": ["Tarefa 1", "Tarefa 2"],
    "usuarioId": "1"
  }
  ```
- `GET /api/todo-lists/{id}` - Buscar lista por ID
- `PUT /api/todo-lists/{id}` - Atualizar lista
- `DELETE /api/todo-lists/{id}` - Deletar lista

### Frontend React (http://localhost:3000)
- **Página de Login/Cadastro** - Autenticação de usuários
- **Dashboard Principal** - Gerenciamento de listas e tarefas
- **Navegação Responsiva** - Interface adaptável

## 📁 Estrutura do projeto
```
Microservices/
├── Autenticacao_Usuario/          # 🔐 API de Autenticação (Spring Boot)
│   └── src/main/java/
│       ├── Controller/             # Controladores REST
│       ├── Service/                # Lógica de negócio
│       ├── Model/                  # Entidades JPA
│       ├── Repository/             # Acesso a dados
│       └── DTO/                    # Objetos de transferência
├── To_Do_List_Usuario/            # 📝 API de To-Do List (Spring Boot)
│   └── src/main/java/
│       ├── Controller/             # Controladores REST
│       ├── Service/                # Lógica de negócio
│       ├── Model/                  # Entidades JPA
│       ├── Repository/             # Acesso a dados
│       └── DTO/                    # Objetos de transferência
├── React_ToDoList/                # 🎨 Frontend React
│   └── src/
│       ├── components/             # Componentes React
│       ├── context/                # Context API (Auth)
│       └── services/               # Serviços de API
├── docker-compose.yml             # 🐳 Orquestração dos serviços
├── init-db.sql                    # 🗄️ Script de inicialização do BD
└── start-microservices.bat        # 🚀 Script de inicialização
```

## ⚙️ Tecnologias utilizadas

### Backend
- **Spring Boot** - Framework Java para APIs REST
- **Spring Data JPA** - Persistência de dados
- **MySQL** - Banco de dados relacional
- **Maven** - Gerenciamento de dependências

### Frontend
- **React** - Biblioteca JavaScript para UI
- **Tailwind CSS** - Framework CSS utilitário
- **Context API** - Gerenciamento de estado
- **Fetch API** - Comunicação com APIs

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers

## 🔧 Configurações importantes

- **CORS**: Configurado para permitir comunicação entre frontend (3000) e APIs
- **Banco de dados**: MySQL com dois schemas separados (auth_db e todolist_db)
- **Variáveis de ambiente**: Configuradas no docker-compose e .env do React
- **Health checks**: Implementados para garantir inicialização correta dos serviços
- **Volumes persistentes**: Dados do MySQL mantidos entre reinicializações

## 🛡️ Segurança

- Validação de dados de entrada
- Autenticação baseada em token
- Separação de responsabilidades entre microservices
- Configuração adequada de CORS

## 📱 Fluxo de uso

1. **Acesse** http://localhost:3000
2. **Cadastre-se** ou faça **login**
3. **Crie** suas listas de tarefas
4. **Adicione** tarefas às suas listas
5. **Gerencie** suas tarefas (marcar, remover)
6. **Organize** múltiplas listas conforme necessário

## 🤝 Contribuição

Para contribuir com o projeto:
1. Faça um fork do repositório
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.