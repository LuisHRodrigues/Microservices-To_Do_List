-- Adicionar coluna usuario_id para vincular com o usuário
ALTER TABLE todo_lists ADD COLUMN usuario_id VARCHAR(255);

-- Criar índice para melhorar performance
CREATE INDEX idx_todo_lists_usuario_id ON todo_lists(usuario_id);