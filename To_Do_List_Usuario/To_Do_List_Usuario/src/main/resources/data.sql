-- Inserir listas de tarefas para cada usuário

-- Lista para João Silva
INSERT IGNORE INTO todo_lists (id, titulo, usuario_id) VALUES 
(1, 'Tarefas de Trabalho - João', '550e8400-e29b-41d4-a716-446655440001');

INSERT IGNORE INTO tarefas (todo_list_id, tarefa) VALUES 
(1, 'Revisar relatório mensal'),
(1, 'Preparar apresentação para cliente'),
(1, 'Responder emails pendentes');

-- Lista para Maria Santos
INSERT IGNORE INTO todo_lists (id, titulo, usuario_id) VALUES 
(2, 'Projetos Pessoais - Maria', '550e8400-e29b-41d4-a716-446655440002');

INSERT IGNORE INTO tarefas (todo_list_id, tarefa) VALUES 
(2, 'Estudar React avançado'),
(2, 'Fazer exercícios físicos'),
(2, 'Organizar armário');

-- Lista para Pedro Costa
INSERT IGNORE INTO todo_lists (id, titulo, usuario_id) VALUES 
(3, 'Tarefas Domésticas - Pedro', '550e8400-e29b-41d4-a716-446655440003');

INSERT IGNORE INTO tarefas (todo_list_id, tarefa) VALUES 
(3, 'Limpar a casa'),
(3, 'Fazer compras no mercado'),
(3, 'Pagar contas do mês');

-- Lista para Ana Oliveira
INSERT IGNORE INTO todo_lists (id, titulo, usuario_id) VALUES 
(4, 'Estudos - Ana', '550e8400-e29b-41d4-a716-446655440004');

INSERT IGNORE INTO tarefas (todo_list_id, tarefa) VALUES 
(4, 'Ler livro de programação'),
(4, 'Fazer curso online'),
(4, 'Praticar algoritmos');

-- Lista para Carlos Lima
INSERT IGNORE INTO todo_lists (id, titulo, usuario_id) VALUES 
(5, 'Hobbies - Carlos', '550e8400-e29b-41d4-a716-446655440005');

INSERT IGNORE INTO tarefas (todo_list_id, tarefa) VALUES 
(5, 'Tocar violão'),
(5, 'Desenhar paisagem'),
(5, 'Cozinhar receita nova');