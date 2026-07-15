<?php
/**
 * Admin API: admin.php
 * Handles write operations. Protected by X-Admin-Key header.
 */

$DB_HOST = 'localhost';
$DB_NAME = 'YOUR_DB_NAME';
$DB_USER = 'YOUR_DB_USER';
$DB_PASS = 'YOUR_DB_PASS';

// --- Set your admin password here ---
$ADMIN_PASSWORD = 'galerie2026';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

// Password check via header
$providedKey = $_SERVER['HTTP_X_ADMIN_KEY'] ?? '';
if ($providedKey !== $ADMIN_PASSWORD) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized']);
    exit;
}

// GET request = password check only (for login)
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo json_encode(['ok' => true]);
    exit;
}

// POST request = actions
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    exit;
}

$body = json_decode(file_get_contents('php://input'), true);
$action = $body['action'] ?? null;

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($action === 'updateStatus') {
        $id = $body['id'] ?? '';
        $status = $body['status'] ?? '';
        if (!in_array($status, ['available', 'sold', 'reserved'])) {
            http_response_code(400);
            echo json_encode(['error' => 'Invalid status']);
            exit;
        }
        $stmt = $pdo->prepare('UPDATE paintings SET status = ?, updated_at = NOW() WHERE id = ?');
        $stmt->execute([$status, $id]);
        echo json_encode(['ok' => true]);
    }
    elseif ($action === 'toggleDrop') {
        $id = $body['id'] ?? '';
        $isPublished = $body['isPublished'] ? 1 : 0;
        $stmt = $pdo->prepare('UPDATE drops SET is_published = ? WHERE id = ?');
        $stmt->execute([$isPublished, $id]);
        echo json_encode(['ok' => true]);
    }
    else {
        http_response_code(400);
        echo json_encode(['error' => 'Unknown action']);
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
