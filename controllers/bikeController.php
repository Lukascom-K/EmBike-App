<?php
require_once __DIR__ . "/../config/db.php";

class BikeController
{
    private function verificarLogin()
    {
        if (session_status() == PHP_SESSION_NONE) session_start();
        if (!isset($_SESSION['usuario']) || $_SESSION['usuario']['tipo'] !== 'admin') {
            header("Location: index.php?rota=login");
            exit;
        }
    }

    public function index()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $bikes = $db->query("SELECT * FROM bikes")->fetchAll(PDO::FETCH_ASSOC);
        require __DIR__ . "/../views/admin/bikes/index.php";
    }

    public function create()
    {
        $this->verificarLogin();
        require __DIR__ . "/../views/admin/bikes/create.php";
    }

    public function store()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $sql = $db->prepare("INSERT INTO bikes (modelo, codigo, status) VALUES (?, ?, 'disponivel')");
        $sql->execute([$_POST['modelo'], $_POST['codigo']]);
        header("Location: index.php?rota=admin_bikes");
        exit;
    }

    public function edit()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $sql = $db->prepare("SELECT * FROM bikes WHERE id = ?");
        $sql->execute([$_GET['id']]);
        $bike = $sql->fetch(PDO::FETCH_ASSOC);
        require __DIR__ . "/../views/admin/bikes/edit.php";
    }

    public function update()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $sql = $db->prepare("UPDATE bikes SET modelo = ?, codigo = ?, status = ? WHERE id = ?");
        $sql->execute([$_POST['modelo'], $_POST['codigo'], $_POST['status'], $_POST['id']]);
        header("Location: index.php?rota=admin_bikes");
        exit;
    }

    public function delete()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $sql = $db->prepare("DELETE FROM bikes WHERE id = ?");
        $sql->execute([$_GET['id']]);
        header("Location: index.php?rota=admin_bikes");
        exit;
    }
}
