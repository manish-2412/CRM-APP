CREATE DATABASE crm_campaign_db;
USE crm_campaign_db;

-- Create tables
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    total_spending DECIMAL(10, 2),
    last_visit_date DATE
);

CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATE,
    order_amount DECIMAL(10, 2),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE segments (
    segment_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    conditions TEXT
);

CREATE TABLE audience_segment_customers (
    segment_id INT,
    customer_id INT,
    PRIMARY KEY (segment_id, customer_id),
    FOREIGN KEY (segment_id) REFERENCES segments(segment_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE communications_log (
    log_id INT AUTO_INCREMENT PRIMARY KEY,
    segment_id INT,
    customer_id INT,
    message TEXT,
    status ENUM('SENT', 'FAILED'),
    FOREIGN KEY (segment_id) REFERENCES segments(segment_id),
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE delivery_receipts (
    receipt_id INT AUTO_INCREMENT PRIMARY KEY,
    log_id INT,
    status ENUM('SENT', 'FAILED'),
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (log_id) REFERENCES communications_log(log_id)
);

-- Insert sample data
INSERT INTO customers (name, email, phone, total_spending, last_visit_date)
VALUES 
('Manish Chandrasekar', 'c.manish002@gmail.com', '7827741594', 12000, '2024-10-01'),
('Shantanu Shukla', 'shantanushukla11@gmail.com', '8218543772', 8000, '2024-08-15');

INSERT INTO orders (customer_id, order_date, order_amount)
VALUES 
(1, '2024-10-05', 2000),
(2, '2024-09-20', 1500);

INSERT INTO segments (name, conditions)
VALUES ('High Spend Customers', 'total_spending > 10000');

INSERT INTO audience_segment_customers (segment_id, customer_id)
VALUES (1, 1);

INSERT INTO communications_log (segment_id, customer_id, message, status)
VALUES (1, 1, 'Discount offer sent to high spender', 'SENT');

ALTER TABLE communications_log ADD COLUMN timestamp DATETIME DEFAULT CURRENT_TIMESTAMP;






