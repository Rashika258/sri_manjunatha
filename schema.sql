CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20),
    address TEXT,
    gstin VARCHAR(15) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE employees (
    employee_id INT AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    phone_number VARCHAR(15),
    designation VARCHAR(255),
    date_of_joining DATE,
    status ENUM('Active', 'Inactive', 'Leave') DEFAULT 'Active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE attendance (
    attendance_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    date DATE NOT NULL,
    hours_worked DECIMAL(5, 2) NOT NULL,  -- Hours worked by the employee
    status ENUM('Present', 'Absent', 'Leave', 'Holiday') DEFAULT 'Present',  -- Employee status for the day
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


CREATE TABLE working_hours_config (
    id INT PRIMARY KEY,
    daily_expected_hours DECIMAL(5, 2) NOT NULL,  -- Expected hours per day
    weekly_expected_hours DECIMAL(5, 2) NOT NULL  -- Expected hours per week (optional)
);


CREATE TABLE leaves (
    leave_id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    leave_type ENUM('Sick', 'Casual', 'Paid') NOT NULL,
    leave_start_date DATE NOT NULL,
    leave_end_date DATE NOT NULL,
    leave_status ENUM('Approved', 'Pending', 'Rejected') DEFAULT 'Pending',
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)
);


CREATE TABLE login_logout (
    log_id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique log ID
    employee_id INT NOT NULL,                       -- Employee reference
    login_time TIMESTAMP NOT NULL,                  -- Login time
    logout_time TIMESTAMP,                          -- Logout time (nullable as employee may still be logged in)
    status ENUM('LoggedIn', 'LoggedOut') DEFAULT 'LoggedIn',  -- Status of the employee (LoggedIn or LoggedOut)
    date DATE NOT NULL,                             -- Date of login/logout
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the record was created
    FOREIGN KEY (employee_id) REFERENCES employees(employee_id)  -- Foreign key reference to the employee
);


CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    hsn_code VARCHAR(10),
    price DECIMAL(10, 2) NOT NULL,
    gst_rate DECIMAL(5, 2) DEFAULT 0, -- GST rate as percentage
    is_gst_applicable BOOLEAN DEFAULT TRUE, -- Tracks if GST applies
    stock_quantity INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE invoices (
    invoice_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_number VARCHAR(50) UNIQUE NOT NULL,
    customer_id INT NOT NULL,
    invoice_date DATE NOT NULL,
    due_date DATE,
    total_amount DECIMAL(12, 2) NOT NULL,
    tax_amount DECIMAL(12, 2) NOT NULL,
    grand_total DECIMAL(12, 2) NOT NULL,
    is_gst_bill BOOLEAN DEFAULT TRUE, -- Tracks GST vs non-GST bills
    payment_status ENUM('Pending', 'Paid', 'Overdue') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE invoice_items (
    invoice_item_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);

CREATE TABLE payments (
    payment_id INT AUTO_INCREMENT PRIMARY KEY,
    invoice_id INT NOT NULL,
    payment_date DATE NOT NULL,
    payment_mode ENUM('Cash', 'Card', 'Online', 'Cheque') NOT NULL,
    amount DECIMAL(12, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (invoice_id) REFERENCES invoices(invoice_id)
);

CREATE TABLE taxes (
    tax_id INT AUTO_INCREMENT PRIMARY KEY,
    tax_name VARCHAR(50) NOT NULL,
    tax_rate DECIMAL(5, 2) NOT NULL, -- Tax rate as percentage
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE ecommerce_orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    order_date DATE NOT NULL,
    total_amount DECIMAL(12, 2) NOT NULL,
    status ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled') DEFAULT 'Pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (customer_id) REFERENCES customers(customer_id)
);

CREATE TABLE ecommerce_order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT NOT NULL,
    product_id INT NOT NULL,
    quantity INT NOT NULL,
    unit_price DECIMAL(10, 2) NOT NULL,
    total_price DECIMAL(12, 2) NOT NULL,
    FOREIGN KEY (order_id) REFERENCES ecommerce_orders(order_id),
    FOREIGN KEY (product_id) REFERENCES products(product_id)
);
