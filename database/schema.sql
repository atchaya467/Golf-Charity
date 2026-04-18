-- Drop tables if they exist to start fresh (for dev)
DROP TABLE IF EXISTS registrations;
DROP TABLE IF EXISTS donations;
DROP TABLE IF EXISTS events;
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

-- Events Table
CREATE TABLE events (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    event_date TIMESTAMP NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    capacity INT DEFAULT 100,
    image_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Registrations Table
CREATE TABLE registrations (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    event_id VARCHAR(36) NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    stripe_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE
);

-- Donations Table
CREATE TABLE donations (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36), -- Optional, can be anonymous
    charity_id VARCHAR(36),
    amount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) DEFAULT 'USD',
    status ENUM('pending', 'completed', 'failed') DEFAULT 'pending',
    stripe_id VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
    FOREIGN KEY (charity_id) REFERENCES charities(id) ON DELETE SET NULL
);

-- Insert Default Charities (matching our mock data)
INSERT INTO charities (id, name, description, active_status) 
VALUES 
('c1', 'Swings for Hope', 'Empowering underprivileged youth through golf programs.', TRUE),
('c2', 'Green Horizons', 'Environmental conservation focusing on public parks and courses.', TRUE),
('c3', 'Vets on the Green', 'Supporting military veterans through therapeutic golf.', TRUE);

-- Insert Default Events
INSERT INTO events (id, title, description, location, event_date, price, capacity)
VALUES
('e1', 'Spring Youth Invitational', 'A premier tournament for junior golfers from underserved communities.', 'St Andrews, Scotland', '2026-05-15 09:00:00', 50.00, 50),
('e2', 'Legends for Literacy Charity Pro-Am', 'Golfing with legends to support literacy programs worldwide.', 'Wentworth Club, Surrey', '2026-06-20 08:30:00', 500.00, 72),
('e3', 'Sunset Links Charity Drive', 'An evening event focusing on mental health awareness in sports.', 'Royal County Down, NI', '2026-07-10 17:00:00', 125.00, 100);
