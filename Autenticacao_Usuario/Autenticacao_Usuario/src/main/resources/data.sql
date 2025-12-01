-- Inserir usuários de exemplo
-- Senhas são: "senha123" em texto plano

INSERT INTO usuarios (id, nome, email, telefone, cpf, password) VALUES 
('550e8400-e29b-41d4-a716-446655440001', 'João Silva', 'joao@email.com', '(11) 99999-1111', '123.456.789-01', 'senha123'),
('550e8400-e29b-41d4-a716-446655440002', 'Maria Santos', 'maria@email.com', '(11) 99999-2222', '123.456.789-02', 'senha123'),
('550e8400-e29b-41d4-a716-446655440003', 'Pedro Costa', 'pedro@email.com', '(11) 99999-3333', '123.456.789-03', 'senha123'),
('550e8400-e29b-41d4-a716-446655440004', 'Ana Oliveira', 'ana@email.com', '(11) 99999-4444', '123.456.789-04', 'senha123'),
('550e8400-e29b-41d4-a716-446655440005', 'Carlos Lima', 'carlos@email.com', '(11) 99999-5555', '123.456.789-05', 'senha123')
ON DUPLICATE KEY UPDATE id=id;