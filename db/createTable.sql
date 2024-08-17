CREATE TABLE IF NOT EXISTS scheduler (
    id INT AUTO_INCREMENT PRIMARY KEY,
    scheduleDate DATE NOT NULL,
    title CHAR(12) NOT NULL,
    scheduleTime TIME NOT NULL,
    place CHAR(8),
    memo CHAR(30)
);