-- Adicionando coluna de status para as listas
ALTER TABLE todo_lists 
ADD COLUMN status VARCHAR(20) DEFAULT 'ACTIVE' NOT NULL;

-- Criando índice para o status
CREATE INDEX idx_todo_lists_status ON todo_lists(status);