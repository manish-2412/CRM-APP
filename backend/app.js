// Import dependencies
require('dotenv').config();
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON and handling CORS
app.use(express.json());
app.use(cors());

// MySQL Database connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});


// Test the MySQL database connection
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.stack);
    return;
  }
  console.log('Connected to MySQL database');
});

// Route to add a new customer to the database
app.post('/addCustomer', (req, res) => {
  const { name, email, phone, total_spending, last_visit_date } = req.body;

  if (!name || !email || !phone || !total_spending || !last_visit_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const query = `INSERT INTO customers (name, email, phone, total_spending, last_visit_date) VALUES (?, ?, ?, ?, ?)`;

  db.query(query, [name, email, phone, total_spending, last_visit_date], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error inserting customer', error: err });
    }
    res.status(200).json({ message: 'Customer added successfully', customerId: result.insertId });
  });
});

// Route to add a new order for a customer
app.post('/addOrder', (req, res) => {
  const { customer_id, order_date, order_amount } = req.body;

  if (!customer_id || !order_date || !order_amount) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert a new order into the 'orders' table
  const query = `INSERT INTO orders (customer_id, order_date, order_amount) VALUES (?, ?, ?)`;

  db.query(query, [customer_id, order_date, order_amount], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error inserting order', error: err });
    }
    res.status(200).json({ message: 'Order added successfully', orderId: result.insertId });
  });
});

// Route to retrieve all customers from the database
app.get('/viewAllCustomers', (req, res) => {
  const query = 'SELECT * FROM customers';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching customers', error: err });
    }
    res.status(200).json({ message: 'Customers retrieved successfully', customers: results });
  });
});

// Route to retrieve all orders from the database
app.get('/viewAllOrders', (req, res) => {
  const query = 'SELECT * FROM orders';

  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching orders', error: err });
    }
    res.status(200).json({ message: 'Orders retrieved successfully', orders: results });
  });
});

// Route to retrieve orders by a specific customer ID
app.get('/viewOrdersByCustomer/:customerId', (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }

  // Retrieve orders for the specified customer
  const query = 'SELECT * FROM orders WHERE customer_id = ?';

  db.query(query, [customerId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching orders for customer', error: err });
    }
    res.status(200).json({ message: 'Orders for customer retrieved successfully', orders: results });
  });
});

// Route to delete a customer by their ID
app.delete('/deleteCustomer/:customerId', (req, res) => {
  const { customerId } = req.params;

  if (!customerId) {
    return res.status(400).json({ message: 'Customer ID is required' });
  }

  // Delete associated data from related tables before deleting the customer
  const deleteFromDeliveryReceipts = 'DELETE FROM delivery_receipts WHERE log_id IN (SELECT log_id FROM communications_log WHERE customer_id = ?)';
  
  db.query(deleteFromDeliveryReceipts, [customerId], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error deleting from delivery_receipts', error: err });
    }

    const deleteFromCommunicationsLog = 'DELETE FROM communications_log WHERE customer_id = ?';
    
    db.query(deleteFromCommunicationsLog, [customerId], (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error deleting from communications_log', error: err });
      }

      // Finally, delete the customer from the 'customers' table
      const deleteFromCustomers = 'DELETE FROM customers WHERE customer_id = ?';

      db.query(deleteFromCustomers, [customerId], (err, result) => {
        if (err) {
          return res.status(500).json({ message: 'Error deleting customer', error: err });
        }

        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Customer not found' });
        }

        res.status(200).json({ message: 'Customer deleted successfully' });
      });
    });
  });
});

// Route to create a new customer segment
app.post('/addSegment', (req, res) => {
  const { name, conditions } = req.body;

  if (!name || !conditions) {
    return res.status(400).json({ message: 'Name and conditions are required' });
  }

  // Insert new segment into the 'segments' table
  const query = `INSERT INTO segments (name, conditions) VALUES (?, ?)`;

  db.query(query, [name, conditions], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error creating segment', error: err });
    }
    res.status(200).json({ message: 'Segment created successfully', segmentId: result.insertId });
  });
});

// Route to assign a customer to a segment
app.post('/assignToSegment', (req, res) => {
  const { segment_id, customer_id } = req.body;

  if (!segment_id || !customer_id) {
    return res.status(400).json({ message: 'Segment ID and Customer ID are required' });
  }

  // Assign a customer to a segment
  const query = `INSERT INTO audience_segment_customers (segment_id, customer_id) VALUES (?, ?)`;

  db.query(query, [segment_id, customer_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error assigning customer to segment', error: err });
    }
    res.status(200).json({ message: 'Customer assigned to segment successfully' });
  });
});

// Route to add a new communication log entry
app.post('/addCommunicationLog', (req, res) => {
  const { segment_id, customer_id, message, status } = req.body;

  if (!segment_id || !customer_id || !message || !status) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!['SENT', 'FAILED'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  // Insert communication log entry into the 'communications_log' table
  const query = `INSERT INTO communications_log (segment_id, customer_id, message, status) VALUES (?, ?, ?, ?)`;

  db.query(query, [segment_id, customer_id, message, status], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error adding communication log', error: err });
    }
    res.status(200).json({ message: 'Communication log added successfully', logId: result.insertId });
  });
});

