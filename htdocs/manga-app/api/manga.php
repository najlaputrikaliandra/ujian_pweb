<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

session_start();
if (!isset($_SESSION['user_id'])) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

include_once '../config/database.php';
$database = new Database();
$db = $database->getConnection();

// GET all manga
if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $query = "SELECT * FROM manga ORDER BY created_at DESC";
    $stmt = $db->prepare($query);
    $stmt->execute();
    
    $manga = [];
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        $manga[] = $row;
    }
    
    echo json_encode($manga);
}

// POST new manga (admin only)
if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_SESSION['role'] == 'admin') {
    $data = json_decode(file_get_contents("php://input"), true);
    
    $query = "INSERT INTO manga (title, author, description, cover_image, status) VALUES (?, ?, ?, ?, ?)";
    $stmt = $db->prepare($query);
    
    if ($stmt->execute([$data['title'], $data['author'], $data['description'], $data['cover_image'], $data['status']])) {
        echo json_encode(['success' => true, 'id' => $db->lastInsertId()]);
    } else {
        echo json_encode(['success' => false]);
    }
}

// PUT update manga (admin only)
if ($_SERVER['REQUEST_METHOD'] == 'PUT' && $_SESSION['role'] == 'admin') {
    $data = json_decode(file_get_contents("php://input"), true);
    $id = $_GET['id'];
    
    $query = "UPDATE manga SET title=?, author=?, description=?, cover_image=?, status=? WHERE id=?";
    $stmt = $db->prepare($query);
    
    if ($stmt->execute([$data['title'], $data['author'], $data['description'], $data['cover_image'], $data['status'], $id])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}

// DELETE manga (admin only)
if ($_SERVER['REQUEST_METHOD'] == 'DELETE' && $_SESSION['role'] == 'admin') {
    $id = $_GET['id'];
    
    $query = "DELETE FROM manga WHERE id=?";
    $stmt = $db->prepare($query);
    
    if ($stmt->execute([$id])) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false]);
    }
}
?>