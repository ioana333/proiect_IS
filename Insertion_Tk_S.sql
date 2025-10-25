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


INSERT INTO users (name, email, password_hash, role)
VALUES ('Admin', 'admin@example.com', 'hashed_password_here', 'admin');