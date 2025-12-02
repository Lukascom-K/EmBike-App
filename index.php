<?php
session_start();
require_once __DIR__ . "/config/db.php";

$rota = $_GET['rota'] ?? 'login';

switch ($rota) {

    case 'login':
        require "controllers/loginController.php";
        (new LoginController())->index();
        break;

    case 'auth':
        require "controllers/loginController.php";
        (new LoginController())->auth();
        break;

    case 'logout':
        require "controllers/loginController.php";
        (new LoginController())->logout();
        break;

    case 'user_home':
        require "controllers/UserController.php";
        (new UserController())->home();
        break;

    case 'admin_dashboard':
        require "controllers/AdminController.php";
        (new AdminController())->dashboard();
        break;

    case 'admin_bikes':
        require "controllers/BikeController.php";
        (new BikeController())->index();
        break;

    case 'bike_add':
        require "controllers/BikeController.php";
        (new BikeController())->create();
        break;

    case 'bike_store':
        require "controllers/BikeController.php";
        (new BikeController())->store();
        break;

    case 'bike_edit':
        require "controllers/BikeController.php";
        (new BikeController())->edit();
        break;

    case 'bike_update':
        require "controllers/BikeController.php";
        (new BikeController())->update();
        break;

    case 'bike_delete':
        require "controllers/BikeController.php";
        (new BikeController())->delete();
        break;

    case 'admin_emprestimos':
        require "controllers/EmprestimoController.php";
        (new EmprestimoController())->index();
        break;

    case 'emprestimo_store':
        require "controllers/EmprestimoController.php";
        (new EmprestimoController())->store();
        break;

    case 'emprestimo_devolver':
        require "controllers/EmprestimoController.php";
        (new EmprestimoController())->devolver();
        break;

    case 'admin_users':
        require "controllers/UserAdminController.php";
        (new UserAdminController())->listar();
        break;

    case 'admin_users_create':
        require "controllers/UserAdminController.php";
        (new UserAdminController())->criar();
        break;

    case 'admin_users_store':
        require "controllers/UserAdminController.php";
        (new UserAdminController())->salvar();
        break;

    case 'admin_users_edit':
        require "controllers/UserAdminController.php";
        (new UserAdminController())->editar();
        break;

    case 'admin_users_update':
        require "controllers/UserAdminController.php";
        (new UserAdminController())->atualizar();
        break;

    case 'admin_users_delete':
        require "controllers/UserAdminController.php";
        (new UserAdminController())->excluir();
        break;

    default:
        echo "Rota inválida.";
        break;
}