// Route to create a dynamic segment based on conditions
app.post('/createDynamicSegment', (req, res) => {
  const { name, conditions } = req.body;

  if (!name || !conditions || !Array.isArray(conditions) || conditions.length === 0) {
    return res.status(400).json({ message: 'Name and valid conditions are required' });
  }

  // Build a dynamic SQL query based on provided conditions
  let query = 'SELECT COUNT(*) as audienceSize FROM customers WHERE';
  const queryParams = [];
  
  conditions.forEach((condition, index) => {
    const { field, operator, value, logic } = condition;

    // Ensure all required fields are present
    if (!field || !operator || value === undefined) {
      return res.status(400).json({ message: 'Invalid condition format' });
    }

    // Add the condition to the query
    query += ` ${field} ${operator} ?`;
    queryParams.push(value);

    // Append logic if it's not the last condition and logic is defined
    if (index < conditions.length - 1 && logic) {
      query += ` ${logic}`;
    }
  });

  // Execute query and insert dynamic segment
  db.query(query, queryParams, (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Error calculating audience size', error: err });
    }

    const insertQuery = `INSERT INTO segments (name, conditions) VALUES (?, ?)`;
    db.query(insertQuery, [name, JSON.stringify(conditions)], (insertErr, insertResult) => {
      if (insertErr) {
        return res.status(500).json({ message: 'Error creating segment', error: insertErr });
      }
      res.status(200).json({
        message: 'Segment created successfully',
        segmentId: insertResult.insertId,
        audienceSize: result[0].audienceSize,
      });
    });
  });
});

// Route to fetch campaign history for a segment
app.get('/campaignHistory/:segmentId', (req, res) => {
  const { segmentId } = req.params;

  // Query to get campaign history and delivery receipt stats
  const query = `
    SELECT cl.log_id, cl.message, cl.status, cl.timestamp, 
           COUNT(dr.status) as totalMessages, 
           SUM(CASE WHEN dr.status = 'SENT' THEN 1 ELSE 0 END) as sentMessages, 
           SUM(CASE WHEN dr.status = 'FAILED' THEN 1 ELSE 0 END) as failedMessages
    FROM communications_log cl
    LEFT JOIN delivery_receipts dr ON cl.log_id = dr.log_id
    WHERE cl.segment_id = ?
    GROUP BY cl.log_id
    ORDER BY cl.timestamp DESC
  `;

  db.query(query, [segmentId], (err, results) => {
    if (err) {
      if (err.code === 'ER_NO_SUCH_TABLE') {
        return res.status(500).json({
          message: 'Database table missing: Please ensure all required tables are created.',
          error: err,
        });
      }
      return res.status(500).json({ message: 'Error fetching campaign history', error: err });
    }
    res.status(200).json({ message: 'Campaign history retrieved successfully', history: results });
  });
});

// Route to send personalized messages to customers in a segment
app.post('/sendMessages', (req, res) => {
  const { segment_id, messageTemplate } = req.body;

  if (!segment_id || !messageTemplate) {
    return res.status(400).json({ message: 'Segment ID and message template are required' });
  }

  // Query to get customers in the specified segment
  const query = `
    SELECT c.customer_id, c.name, c.email 
    FROM customers c
    JOIN audience_segment_customers asc_table ON c.customer_id = asc_table.customer_id
    WHERE asc_table.segment_id = ?
  `;

  db.query(query, [segment_id], (err, customers) => {
    if (err) {
      return res.status(500).json({ message: 'Error fetching customers', error: err });
    }

    // Generate personalized messages for each customer
    const messages = customers.map(customer => {
      const personalizedMessage = messageTemplate.replace('[Name]', customer.name);
      return [segment_id, customer.customer_id, personalizedMessage, 'SENT'];
    });

    // Insert communication logs for each message
    const insertQuery = `INSERT INTO communications_log (segment_id, customer_id, message, status) VALUES ?`;

    db.query(insertQuery, [messages], (err, result) => {
      if (err) {
        return res.status(500).json({ message: 'Error inserting communication logs', error: err });
      }

      // Create delivery receipts with random statuses for each message
      const receiptQuery = `INSERT INTO delivery_receipts (log_id, status) VALUES ?`;
      const receiptValues = Array.from({ length: result.affectedRows }, (_, i) => [
        result.insertId + i,
        Math.random() < 0.9 ? 'SENT' : 'FAILED',
      ]);

      db.query(receiptQuery, [receiptValues], (err) => {
        if (err) {
          return res.status(500).json({ message: 'Error creating delivery receipts', error: err });
        }
        res.status(200).json({ message: 'Messages sent successfully', totalMessages: receiptValues.length });
      });
    });
  });
});

// Route to update the status of a delivery receipt
app.post('/updateDeliveryReceipt', (req, res) => {
  const { log_id, status } = req.body;

  if (!log_id || !status || !['SENT', 'FAILED'].includes(status)) {
    return res.status(400).json({ message: 'Valid log ID and status are required' });
  }

  // Update the status of the communication log entry
  const query = `UPDATE communications_log SET status = ? WHERE log_id = ?`;

  db.query(query, [status, log_id], (err) => {
    if (err) {
      return res.status(500).json({ message: 'Error updating delivery receipt', error: err });
    }
    res.status(200).json({ message: 'Delivery receipt updated successfully' });
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
