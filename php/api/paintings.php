<?php
/**
 * API: paintings.php
 * Returns all paintings and drops as JSON.
 * Called by the static frontend at runtime.
 */

// --- Database config (adjust to your ALL-INKL credentials) ---
$DB_HOST = 'localhost';
$DB_NAME = 'YOUR_DB_NAME';
$DB_USER = 'YOUR_DB_USER';
$DB_PASS = 'YOUR_DB_PASS';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

try {
    $pdo = new PDO("mysql:host=$DB_HOST;dbname=$DB_NAME;charset=utf8mb4", $DB_USER, $DB_PASS);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $paintings = $pdo->query('SELECT * FROM paintings ORDER BY created_at DESC')->fetchAll(PDO::FETCH_ASSOC);
    $drops     = $pdo->query('SELECT * FROM drops ORDER BY publish_at ASC')->fetchAll(PDO::FETCH_ASSOC);

    // Convert snake_case to camelCase for frontend compatibility
    $paintings = array_map(function($row) {
        return [
            'id'          => $row['id'],
            'title'       => $row['title'],
            'description' => $row['description'],
            'imageUrl'    => $row['image_url'],
            'thumbnailUrl'=> $row['thumbnail_url'],
            'priceEur'    => (int)$row['price_eur'],
            'status'      => $row['status'],
            'dropId'      => $row['drop_id'],
            'sortOrder'   => (int)$row['sort_order'],
            'createdAt'   => $row['created_at'],
            'updatedAt'   => $row['updated_at'],
        ];
    }, $paintings);

    $drops = array_map(function($row) {
        return [
            'id'          => $row['id'],
            'title'       => $row['title'],
            'publishAt'   => $row['publish_at'],
            'isPublished' => (bool)$row['is_published'],
            'createdAt'   => $row['created_at'],
        ];
    }, $drops);

    echo json_encode(['paintings' => $paintings, 'drops' => $drops]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
