-- Drop tables if they exist to start fresh (for dev)
DROP TABLE IF EXISTS scores;
DROP TABLE IF EXISTS draws;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS charities;

-- Charities Table
CREATE TABLE charities (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    logo_url VARCHAR(255),
    active_status BOOLEAN DEFAULT TRUE
);

-- Profiles / Users Table
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    subscription_status ENUM('active', 'inactive', 'trial') DEFAULT 'trial',
    charity_id VARCHAR(36),
    charity_percent DECIMAL(5, 2) DEFAULT 10.00,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (charity_id) REFERENCES charities(id) ON DELETE SET NULL
);

-- Scores Table
CREATE TABLE scores (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    score_value INT NOT NULL CHECK (score_value BETWEEN 1 AND 45),
    date_created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Draws Table
CREATE TABLE draws (
    id VARCHAR(36) PRIMARY KEY,
    draw_date TIMESTAMP NOT NULL,
    winning_numbers JSON NOT NULL, -- Storing an array of 5 integers
    prize_pool_total DECIMAL(10, 2) DEFAULT 0.00,
    is_published BOOLEAN DEFAULT FALSE
);

-- Insert Default Charities (matching our mock data)
INSERT INTO charities (id, name, description, active_status) 
VALUES 
('c1', 'Swings for Hope', 'Empowering underprivileged youth through golf programs.', TRUE),
('c2', 'Green Horizons', 'Environmental conservation focusing on public parks and courses.', TRUE),
('c3', 'Vets on the Green', 'Supporting military veterans through therapeutic golf.', TRUE);
