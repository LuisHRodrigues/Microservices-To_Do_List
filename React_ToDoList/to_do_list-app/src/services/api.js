// URLs base das APIs - To-Do List e Autenticação
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8081';
const AUTH_API_URL = process.env.REACT_APP_AUTH_API_URL || 'http://localhost:8080';

// Classe responsável por todas as chamadas às APIs
class ApiService {
  // Autentica usuário no sistema
  async login(email, senha) {
    const response = await fetch(`${AUTH_API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    
    // Trata erros de autenticação
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Email ou senha inválidos');
    }
    return response.json();
  }

  // Cadastra novo usuário no sistema
  async register(nome, email, telefone, cpf, senha) {
    const response = await fetch(`${AUTH_API_URL}/usuarios`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nome, email, telefone, cpf, senha })
    });
    
    // Trata erros de cadastro
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Erro ao criar usuário');
    }
    return response.json();
  }

  // Busca listas de tarefas (todas ou por usuário específico)
  async getTasks(usuarioId) {
    // Define URL baseada se tem usuário específico ou não
    const url = usuarioId ? 
      `${API_BASE_URL}/api/todo-lists/usuario/${usuarioId}` : 
      `${API_BASE_URL}/api/todo-lists`;
    
    const response = await fetch(url);
    
    if (!response.ok) throw new Error('Erro ao buscar tarefas');
    return response.json();
  }

  // Cria nova lista de tarefas
  async createTask(titulo, listaDeTarefas = [], usuarioId) {
    const response = await fetch(`${API_BASE_URL}/api/todo-lists`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo, listaDeTarefas, usuarioId })
    });
    
    if (!response.ok) throw new Error('Erro ao criar tarefa');
    return response.json();
  }

  // Atualiza lista de tarefas existente
  async updateTask(id, titulo, listaDeTarefas) {
    const response = await fetch(`${API_BASE_URL}/api/todo-lists/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ titulo, listaDeTarefas })
    });
    
    if (!response.ok) throw new Error('Erro ao atualizar tarefa');
    return response.json();
  }

  // Remove lista de tarefas do sistema
  async deleteTask(id) {
    const response = await fetch(`${API_BASE_URL}/api/todo-lists/${id}`, {
      method: 'DELETE'
    });
    
    if (!response.ok) throw new Error('Erro ao deletar tarefa');
  }
}

// Instância única do serviço para uso em toda aplicação
const apiService = new ApiService();
export default apiService;