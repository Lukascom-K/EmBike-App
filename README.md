O sistema EMBIKE é uma aplicação web desenvolvida com PHP e MySQL voltada ao gerenciamento de empréstimos de bicicletas elétricas. Ele permite que os usuários realizem empréstimos, visualizem seu empréstimo atual, acompanhem o histórico e devolvam bicicletas. Os administradores possuem acesso a um painel completo para gerenciamento de usuários, bicicletas e empréstimos, além de visualizar estatísticas gerais do sistema.

Para executar o projeto, é necessário ter o XAMPP instalado. A pasta do projeto deve ser colocada em C:\xampp\htdocs\embike. Em seguida, basta iniciar o Apache e o MySQL pelo painel do XAMPP. No navegador, acesse http://localhost/phpmyadmin, crie o banco de dados e execute o SQL listado abaixo. Após isso, o sistema pode ser acessado em http://localhost/embike/index.php.

A seguir está o SQL completo responsável por criar todas as tabelas utilizadas no sistema, incluindo usuários, bicicletas e empréstimos, além de inserir um administrador e um usuário de teste:

CREATE DATABASE IF NOT EXISTS embike;
USE embike;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(120) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    tipo ENUM('admin','user') DEFAULT 'user'
);

CREATE TABLE bikes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    modelo VARCHAR(100) NOT NULL,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    status ENUM('disponivel','ocupada') DEFAULT 'disponivel'
);

CREATE TABLE emprestimos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    bike_id INT NOT NULL,
    usuario_id INT NOT NULL,
    data_emprestimo DATETIME NOT NULL,
    data_devolucao DATETIME DEFAULT NULL,
    status ENUM('ativo','finalizado','atrasado') DEFAULT 'ativo',

    FOREIGN KEY (bike_id) REFERENCES bikes(id),
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);

INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Administrador', 'admin@embike.com', '123', 'admin');

INSERT INTO usuarios (nome, email, senha, tipo)
VALUES ('Cliente', 'user@embike.com', '123', 'user');


Para testar o sistema, utilize as seguintes credenciais:
Administrador — email: admin@embike.com
, senha: 123
Usuário comum — email: user@embike.com
, senha: 123

O sistema possui duas áreas principais. O usuário comum acessa sua página inicial, onde pode ver sua bicicleta atual, alugar novas bicicletas disponíveis e consultar seu histórico. Já o administrador acessa um painel onde consegue visualizar todas as bicicletas cadastradas, editar, excluir ou adicionar novas, manipular empréstimos, cadastrar e editar usuários e acompanhar o funcionamento geral da plataforma.

Este projeto tem como objetivo demonstrar domínio prático de desenvolvimento web utilizando PHP estruturado, criação de rotas simples, manipulação de banco de dados MySQL, autenticação de usuários, controle de sessão e construção de interfaces utilizando HTML e CSS. A separação entre diferentes tipos de usuário garante um fluxo mais coerente e seguro dentro da aplicação.

Se desejar, posso gerar uma versão em PDF desse arquivo, escrever uma justificativa técnica do projeto ou preparar um manual do usuário. Basta pedir.