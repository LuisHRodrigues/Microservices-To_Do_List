-- Criação da tabela principal de listas de tarefas
CREATE TABLE todo_lists (
    id BIGINT NOT NULL AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
) ENGINE=InnoDB;

-- Criação da tabela de tarefas
CREATE TABLE tarefas (
    id BIGINT NOT NULL AUTO_INCREMENT,
    todo_list_id BIGINT NOT NULL,
    tarefa VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    CONSTRAINT fk_tarefas_todo_list 
        FOREIGN KEY (todo_list_id) 
        REFERENCES todo_lists (id) 
        ON DELETE CASCADE
) ENGINE=InnoDB;

-- Índice para melhorar performance nas consultas
CREATE INDEX idx_tarefas_todo_list_id ON tarefas(todo_list_id);