INSERT INTO cities (name) VALUES 
('București'),
('Cluj-Napoca'),
('Iași'),
('Timișoara');

INSERT INTO categories (name) VALUES 
('Concert'),
('Teatru'),
('Expoziție'),
('Sport'),
('Festival');

-- Example admin user (use a real password hash in a real app)
INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin', 'admin@example.com', 'hashed_password_here', 'admin');