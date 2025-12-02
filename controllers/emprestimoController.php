<?php
require_once __DIR__ . "/../config/db.php";

class EmprestimoController
{
    private function verificarLogin()
    {
        if (session_status() == PHP_SESSION_NONE) session_start();
        if (!isset($_SESSION['usuario'])) {
            header("Location: index.php?rota=login");
            exit;
        }
    }

    public function index()
    {
        $this->verificarLogin();
        $db = DB::connect();
        $sql = $db->query("
            SELECT e.*, b.modelo, b.codigo, u.nome AS usuario
            FROM emprestimos e
            LEFT JOIN bikes b ON b.id = e.bike_id
            LEFT JOIN usuarios u ON u.id = e.usuario_id
            ORDER BY e.data_emprestimo DESC
        ");
        $emprestimos = $sql->fetchAll(PDO::FETCH_ASSOC);
        require __DIR__ . "/../views/admin/emprestimos/index.php";
    }

    public function store()
    {
        $this->verificarLogin();
        $bike = $_GET['id_bike'] ?? $_POST['id_bike'] ?? null;
        $user = $_SESSION['usuario']['id'];

        if (!$bike) {
            header("Location: index.php?rota=user_home");
            exit;
        }

        $db = DB::connect();
        $db->prepare("INSERT INTO emprestimos (bike_id, usuario_id, status, data_emprestimo) VALUES (?, ?, 'ativo', NOW())")
           ->execute([$bike, $user]);
        $db->prepare("UPDATE bikes SET status='ocupada' WHERE id = ?")->execute([$bike]);

        header("Location: index.php?rota=user_home");
        exit;
    }

    public function devolver()
    {
        $this->verificarLogin();
        $id = $_GET['id'] ?? null;
        if (!$id) {
            header("Location: index.php?rota=user_home");
            exit;
        }

        $db = DB::connect();

        $sql = $db->prepare("SELECT * FROM emprestimos WHERE id = ?");
        $sql->execute([$id]);
        $emp = $sql->fetch(PDO::FETCH_ASSOC);

        if ($emp) {
            $db->prepare("UPDATE emprestimos SET status='finalizado', data_devolucao = NOW() WHERE id = ?")
               ->execute([$id]);
            $db->prepare("UPDATE bikes SET status='disponivel' WHERE id = ?")
               ->execute([$emp['bike_id']]);
        }

        header("Location: index.php?rota=user_home");
        exit;
    }
}
