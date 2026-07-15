-- MySQL schema for SM Otto Gallery (ALL-INKL)
-- Run this once via phpMyAdmin or the SQL console.

CREATE TABLE IF NOT EXISTS drops (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    publish_at VARCHAR(30) NOT NULL,
    is_published TINYINT(1) NOT NULL DEFAULT 0,
    created_at VARCHAR(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS paintings (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url VARCHAR(1024) NOT NULL,
    thumbnail_url VARCHAR(1024),
    price_eur INT NOT NULL,
    status ENUM('available', 'sold', 'reserved') NOT NULL DEFAULT 'available',
    drop_id VARCHAR(36),
    sort_order INT NOT NULL DEFAULT 0,
    created_at VARCHAR(30) NOT NULL,
    updated_at VARCHAR(30) NOT NULL,
    FOREIGN KEY (drop_id) REFERENCES drops(id) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Seed data
INSERT INTO drops (id, title, publish_at, is_published, created_at) VALUES
('d1', 'Woche 27 / 2026', '2026-06-27T18:00:00Z', TRUE, NOW()),
('d2', 'Woche 28 / 2026', '2026-07-10T18:00:00Z', FALSE, NOW());

INSERT INTO paintings (id, title, description, image_url, thumbnail_url, price_eur, status, drop_id, sort_order, created_at, updated_at) VALUES
('p1', 'Fjord I', 'Morgenlicht über dem Fjord. Acryl auf Leinwand, 80×60 cm.', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop', 320000, 'available', 'd1', 1, NOW(), NOW()),
('p2', 'Fjord II', 'Abendrot über dem Wasser. Acryl auf Leinwand, 80×60 cm.', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&h=600&fit=crop', 340000, 'sold', 'd1', 2, NOW(), NOW()),
('p3', 'Wald I', 'Tief im Nadelwald. Öl auf Leinwand, 100×70 cm.', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop', 410000, 'available', 'd1', 3, NOW(), NOW()),
('p4', 'Wald II', 'Licht durch die Baumkronen. Öl auf Leinwand, 100×70 cm.', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&h=600&fit=crop', 430000, 'available', 'd1', 4, NOW(), NOW()),
('p5', 'Stein I', 'Granitformationen an der Küste. Mixed Media, 60×60 cm.', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&h=600&fit=crop', 280000, 'reserved', 'd1', 5, NOW(), NOW()),
('p6', 'Meer I', 'Der Rhythmus der Nordsee. Acryl auf Leinwand, 120×80 cm.', 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop', 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?w=800&h=600&fit=crop', 520000, 'available', 'd1', 6, NOW(), NOW());
